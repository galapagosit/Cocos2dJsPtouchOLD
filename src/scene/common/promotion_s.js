
var PromotionSController = cc.Class.extend({
    root: null,
    promotion_layer: null,

    init:function (root) {
        this.root = root;
        this.promotion_layer = ccs.uiReader.widgetFromJsonFile(res.UiPromotionS_json);
        // これしないとInvalid Native Object
        this.promotion_layer.retain();

        // ボタン制御
        var button_promotion_s_close = ccui.helper.seekWidgetByName(this.promotion_layer, "button_promotion_s_close");
        button_promotion_s_close.addTouchEventListener(this.buttonPromotionSCloseTouchEvent, this);
    },
    buttonPromotionSCloseTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            this.disappear();
            break;
        }
    },
    appear: function (title, section_title, text) {
        // 親レイヤにモーダル用のレイヤを追加
        this.root.addChild(this.promotion_layer);
    },
    disappear: function () {
        this.root.removeChild(this.promotion_layer, true);
    }
});

