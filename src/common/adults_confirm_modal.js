
var AdultsConfirmModalController = cc.Class.extend({
    root: null,
    callback: null,
    modal_layer: null,
    init:function (root, callback) {
        this.root = root;
        this.callback = callback;
        this.modal_layer = ccs.uiReader.widgetFromJsonFile(res.UiAdultsConfirmModal_json);
        // これしないとInvalid Native Object
        this.modal_layer.retain();

        var button_modal_close = ccui.helper.seekWidgetByName(this.modal_layer, "button_modal_close");
        button_modal_close.addTouchEventListener(this.buttonModalCloseTouchEvent, this);
    },
    buttonModalCloseTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            this.disappear();
            break;
        }
    },
    appear: function () {
        // 親レイヤにモーダル用のレイヤを追加
        this.root.addChild(this.modal_layer);
        // フェードイン
        jsb.Bridge.actionManagerExPlayActionByName(res.UiAdultsConfirmModal_json, "fade_in");
    },
    disappear: function () {
        this.root.removeChild(this.modal_layer, true);
    }
});

