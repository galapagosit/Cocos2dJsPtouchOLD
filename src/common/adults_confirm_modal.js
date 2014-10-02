
var AdultsConfirmModalController = cc.Class.extend({
    root: null,
    callback: null,
    modal_layer: null,

    randomNumberStr: null,
    randomNumberStrConfirm: "",

    init:function (root, callback) {
        this.root = root;
        this.callback = callback;
        this.modal_layer = ccs.uiReader.widgetFromJsonFile(res.UiAdultsConfirmModal_json);
        // これしないとInvalid Native Object
        this.modal_layer.retain();

        // ボタン制御
        var button_modal_close = ccui.helper.seekWidgetByName(this.modal_layer, "button_modal_close");
        button_modal_close.addTouchEventListener(this.buttonModalCloseTouchEvent, this);

        var button_0 = ccui.helper.seekWidgetByName(this.modal_layer, "button_0");
        button_0.addTouchEventListener(this.buttonXTouchEvent, this);
        var button_1 = ccui.helper.seekWidgetByName(this.modal_layer, "button_1");
        button_1.addTouchEventListener(this.buttonXTouchEvent, this);
        var button_2 = ccui.helper.seekWidgetByName(this.modal_layer, "button_2");
        button_2.addTouchEventListener(this.buttonXTouchEvent, this);
        var button_3 = ccui.helper.seekWidgetByName(this.modal_layer, "button_3");
        button_3.addTouchEventListener(this.buttonXTouchEvent, this);
        var button_4 = ccui.helper.seekWidgetByName(this.modal_layer, "button_4");
        button_4.addTouchEventListener(this.buttonXTouchEvent, this);
        var button_5 = ccui.helper.seekWidgetByName(this.modal_layer, "button_5");
        button_5.addTouchEventListener(this.buttonXTouchEvent, this);
        var button_6 = ccui.helper.seekWidgetByName(this.modal_layer, "button_6");
        button_6.addTouchEventListener(this.buttonXTouchEvent, this);
        var button_7 = ccui.helper.seekWidgetByName(this.modal_layer, "button_7");
        button_7.addTouchEventListener(this.buttonXTouchEvent, this);
        var button_8 = ccui.helper.seekWidgetByName(this.modal_layer, "button_8");
        button_8.addTouchEventListener(this.buttonXTouchEvent, this);
        var button_9 = ccui.helper.seekWidgetByName(this.modal_layer, "button_9");
        button_9.addTouchEventListener(this.buttonXTouchEvent, this);
    },
    inputRandom: function () {
        randomNumber = Math.floor(Math.random()*10000);
        this.randomNumberStr = ("0000" + randomNumber.toString()).slice(-4);
        cc.log(this.randomNumberStr);

        var label_modal_number = ccui.helper.seekWidgetByName(this.modal_layer, "label_modal_number");
        label_modal_number.setString(this.randomNumberStr);
    },
    buttonModalCloseTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            this.disappear();
            break;
        }
    },
    buttonXTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            var bNumber = sender.getName().slice(-1);

            this.randomNumberStrConfirm += bNumber;
            var label_modal_number_confirm = ccui.helper.seekWidgetByName(this.modal_layer, "label_modal_number_confirm");
            label_modal_number_confirm.setString((this.randomNumberStrConfirm + "----").slice(0, 4));

            if(this.randomNumberStrConfirm.length >= 4){
                this.checkNumber();
            }
            break;
        }
    },
    checkNumber: function () {
        if(this.randomNumberStr === this.randomNumberStrConfirm){
            cc.log("correct!!");
            this.callback();
        }else{
            cc.log("not correct!!");

            // 左右に震えさせる処理
            var actionBy = cc.moveBy(0.1, cc.p(20, 0));
            var actionByBack = actionBy.reverse();
            var seq = cc.sequence(actionBy, actionByBack, actionByBack, actionBy);
            this.modal_layer.runAction(seq);
            this.resetNumber();
        }
    },
    resetNumber: function () {
        this.randomNumberStrConfirm = "";
        var label_modal_number_confirm = ccui.helper.seekWidgetByName(this.modal_layer, "label_modal_number_confirm");
        label_modal_number_confirm.setString("----");
    },
    appear: function () {
        // 親レイヤにモーダル用のレイヤを追加
        this.root.addChild(this.modal_layer);

        // ランダム数値入力
        this.inputRandom();

        // 数値の初期化
        this.resetNumber();

        // フェードイン
        ccs.actionManager.playActionByName(res.UiAdultsConfirmModal_json, "fade_in");
    },
    disappear: function () {
        this.root.removeChild(this.modal_layer, true);
    }
});

