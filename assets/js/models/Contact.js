define([
    'backbone'
], function(Backbone) {

    'use strict';

    var Contact = Backbone.Model.extend({
        index: function() {
            return this.get('name').toUpperCase();
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
