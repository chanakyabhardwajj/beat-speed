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
        window.scrollTo(0,0);
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
        window.scrollTo(0,0);
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
        $(".progressInd").show();
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

        material.color.setHSV(Math.random(), 1, 0.3); //0.7
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