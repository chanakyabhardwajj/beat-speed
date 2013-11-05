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
this["bs"] = this["bs"] || {};
this["bs"]["templates"] = this["bs"]["templates"] || {};

this["bs"]["templates"]["header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"navbar navbar-fixed-top clearfix\">\n        <div class=\"navbar-inner\">\n            <ul class=\"nav pull-left\">\n                <li id=\"descriptionBox\" class=\"\">\n                    <!--\n                    <a href=\"https://github.com/chanakyabhardwajj/beat-speed\"><img style=\"position: absolute; top: 0; left: 0; border: 0;\" src=\"https://s3.amazonaws.com/github/ribbons/forkme_left_orange_ff7600.png\" alt=\"Fork me on GitHub\"></a>\n                    -->\n                    <em>beat speed</em> built with Soundcloud, Three.js, Sparks.js, Dancer.js & Bootstrap\n                </li>\n            </ul>\n\n            <ul class=\"nav pull-right\">\n                <li id=\"userBox\" class=\"\">\n	                <div id=\"userName\" href=\"#\">\n					    <span>Yo ";
  if (stack1 = helpers.first_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.first_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n					</div>\n				</li>\n            </ul>\n        </div>\n    </div>\n\n\n";
  return buffer;
  });

this["bs"]["templates"]["home"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header id=\"header\"></header>\n\n<div id=\"oldSongsBox\">\n    <div>Your previous songs</div>\n    <ul id=\"oldSongsList\"></ul>\n</div>\n\n\n\n<div id=\"mainSongSection\"></div>";
  });

this["bs"]["templates"]["login"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"block loginBox\">\n    <div id=\"loginButton\" class=\"zocial facebook\">Login with Facebook</div>\n</div>\n<div id=\"loginError\" class=\"alert alert-error hide\">There was an error in signing up. Try again.</div>";
  });

this["bs"]["templates"]["mainSong"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"songStuff\">\n    <div id=\"songBox\" class=\"input-prepend input-append\">\n        <span class=\"add-on\"><i class=\"icon-music\"></i></span>\n        <input class=\"span2\" id=\"songQuery\" type=\"text\" placeholder=\"search for any song\">\n        <span class=\"add-on clearQuery\"><i class=\"icon-remove\"></i></span>\n    </div>\n    <p class=\"progressInd icon-spinner icon-spin hide\"></p>\n    <div id=\"songResults\" class=\"row-fluid\"></div>\n</div>\n<canvas id=\"songCanvas\" width=\"100\" height=\"100\"></canvas>";
  });

this["bs"]["templates"]["newSong"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"center songResult\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-uri=\"";
  if (stack1 = helpers.uri) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uri; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-artwork_url=\"";
  if (stack1 = helpers.artwork_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.artwork_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-title=\"";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-user=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" >\n    <div class=\"songResultImageSection clearfix\">\n        <img src=\"";
  if (stack2 = helpers.artwork_url) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.artwork_url; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"songResultImg\">\n    </div>\n    <div class=\"songResultTextSection clearfix\">\n        <h5 class=\"songTitle\">";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</h5>\n        <p class=\"songUserName\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n    </div>\n</div>";
  return buffer;
  });

this["bs"]["templates"]["oldSong"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"oldSong\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-uri=\"";
  if (stack1 = helpers.uri) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uri; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-artwork_url=\"";
  if (stack1 = helpers.artwork_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.artwork_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-title=\"";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-user=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" >\n    <img class=\"oldSongImage pull-left\" src=\"";
  if (stack2 = helpers.artwork_url) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.artwork_url; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\"/>\n    <span class=\"oldSongTitle pull-left\"><em>";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</em></span>\n    <span class=\"oldSongUser  pull-left hide\">";
  if (stack2 = helpers.user) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.user; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n</div>\n";
  return buffer;
  });
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
bs.LoginView = Backbone.View.extend({
    el: "#loginSection",
    template: bs.templates.login,
    initialize: function() {
        this.render();
    },
    events: {
        "click #loginButton": "authenticateUser"
    },

    render: function() {
        var entry = this.template();
        this.$el.html(entry);
        return this;
    },

    authenticateUser: function() {
        bs.firebase.authClient.login("facebook");
    },

    killView: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }
});



bs.HeaderView = Backbone.View.extend({
    template: bs.templates.header,
    initialize: function() {
        _.bindAll(this, "render");
        this.listenTo(this.model, "change", this.render);
        this.render();
    },
    events: {
        "click #userName": "logOut"
    },

    render: function() {
        var entry = this.template(this.model.attributes);
        this.$el.html(entry);
        return this;
    },

    logOut: function() {
        bs.firebase.authClient.logout();
    }
});



bs.OldSongView = Backbone.View.extend({
    template: bs.templates.oldSong,
    initialize: function() {
        this.render();
    },

    events: {
        "click .oldSong": "playSong"
    },

    playSong: function() {        
        var song = this.model.attributes;
        bs.vent.trigger("SONG.PLAY", song); 
    },

    render: function() {
        var entry = this.template(this.model.attributes);
        this.$el.html(entry);
        return this;
    }
});



bs.OldSongsView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.collection, "add", this.addOldSong);
        _.bindAll(this, "addOldSong");
    },

    addOldSong: function(oldSong) {
        var view = new bs.OldSongView({
            model: oldSong
        });
        this.$el.prepend(view.render().el);
    }
});


bs.NewSongView = Backbone.View.extend({
    template: bs.templates.newSong,
    initialize: function() {
        _.bindAll(this, "playSong", "render");
        this.render();
    },

    events: {
        "click .songResult": "playSong"
    },

    playSong: function() {               
        var song = this.model.attributes;
        bs.vent.trigger("SONG.PLAY", song);        
    },

    render: function() {
        var entry = this.template(this.model.attributes);
        this.$el.html(entry);
        return this;
    }
});



bs.MainSongView = Backbone.View.extend({
    template: bs.templates.mainSong,
    initialize: function() {
        this.dancer = new Dancer();
        this.h = 0;    
        this.acc = 10;
        this.particles = [];
        this.particleDelta = 0;
        this.particle = null;
        this.lasttime = Date.now();
        this.elapsed = null;        
        this.sparksEmitter = null;

        this.listenTo(bs.vent, "SONG.PLAY", this.streamFromSC);
        this.listenTo(this.collection, "add", this.addNewSong);
        this.listenTo(this.collection, "reset", this.render);
        _.bindAll(this, "render", "keyDown", "addNewSong", "clearResults", "searchSC", "initScene", "onwindowresize", "initSparks", "sparksCallback", "onParticleCreated", "onParticleDead", "playPause", "animate", "renderScene");
        this.render();

        
    },

    events: {
        "keydown #songQuery": "keyDown",
        "click #songCanvas": "interruptClick",
        "keydown #songCanvas": "interruptEscape",
        "click .clearQuery": "clearResults"
    },

    render: function() {
        

        var entry = this.template();
        this.$el.html(entry);

        this.initScene();
        this.initSparks();


        return this;
    },

    addNewSong: function(newSong) {
        var view = new bs.NewSongView({
            model: newSong
        });
        this.$el.find("#songResults").append(view.render().el);
    },

    interruptClick: function(e) {
        this.playPause();            
        e.stopPropagation();
    },

    interruptEscape: function(e) {
        if(e.keyCode == 27) {
            this.playPause();            
        }
        e.stopPropagation();
    },

    keyDown: function(e) {
        if (e.keyCode == 13) {
            this.$el.find(".progressInd").show();
            this.searchSC($("#songQuery").val());
        }
        e.stopPropagation();
    },

    searchSC: function(songName) {
        if (!SC) {
            console.log("SoundCloud object did not instantiate! Oops!");
            return;
        } else {
            var that = this;
            SC.get('/tracks', {
                q: songName,
                limit: 52,
                order: 'hotness'
            }, function(tracks) {
                $("#songQuery").val("");
                if (tracks.length > 0) {
                    var template = bs.templates.songResult;
                    that.collection.reset();
                    $.each(tracks, function(i, o) {
                        that.collection.add(new bs.NewSong(o));
                    })
                } else {
                    $("#songResults").append($("<p> No results :( </p>").addClass('orange'));
                }
                $(".progressInd").hide();
            });
        }
    },

    streamFromSC: function(data) {
        var song = data;
        var self = this;

        var oldSong = bs.firebase.userSongs.child(song.id);
        oldSong.set(song);

        SC.stream("/tracks/" + song.id, function(sound) {
            var song_streamURL = sound.url;
            if (self.dancer && self.dancer.isPlaying()) {
                self.dancer.pause();
            }
            delete self.dancer;
            self.dancer = new Dancer();
            self.dancer.load({
                src: song_streamURL
            });
            $(".progressInd").show();

            self.dancer.bind("loaded", function(){self.playSong.apply(self)});

            self.dancer.bind("update", function(){
                if(self.dancer.audio.currentTime>=self.dancer.audio.duration){                    
                    self.playPause();
                }
            });
            
            kick = self.dancer.createKick({
                threshold: 0.001,
                frequency: [0, 511],
                decay: 0.02,
                onKick: function(mag) {
                    self.particleDelta = -2.5;
                },
                offKick: function(mag) {
                    self.particleDelta = 1;
                }
            });
            kick.on();
            self.dancer.play();

            if (!window.webkitAudioContext) {
                alert("Web Audio isn't available in your browser. But...you can still play the HTML5 audio :)");
                return;
            }
        });
    },

    clearResults: function() {
        this.collection.reset();
    },

    initScene: function() {
        this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 4000);
        this.camera.position.z = 200;
        this.scene = new THREE.Scene();
        this.scene.add(this.camera);
        this.group = new THREE.Object3D();
        this.scene.add(this.group);  
        this.renderer = new THREE.CanvasRenderer({
            canvas: document.getElementById("songCanvas")
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);        
        window.addEventListener('resize', this.onwindowresize, false);       
    },    

    onwindowresize: function() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    },

    initSparks: function() {
        this.sparksEmitter = new SPARKS.Emitter(new SPARKS.SteadyCounter(200));
        this.sparksEmitter.addInitializer(new SPARKS.Position(new SPARKS.PointZone(new THREE.Vector3(0, 0, 0))));
        this.sparksEmitter.addInitializer(new SPARKS.Lifetime(0, 3));
        this.sparksEmitter.addInitializer(new SPARKS.Target(null, this.sparksCallback));
        this.sparksEmitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0, 0, 0.2))));

        this.sparksEmitter.addAction(new SPARKS.Age());
        this.sparksEmitter.addAction(new SPARKS.Move());
        this.sparksEmitter.addAction(new SPARKS.RandomDrift(500, 500, 0));
        this.sparksEmitter.addAction(new SPARKS.Accelerate(0, 0, 10));

        this.sparksEmitter.addCallback("created", this.onParticleCreated);
        this.sparksEmitter.addCallback("dead", this.onParticleDead);        
    },

    sparksCallback: function() {
        var material = new THREE.ParticleCanvasMaterial({
            program: SPARKS.CanvasShadersUtils.circles,
            blending: THREE.AdditiveBlending
        });
        var h = this.h;

        material.color.setHSV(h, 1, 0.3); //0.7
        h += 0.001;
        if (h > 1) h -= 1;

        particle = new THREE.Particle(material);

        particle.scale.x = particle.scale.y = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        this.group.add(particle);

        return particle;
    },

    onParticleCreated: function(p) {
        var position = p.position;
        p.target.position = position;
    },

    onParticleDead: function(particle) {
        particle.target.visible = false; // is this a work around?
        this.group.remove(particle.target);
    },

    playSong: function(){
        var self = this;
        $(".progressInd").hide();
        $("#songQuery").val("");
        $("#songStuff").fadeOut();
        $("#oldSongsBox").fadeOut(); 
        self.sparksEmitter.start();
        self.animate();
        self.dancer.play();
    },

    pauseSong: function(){
        this.dancer.pause();
        this.sparksEmitter.stop();
        //$("#songResults").empty();
        $("#songQuery").val("").focus();
        $("#songStuff").fadeIn();
        $("#oldSongsBox").fadeIn();
    },

    playPause: function(event) {
        console.log(this);
        if (this.dancer.isPlaying()) {
            this.pauseSong();
        } else {
            this.playSong();
        }        
    },

    animate: function() {
        requestAnimationFrame(this.animate);
        this.renderScene();
    },

    renderScene: function() {
        this.renderer.render(this.scene, this.camera);
        TWEEN.update();
    }

});



bs.HomeView = Backbone.View.extend({
    el: "#homeSection",
    template: bs.templates.home,
    initialize: function() {
        this.render();
        this.headerView = new bs.HeaderView({
            el: "#header",
            model: this.model
        });
        this.oldSongsView = new bs.OldSongsView({
            el: "#oldSongsList",
            collection: this.options.oldSongs
        });
        this.mainSongView = new bs.MainSongView({
            el: "#mainSongSection",
            collection: this.options.newSongs
        })
        _.bindAll(this, "render");
    },

    render: function() {
        var entry = this.template();
        this.$el.html(entry);

        this.$el.find(".progressInd").hide();
        this.$el.find("#songQuery").focus();
    },

    killView: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        if (this.headerView) {
            this.headerView.unbind();
            this.headerView.remove();
        }
        if (this.oldSongsView) {
            this.oldSongsView.unbind();
            this.oldSongsView.remove();
        }
        if (this.mainSongView) {
            this.mainSongView.unbind();
            this.mainSongView.remove();
        }
        return this;
    }
});
bs.user = new bs.User();
bs.oldSongs = new bs.OldSongs();
bs.newSongs = new bs.NewSongs();

bs.router = new bs.Router();
Backbone.history.start();



if (SC) {
    SC.initialize({
        client_id: 'ee7adec6ad3dae8ccfa999e7f467dc38'
    });
};