define([
    'models/Contact'
], function(Contact) {
    describe('Contact', function() {
        describe('#toEscapedJSON', function() {
            it('should return html escaped toJSON object', function() {
                var contact = new Contact({name: '<script>'});
                expect(contact.toEscapedJSON().name).toBe('&lt;script&gt;');
            });
        });
    });
});