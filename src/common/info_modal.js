
var InfoModalController = cc.Class.extend({
    root: null,
    modal_layer: null,

    randomNumberStr: null,
    randomNumberStrConfirm: "",

    num_sprites: [],

    init:function (root) {
        this.root = root;
        this.modal_layer = ccs.uiReader.widgetFromJsonFile(res.UiInfoModal_json);
        // これしないとInvalid Native Object
        this.modal_layer.retain();

        // 隠しておく
        CommonUtil.hide_children(this.modal_layer);

        // ボタン制御
        var button_modal_close = ccui.helper.seekWidgetByName(this.modal_layer, "button_modal_close");
        button_modal_close.addTouchEventListener(this.buttonModalCloseTouchEvent, this);

        var button_modal_close_big = ccui.helper.seekWidgetByName(this.modal_layer, "button_modal_close_big");
        button_modal_close_big.addTouchEventListener(this.buttonModalCloseTouchEvent, this);
    },
    buttonModalCloseTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            this.disappear();
            break;
        }
    },
    appear: function (message) {
        // 親レイヤにモーダル用のレイヤを追加
        this.root.addChild(this.modal_layer);
        // フェードイン
        CommonUtil.fade_to_children(this.modal_layer, 0.5, 255);


        // テキスト配置
        var label;
        if(cc.sys.OS_ANDROID === cc.sys.os){
            label = cc.LabelTTF.create("Alignment 0\nnew line\n!!", "res/fonts/Abduction.ttf", 24);
        } else {
            label = cc.LabelTTF.create("Alignment 0\nnew line\n!!", "Abduction", 24);
        }
        cc.log(label);
        this.modal_layer.addChild(label, 127, "label");
        label.color = cc.color(0, 0, 0);
        label.x = 640;
        label.y = 500;
        label.opacity = 255;
    },
    disappear: function () {
        // 隠しておく
        CommonUtil.hide_children(this.modal_layer);
        this.root.removeChild(this.modal_layer, true);
    }
});

