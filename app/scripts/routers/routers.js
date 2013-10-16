bs.Router = Backbone.Router.extend({
    initialize: function() {
        this.listenTo(bs.vent, "AUTHENTICATION.SUCCESS", this.renderHome);
        this.listenTo(bs.vent, "AUTHENTICATION.FAIL", this.renderLogin);
        this.listenTo(bs.vent, "AUTHENTICATION.RETRY", this.renderLogin);
        _.bindAll(this, "renderHome", "renderLogin");
    },

    routes: {
        "": "renderLogin",
        "login": "renderLogin",
        "home": "renderHome"
    },

    renderLogin: function() {
        this.cleanupHome();
        this.loginView = new bs.LoginView();
    },

    cleanupLogin: function() {
        if (this.loginView) this.loginView.killView();
    },

    renderHome: function(user) {
        this.cleanupLogin();

        this.homeView = new bs.HomeView({
            model: bs.user,
            oldSongs: bs.oldSongs,
            newSongs: bs.newSongs,
            user: user
        });
    },

    cleanupHome: function() {
        if (this.homeView) this.homeView.killView();

        bs.user.clear();
        bs.oldSongs.reset();
        
        bs.firebase.cleanUp();
    }

});