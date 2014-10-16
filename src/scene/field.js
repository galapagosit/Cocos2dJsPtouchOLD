
var FieldLayer = cc.Layer.extend({
    root: null,
    ctor:function () {
        this._super();

        // UIの初期化
        this.root = ccs.uiReader.widgetFromJsonFile(res.UiField_json);
        this.addChild(this.root);

        // ボタンのイベント登録
        var button_stage = ccui.helper.seekWidgetByName(this.root, "button_stage");
        button_stage.addTouchEventListener(this.buttonStageTouchEvent, this);

        this.animate_animal();
        return true;
    },
    buttonStageTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            cc.director.runScene(new cc.TransitionFade(0.5, new StageScene()));
            break;
        }
    },
    animate_animal:function () {
        cc.log("animate_animal start!!!");

        ccs.armatureDataManager.addArmatureFileInfo(res.AnimationBear_json);
        this._armature = ccs.Armature.create("Bear");
        this._armature.scaleX = 1;
        this._armature.scaleY = 1;
        this._armature.x = 640;
        this._armature.y = 360;

        this.addChild(this._armature);
        this._armature.getAnimation().setFrameEventCallFunc(this.onFrameEvent, this._armature);

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log(target.getName() + " >>> onTouchBegan");
                return true;
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log(target.getName() + " >>> onTouchEnded");

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(-(s.width/2), -(s.height/2), s.width, s.height);

                cc.log("locationInNode.x >>> " + locationInNode.x);
                cc.log("locationInNode.y >>> " + locationInNode.y);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.getAnimation().play("tapped");
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addEventListenerWithSceneGraphPriority(listener, this._armature);

        ccs.armatureDataManager.addArmatureFileInfo(res.AnimationPanda_json);
        this._armature2 = ccs.Armature.create("Panda");
        this._armature2.scaleX = 1;
        this._armature2.scaleY = 1;
        this._armature2.x = 800 / 2 + 250;
        this._armature2.y = 600 / 3;

        this.addChild(this._armature2);

        cc.log("animate_animal end");
    },
    onFrameEvent: function (bone, evt, originFrameIndex, currentFrameIndex) {
        cc.log("(" + bone.getName() + ") emit a frame event (" + evt + ") at frame index (" + currentFrameIndex + ").");
        cc.audioEngine.playEffect(res.Bear_mp3);
    }
});

var FieldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new FieldLayer();
        this.addChild(layer);
    }
});

