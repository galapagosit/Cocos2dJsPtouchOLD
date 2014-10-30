
var PromotionSController = cc.Class.extend({
    root: null,
    promotion_layer: null,
    field: null,
    is_share_appear: false,

    init:function (root) {
        this.root = root;
        this.promotion_layer = ccs.uiReader.widgetFromJsonFile(res.UiPromotionS_json);
        // これしないとInvalid Native Object
        this.promotion_layer.retain();

        // ボタン制御
        var button_promotion_s_close = ccui.helper.seekWidgetByName(this.promotion_layer, "button_promotion_s_close");
        button_promotion_s_close.addTouchEventListener(this.buttonPromotionSCloseTouchEvent, this);

        var button_get_by_share = ccui.helper.seekWidgetByName(this.promotion_layer, "button_get_by_share");
        button_get_by_share.addTouchEventListener(this.buttonGetByShareTouchEvent, this);

        var button_get_by_payment = ccui.helper.seekWidgetByName(this.promotion_layer, "button_get_by_payment");
        button_get_by_payment.addTouchEventListener(this.buttonGetByPaymentTouchEvent, this);
    },
    buttonPromotionSCloseTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            this.disappear();
            break;
        }
    },
    appear: function (field) {
        this.field = field;

        this.promotion_layer.y = -720;

        // 親レイヤにモーダル用のレイヤを追加
        this.root.addChild(this.promotion_layer);

        var move = cc.moveTo(1, cc.p(0, 0)).easing(cc.easeElasticOut());
        this.promotion_layer.runAction(cc.sequence(move));

        getPurchaseItemPrice(field.payment_id);
    },
    disappear: function () {
        var move = cc.moveTo(1, cc.p(0, -720)).easing(cc.easeElasticOut());
        var that = this;
        var callback = cc.callFunc(function(){
            that.root.removeChild(that.promotion_layer);
        });
        this.promotion_layer.runAction(cc.sequence(move, callback));
    },
    buttonGetByShareTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            this.is_share_appear = !this.is_share_appear;
            if(this.is_share_appear){
                ccs.actionManager.playActionByName(res.UiPromotionS_json, "share_in");
            }else{
                ccs.actionManager.playActionByName(res.UiPromotionS_json, "share_out");
            }
            break;
        }
    },
    buttonGetByPaymentTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            purchaseItem(this.field.paymentItemId());
            break;
        }
    }
});

