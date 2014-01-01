require.config({
    baseUrl: '/assets/js',
    paths: {
        'jquery': 'vendor/jquery-2.0.3',
        'jquery.mobile': 'vendor/jquery.mobile-1.4.0',
        'underscore': 'vendor/underscore',
        'backbone': 'vendor/backbone',
        'backbone.localStorage': 'vendor/backbone.localStorage'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        }
    }
});