require.config({
    baseUrl: '/assets/js',
    paths: {
        'jquery': 'vendor/jquery-2.0.3',
        'jquery.mobile': 'vendor/jquery.mobile-1.4.0',
        'underscore': 'vendor/underscore',
        'backbone': 'vendor/backbone-1.0.0',
        'backbone.localStorage': 'vendor/backbone.localStorage'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        }
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'collections/ContactList',
    'views/pc/AppView',
    'routers/pc',
    'fixtures'
], function($, _, Backbone, ContactList, AppView, Router, fixtures) {

    'use strict';

    var contactList = new ContactList();
    contactList.fetch({
        success: function() {
            if(contactList.isEmpty()) {
                contactList.reset(fixtures).invoke('save');
            }
        }
    });

    var appview = new AppView({
        router: new Router(),
        collection: contactList
    });

    $(function() {
        $('body').append(appview.render().el);
        Backbone.history.start();
    });

});
