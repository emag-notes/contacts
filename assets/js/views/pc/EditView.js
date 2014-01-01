define([
    'underscore',
    'backbone',
    'jst/pc'
], function(_, Backbone, JST) {

    'use strict';

    var EditView = Backbone.View.extend({
        className: 'edit-view',
        events: {
            'click .delete': 'onClickDelete',
            'click .cancel': function(e) {
                e.preventDefault();
                Backbone.history.navigate(this.model.id, true);
            }
        },
        initialize: function() {
            _.bindAll(this, 'onClickDelete');
            this.listenTo(this.model, 'invalid', this.renderValidationMessage);
            this.listenTo(this.model, 'sync', function(model) {
                model.collection.add(model);
                Backbone.history.navigate(model.id, true);
            });
            this.listenTo(this.model, 'destroy', function() {
                Backbone.history.navigate('', true);
            })
        },
        render: function() {
            this.$el.html(JST['pc/edit']({source: this.presenter()}));
            this.$('form').on('submit', _.bind(this.onSubmit, this));
            return this;
        },
        renderValidationMessage: function(model, errors) {
            var lis = _.map(errors, function(value, name) {
                return '<li><strong>' + name + '</strong>' + value + '</li>';
            });
            this.$('.alert').show().find('ul').html(lis.join(''));
            return this;
        },
        onSubmit: function(e) {
            e.preventDefault();
            var model = this.model;
            model.save(this.getValues());
        },
        onClickDelete: function(e) {
            e.preventDefault();
            this.model.destroy();
        },
        presenter: function() {
            return this.model.toEscapedJSON();
        },
        getValues: function() {
            var values = {};
            _.each(this.$('form').serializeArray(), function(obj) {
                values[obj.name] = obj.value;
            });
            return values;
        }
    });

    return EditView;

});
