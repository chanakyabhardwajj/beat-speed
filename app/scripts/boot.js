window.bs = {};
bs.vent = _.extend({}, Backbone.Events);

bs.firebase = new (function(){
    this.url = "https://beat-speed.firebaseIO.com/";
    this.root = new Firebase(this.url);
    this.users =  new Firebase(this.url + "users/");
    this.userSongs = null;

    this.createUserSongs = function(user){
        this.userSongs = new Firebase(this.url + "users/" + user.id + "/songs");
    }

    this.cleanUp = function(){
        if(this.userSongs){        
            this.userSongs.off('child_added');
            this.userSongs.off('value');
            this.userSongs = null;
        }
    };

    var that = this;
    this.authClient = new FirebaseSimpleLogin(this.root, function(error, user) {
        if (error) {
            bs.vent.trigger("AUTHENTICATION.FAIL", {data: error});
        } 

        else if (user) {
            bs.vent.trigger("AUTHENTICATION.SUCCESS", user);
        }

        else {
            bs.vent.trigger("AUTHENTICATION.RETRY");
        }
    });
    return this;
})();