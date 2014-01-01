define([
    'backbone',
    'backbone.localStorage',
    'models/Contact'
], function(Backbone, LocalStorage, Contact) {

    'use strict';

    var ContactList = Backbone.Collection.extend({
        localStorage: new LocalStorage("contact"),
        model: Contact,
        comparator: function(contact) {
            return contact.index();
        }
    });
    return ContactList;

});