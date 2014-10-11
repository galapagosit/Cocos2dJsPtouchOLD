
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
        var font_conf;
        if(cc.sys.OS_ANDROID === cc.sys.os){
            font_conf = "res/fonts/Abduction.ttf";
        } else {
            font_conf = "Abduction";
        }

        var label = cc.LabelTTF.create(
                                    "aaa bbbbb kkkkk iiiii ooooo pppppjjjjjjjj\nnew line\nほげほげ!!\nnew line\nnew line\nnew line\nnew line\nnew line\nnew line\nnew line\nnew line\nnew line\nnew line",
                                    font_conf,
                                    30,
                                    cc.size(600, 320),
                                    cc.TEXT_ALIGNMENT_LEFT);

        label.color = cc.color(0, 0, 0);
        label.x = 640;
        label.y = 370;
        label.opacity = 255;
        this.modal_layer.addChild(label, 127, "label");
    },
    disappear: function () {
        // 隠しておく
        CommonUtil.hide_children(this.modal_layer);
        this.root.removeChild(this.modal_layer, true);
    }
});

