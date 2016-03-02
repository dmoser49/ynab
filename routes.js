
Router.configure({
    layoutTemplate: 'ApplicationLayout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

Router.route('/', function() {
    this.render('welcome', {
        to: "main"
    });
});

Router.route('/login', function() {
    this.render('login');
    this.render('navigation', {
        to: "navbar"
    });
});

