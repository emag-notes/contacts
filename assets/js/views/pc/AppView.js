define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    'use strict';

    var AppView = Backbone.View.extend({
        mainview: null,
        initialize: function() {
            this.listenTo(this.options.router, 'route', this.dispatch);
        },
        dispatch: function(name, args) {
            if (!_.include(['index', 'new', 'show', 'edit'], name)) return;
            if (this.mainview) this.mainview.remove();
        }
    });
    return AppView;

});