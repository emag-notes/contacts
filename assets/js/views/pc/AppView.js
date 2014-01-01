define([
    'jquery',
    'underscore',
    'backbone',
    './ListView',
    './NewView',
    'jst/pc'
], function($, _, Backbone, ListView, NewView, JST) {

    'use strict';

    var AppView = Backbone.View.extend({
        mainview: null,
        events: {
            'click .new': function(e) {
                e.preventDefault();
                Backbone.history.navigate('new', true);
            }
        },
        initialize: function() {
            this.listenTo(this.options.router, 'route', this.dispatch);
        },
        render: function() {
            this.$el.html(JST['pc/app']());
            this.listview = new ListView({
                collection: this.collection
            });
            this.$('#contactlist').append(this.listview.render().el);
            return this;
        },
        dispatch: function(name, args) {
            if (!_.include(['index', 'new', 'show', 'edit'], name)) return;
            if (this.mainview) this.mainview.remove();
            args || (args = []);
            this.listview.select(args[0]);
            switch (name) {
                case 'new':
                    this.newContact();
                    break;
            }
        },
        newContact: function() {
            var model = new this.collection.model(null, {collection: this.collection});
            this.mainview = new NewView({model: model});
            this.$('#main').append(this.mainview.render().el);
        }
    });
    return AppView;

});