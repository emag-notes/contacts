define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    'use strict';

    var Contact = Backbone.Model.extend({
        index: function() {
            return this.get('name').toUpperCase();
        },
        validate: function(attrs) {
            var model, errors = {};
            if (!attrs.name) errors.name = "Name is required";
            if (attrs.email) {
                if (!/[^\s@]+@\S+\.\S+/.test(attrs.email)) {
                    errors.email = 'Invalid address';
                } else {
                    model = this.collection.findWhere({email: attrs.email});
                    if (model && model.id !== this.id) {
                        errors.email = 'This address is already in use';
                    }
                }
            }
            return _.isEmpty(errors) ? null : errors;
        },
        toEscapedJSON: function() {
            var data = this.toJSON();
            _.each(data, function(value, name) {
                data[name] = _.escape(value);
            });
            return data;
        }
    });
    return Contact;

});
