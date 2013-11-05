bs.OldSongs = Backbone.Collection.extend({
	model: bs.OldSong,

	initialize: function(){
		this.listenTo(bs.vent, "AUTHENTICATION.SUCCESS", this.startFetch);
		_.bindAll(this, "startFetch");
	},

	comparator : function(oldSong) {
	  return -1 * oldSong.get("timestamp");
	},

    startFetch: function(user) {
    	var that = this;
        bs.firebase.createUserSongs(user);
        bs.firebase.userSongs.on('value', function(snapshot) {
            console.log(snapshot.val());
            var obj = snapshot.val();
            for (var item in obj) {
                var oldSong = new bs.OldSong(obj[item]);
                that.add(oldSong);
            }
        });
        bs.firebase.userSongs.off('value');

        bs.firebase.userSongs.on('child_added', function(snapshot) {
            var obj = snapshot.val();
            var oldSong = new bs.OldSong(obj);
            that.add(oldSong);
        });

    }
});

bs.NewSongs = Backbone.Collection.extend({
    model: bs.NewSong
});