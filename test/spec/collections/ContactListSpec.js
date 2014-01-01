define([
    'collections/ContactList'
], function(ContactList) {
    describe('ContactList', function() {
        it('should sort models by Contact#index', function() {
            var contactList = new ContactList();
            contactList.set([
                {name: 'bcd'}, {name: 'ACD'}, {name: 'abc'}
            ]);
            expect(contactList.pluck('name'))
                .toEqual(['abc', 'ACD', 'bcd']);
        });
    });
});