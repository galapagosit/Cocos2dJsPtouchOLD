
var StageLayer = cc.Layer.extend({
    root: null,
    ctor:function () {
        this._super();

        // UIの初期化
        this.root = ccs.uiReader.widgetFromJsonFile(res.UiStage_json);
        this.addChild(this.root);

        // ボタンのイベント登録
        var button_index = ccui.helper.seekWidgetByName(this.root, "button_index");
        button_index.addTouchEventListener(this.buttonIndexTouchEvent, this);

        var button_stage_animal = ccui.helper.seekWidgetByName(this.root, "button_stage_animal");
        button_stage_animal.addTouchEventListener(this.buttonStageAnimalTouchEvent, this);

        // フィールドに入れる、入れないのテスト
        var can_enter = jsb.Bridge.fieldAuthCanEnterField("vegetable");
        cc.log("can_enter:" + can_enter);

        jsb.Bridge.fieldAuthEnableEnterField("vegetable");

        var can_enter = jsb.Bridge.fieldAuthCanEnterField("vegetable");
        cc.log("can_enter:" + can_enter);

        return true;
    },
    buttonIndexTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            cc.director.runScene(new cc.TransitionFade(0.5, new IndexScene()));
            break;
        }
    },
    buttonStageAnimalTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> Touch Up");
            cc.LoaderScene.preload(g_resources, function () {
                cc.director.runScene(new FieldScene());
            }, this);
            break;
        default:
            break;
        }
    }
});

var StageScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StageLayer();
        this.addChild(layer);
    }
});

