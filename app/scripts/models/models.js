bs.User = Backbone.Model.extend({
    initialize: function() {
        this.listenTo(bs.vent, "AUTHENTICATION.SUCCESS", this.updateMyself);
        _.bindAll(this, "updateMyself");
    },

    updateMyself: function(user) {
        var myUser = bs.firebase.users.child(user.id);
        myUser.child("first_name").set(user.first_name);
        myUser.child("last_name").set(user.last_name);
        myUser.child("profileUrl").set(user.profileUrl);

        this.set({
            "first_name": user.first_name,
            "last_name": user.last_name,
            "profileUrl": user.profileUrl
        });
    }
});

bs.OldSong = Backbone.Model.extend({});
bs.NewSong = Backbone.Model.extend({});