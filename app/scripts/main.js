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