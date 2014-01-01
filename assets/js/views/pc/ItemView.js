define([
    'backbone',
    'jst/pc'
], function (Backbone, JST) {

    'use strict';

    var ItemView = Backbone.View.extend({
        tagName: 'li',
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'remove', this.remove);
        },
        render: function() {
            this.$el.html(JST['pc/item']({source: this.presenter()}));
            return this;
        },
        presenter: function() {
            return this.model.toEscapedJSON();
        }
    });

    return ItemView;

});