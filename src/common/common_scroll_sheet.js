
var CommonScrollSheetController = cc.Class.extend({
    root: null,
    modal_layer: null,

    init:function (root) {
        this.root = root;
        this.modal_layer = ccs.uiReader.widgetFromJsonFile(res.UiCommonScrollSheet_json);
        // これしないとInvalid Native Object
        this.modal_layer.retain();

        // ボタン制御
        var button_common_close = ccui.helper.seekWidgetByName(this.modal_layer, "button_common_close");
        button_common_close.addTouchEventListener(this.buttonCommonCloseTouchEvent, this);
    },
    buttonCommonCloseTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            this.disappear();
            break;
        }
    },
    appear: function (title, section_title, text) {
        // 親レイヤにモーダル用のレイヤを追加
        this.root.addChild(this.modal_layer);

        jsb.Bridge.actionManagerExPlayActionByName(res.UiCommonScrollSheet_json, "sheet_in");
    },
    disappear: function () {
        jsb.Bridge.actionManagerExPlayActionByNameWithCallback(res.UiCommonScrollSheet_json, "sheet_out", this, "sheetOutCallback");
    },
    sheetOutCallback: function () {
        cc.log("sheetOutCallback called!!");
        this.root.removeChild(this.modal_layer, true);
    }
});

