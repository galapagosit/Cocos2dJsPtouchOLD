
var StageLayer = cc.Layer.extend({
    root: null,
    ctor:function () {
        this._super();

        FieldAuthAPI.initDB();

        // UIの初期化
        this.root = ccs.uiReader.widgetFromJsonFile(res.UiStage_json);
        this.addChild(this.root);

        // ボタンのイベント登録
        var button_index = ccui.helper.seekWidgetByName(this.root, "button_index");
        button_index.addTouchEventListener(this.buttonIndexTouchEvent, this);

        // フィールド一覧を初期化
        this.initFields();

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
    initFields: function () {
        var all_fields = FieldAuthAPI.allFields();
        _.each(all_fields, function(element, index, array) {
            cc.log(element.field_name);
            cc.log(element.canEnterField());
        }, this);
    },
    buttonStageAnimalTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> Touch Up");
            cc.LoaderScene.preload(g_resources, function () {
                cc.director.runScene(new FieldScene('animal'));
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

