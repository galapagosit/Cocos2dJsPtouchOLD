
var MenuLayer = cc.Layer.extend({
    root: null,
    common_scroll_sheet_controller: null,
    ctor:function () {
        this._super();

        // UIの初期化
        this.root = ccs.uiReader.widgetFromJsonFile(res.UiMenu_json);
        this.addChild(this.root);

        // ボタン制御
        var button_about_app = ccui.helper.seekWidgetByName(this.root, "button_about_app");
        button_about_app.addTouchEventListener(this.buttonAboutAppTouchEvent, this);

        // スクロールシート用レイヤ
        this.common_scroll_sheet_controller = new CommonScrollSheetController();
        this.common_scroll_sheet_controller.init(this.root);

        return true;
    },
    buttonAboutAppTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");

            this.common_scroll_sheet_controller.appear("ページタイトルだよ", "セクションタイトルだよ", "本文だよ\nとても長い");
            break;
        }
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});

