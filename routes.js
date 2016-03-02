
Router.configure({
    layoutTemplate: 'ApplicationLayout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

Router.route('/', function() {
    this.render('login', {
        to: "main"
    })
    // this.render('navigation', {
    //     to: "navbar"
    // });
});

// Router.route('/login', function() {
//     this.render('login');
//     this.render('navigation', {
//         to: "navbar"
//     });
// });

Router.route('/budget', function() {
    this.render('budget', {
        to: "main"
    })
});

Router.route('/accounts', function() {
    this.render('accounts', {
        to: "main"
    })
});

