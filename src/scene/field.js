
var LanguageConfig = {
    type: 'jp'
}

function TouchObject(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;

    this.scaleX = function() {
        return 0.5;
    };
    this.scaleY = function() {
        return 0.5;
    };
    this.animatureJsonFile = function() {
        return 'res/Animation/Animals/' + this.name + '/' + this.name + '.ExportJson';
    };
    this.mp3File = function() {
        // 後で振り分け
        cc.log(LanguageConfig.type);
        return 'res/sound/Animals/' + this.name + '.mp3';
    };
    this.onFrameEvent = function(bone, evt, originFrameIndex, currentFrameIndex) {
        cc.log("(" + bone.getName() + ") emit a frame event (" + evt + ") at frame index (" + currentFrameIndex + ").");
        cc.audioEngine.playEffect(this.mp3File());
    };
}

var ANIMAL_TOUCH_OBJECT_MAPS = [
    {
        name: 'Bear',
        x: 640,
        y: 360
    },
    {
        name: 'Panda',
        x: 1590,
        y: 160
    }
]

var TOUCH_OBJECT_MAPS = {
    'animal': ANIMAL_TOUCH_OBJECT_MAPS
}

var FieldLayer = cc.Layer.extend({
    category: null,
    root: null,
    big_layer: null,
    page: 1,
    ctor:function (category) {
        this._super();
        this.category = category;

        // UIの初期化
        this.root = ccs.uiReader.widgetFromJsonFile(res.UiField_json);
        this.addChild(this.root);

        // でかいレイヤー
        this.big_layer = new cc.LayerColor(cc.color(0, 0, 100, 100));
        this.big_layer.setContentSize(cc.size(1280 * this.scrollNum(), 720));
        this.root.addChild(this.big_layer);

        // ボタンのイベント登録
        var button_stage = ccui.helper.seekWidgetByName(this.root, "button_stage");
        button_stage.addTouchEventListener(this.buttonStageTouchEvent, this);

        var button_scroll_left = ccui.helper.seekWidgetByName(this.root, "button_scroll_left");
        button_scroll_left.addTouchEventListener(this.buttonScrollLeftTouchEvent, this);

        var button_scroll_right = ccui.helper.seekWidgetByName(this.root, "button_scroll_right");
        button_scroll_right.addTouchEventListener(this.buttonScrollRightTouchEvent, this);

        this.checkPageButton();

        // スイッチ
        var switchControl = new cc.ControlSwitch(
            new cc.Sprite("res/switch/switch-mask.png"),
            new cc.Sprite("res/switch/switch-on.png"),
            new cc.Sprite("res/switch/switch-off.png"),
            new cc.Sprite("res/switch/switch-thumb.png"),
            new cc.LabelTTF("jp", "Arial-BoldMT", 16),
            new cc.LabelTTF("en", "Arial-BoldMT", 16)
        );
        switchControl.x = 1080;
        switchControl.y = 100;
        this.root.addChild(switchControl);
        switchControl.addTargetWithActionForControlEvents(this, this.switchValueChanged, cc.CONTROL_EVENT_VALUECHANGED);

        // Update the value label
        this.switchValueChanged(switchControl, cc.CONTROL_EVENT_VALUECHANGED);

        // コンテンツの配置
        this.setTouchObject();

        return true;
    },
    scrollNum:function () {
        return 3;
    },
    buttonStageTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            cc.director.runScene(new cc.TransitionFade(0.5, new StageScene()));
            break;
        }
    },
    buttonScrollLeftTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            this.page -= 1;
            this.moveToPage();
            break;
        }
    },
    buttonScrollRightTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            this.page += 1;
            this.moveToPage();
            break;
        }
    },
    moveToPage: function () {
        this.checkPageButton();
        var move = cc.moveTo(0.7, cc.p((1 - this.page) * 1280, 0)).easing(cc.easeElasticOut());
        this.big_layer.runAction(move);
    },
    checkPageButton: function () {
        var button_scroll_left = ccui.helper.seekWidgetByName(this.root, "button_scroll_left");
        if(this.page <= 1){
            button_scroll_left.setEnabled(false);
        }else{
            button_scroll_left.setEnabled(true);
        }

        var button_scroll_right = ccui.helper.seekWidgetByName(this.root, "button_scroll_right");
        if(this.page >= this.scrollNum()){
            button_scroll_right.setEnabled(false);
        }else{
            button_scroll_right.setEnabled(true);
        }
    },
    switchValueChanged:function (sender, controlEvent) {
        if (sender.isOn()) {
            LanguageConfig.type = 'jp';
        }
        else {
            LanguageConfig.type = 'en';
        }
    },
    buttonStageTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            cc.director.runScene(new cc.TransitionFade(0.5, new StageScene()));
            break;
        }
    },
    setTouchObject:function () {

        _.each(TOUCH_OBJECT_MAPS[this.category], function(element, index, array) {
            var touchObject = new TouchObject(element.name, element.x, element.y);

            ccs.armatureDataManager.addArmatureFileInfo(touchObject.animatureJsonFile());
            var armature = ccs.Armature.create(touchObject.name);

            armature.scaleX = touchObject.scaleX();
            armature.scaleY = touchObject.scaleY();
            armature.x = touchObject.x;
            armature.y = touchObject.y;
            armature.getAnimation().setFrameEventCallFunc(touchObject.onFrameEvent, touchObject);

            // タッチイベント登録
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

                    // タッチした範囲の判定
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
            cc.eventManager.addEventListenerWithSceneGraphPriority(listener, armature);

            this.big_layer.addChild(armature);
        }, this);
    }
});

var FieldScene = cc.Scene.extend({
    category: null,
    ctor:function (category) {
        this._super();
        this.category = category;
        return true;
    },
    onEnter:function () {
        this._super();
        var layer = new FieldLayer(this.category);
        this.addChild(layer);
    }
});

