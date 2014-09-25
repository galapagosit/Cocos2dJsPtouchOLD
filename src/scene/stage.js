
var StageLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        // UIの初期化
        var root = ccs.uiReader.widgetFromJsonFile(res.UiStage_json);
        this.addChild(root);

        // ボタンのイベント登録
        var button_stage_animal = ccui.helper.seekWidgetByName(root, "button_stage_animal");
        button_stage_animal.addTouchEventListener(this.buttonStageAnimalTouchEvent, this);

        return true;
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

