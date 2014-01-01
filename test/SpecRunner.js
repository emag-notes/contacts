require.config({
    baseUrl: '../../assets/js',
    paths: {
        'jquery': 'vendor/jquery-2.0.3',
        'jquery.mobile': 'vendor/jquery.mobile-1.4.0',
        'underscore': 'vendor/underscore',
        'backbone': 'vendor/backbone',
        'backbone.localStorage': 'vendor/backbone.localStorage',
        'spec': '../../test/spec'
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
        'jst/pc': {
            exports: 'JST'
        },
        'jst/mobile': {
            exports: 'JST'
        }
    }
});

require(['jquery'], function ($) {

    'use strict';

    var specs = [
        'spec/models/ContactSpec',
        'spec/collections/ContactListSpec'
    ];

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    $(function () {
        require(specs, function () {
            jasmineEnv.execute();
        });
    });
});
