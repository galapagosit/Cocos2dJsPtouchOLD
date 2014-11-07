
function PlayerArmature() {
    this.y_force = null;
    this.initialize = function() {
        this.scaleX = 0.5;
        this.scaleY = 0.5;
        this.x = 100;
        this.y = 100;

        CommonUtil.dispPos(this, cc.color.GREEN);

        // タッチイベント登録
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log(target.getName() + " >>> onTouchBegan");
                target.jump();

                return false;
            }
        });
        cc.eventManager.addEventListenerWithSceneGraphPriority(listener, this);

        this.getAnimation().play("loading");

        // フレーム毎の処理
        this.scheduleUpdate();
    };
    this.update = function(dt) {
        if(this.y_force === null){
            return;
        }

        this.y += this.y_force;
        this.y_force -= 5;
        if(this.y < 100){
            this.y_force = null;
            this.y = 100;
            this.getAnimation().play("loading");
        }
    };
    this.jump = function() {
        cc.audioEngine.playEffect(this.mp3File());
        this.getAnimation().play("attack");
        this.y_force = 50;
    };
    this.mp3File = function() {
        return 'res/sound/Animals/Bear.mp3';
    };
}

var ActionLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        // UIの初期化
        this.root = ccs.uiReader.widgetFromJsonFile(res.UiField_json);
        this.addChild(this.root);

        // プレイヤー初期化
        this.initPlayer();

        return true;
    },
    initPlayer:function () {
        ccs.armatureDataManager.addArmatureFileInfo("res/Animation/tauren/tauren.ExportJson");
        var armature = ccs.Armature.create("tauren");
        _.extend(armature, new PlayerArmature());
        armature.initialize();
        this.addChild(armature);
    }
});

var ActionScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new ActionLayer();
        this.addChild(layer);
    }
});

