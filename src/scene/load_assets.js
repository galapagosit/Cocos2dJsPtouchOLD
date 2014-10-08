var LoadAssetsLayer = cc.Layer.extend({

    MANIFEST_PATH:"res/Manifests/project.manifest",

    ctor:function () {
        this._super();
        this.load_assets();
        return true;
    },
    storagePath:function () {
        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
        cc.log("storagePath:" + storagePath);
        return storagePath;
    },
    load_assets:function () {
        var storagePath = this.storagePath()
        var manager = new jsb.AssetsManager(this.MANIFEST_PATH, storagePath);
        // As the process is asynchronised, you need to retain the assets manager to make sure it won't be released before the process is ended.
        manager.retain();

        if (!manager.getLocalManifest().isLoaded()) {
            cc.log("Fail to update assets, step skipped.");
        } else {
            var that = this;
            var listener = new jsb.EventListenerAssetsManager(manager, function(event) {
                switch (event.getEventCode())
                {
                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                        cc.log("jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST");
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                        cc.log("jsb.EventAssetsManager.UPDATE_PROGRESSION");
                        cc.log(event.getPercent() + "%");
                        break;
                    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                        cc.log("jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST");
                        break;
                    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                        cc.log("jsb.EventAssetsManager.ERROR_PARSE_MANIFEST");
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                        cc.log("jsb.EventAssetsManager.ALREADY_UP_TO_DATE");
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_FINISHED:
                        cc.log("jsb.EventAssetsManager.UPDATE_FINISHED");
                        cc.log("Update finished. " + event.getMessage());
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_FAILED:
                        cc.log("jsb.EventAssetsManager.UPDATE_FAILED");
                        cc.log("Update failed. " + event.getMessage());
                        break;
                    case jsb.EventAssetsManager.ERROR_UPDATING:
                        cc.log("jsb.EventAssetsManager.ERROR_UPDATING");
                        cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                        cc.log("jsb.EventAssetsManager.ERROR_DECOMPRESS");
                        cc.log(event.getMessage());
                        that.loadGame();
                        break;
                    default:
                        break;
                }
            });
            cc.eventManager.addListener(listener, 1);
            manager.update();
        }
    },
    loadGame:function(){
        cc.loader.loadJs(["src/jsList.js"], function(){
            cc.loader.loadJs(jsList, function(){
                cc.director.runScene(new IndexScene());
            });
        });
    }
});

var LoadAssetsScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LoadAssetsLayer();
        this.addChild(layer);
    }
});

