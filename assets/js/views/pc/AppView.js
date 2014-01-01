define([
    'jquery',
    'underscore',
    'backbone',
    './ListView',
    './NewView',
    './ShowView',
    './EditView',
    'jst/pc'
], function($, _, Backbone, ListView, NewView, ShowView, EditView, JST) {

    'use strict';

    var AppView = Backbone.View.extend({
        mainview: null,
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
                case 'show':
                    this.showContact.apply(this, args);
                    break;
                case 'edit':
                    this.editContact.apply(this, args);
                    break;
            }
        },
        newContact: function() {
            var model = new this.collection.model(null, {collection: this.collection});
            this.mainview = new NewView({model: model});
            this.$('#main').append(this.mainview.render().el);
        },
        showContact: function(id) {
            var model = this.collection.get(id);
            if (!model) return;
            this.mainview = new ShowView({model: model});
            this.$('#main').html(this.mainview.render().el);
        },
        editContact: function(id) {
            var model = this.collection.get(id);
            if (!model) return;
            this.mainview = new EditView({model: model});
            this.$('#main').html(this.mainview.render().el);
        }
    });
    return AppView;

});