
var IndexLayer = cc.Layer.extend({
    root: null,
    info_modal_controller: null,
    menu_adults_confirm_modal_controller: null,
    ctor:function () {
        this._super();

        // UIの初期化
        this.root = ccs.uiReader.widgetFromJsonFile(res.UiIndex_json);
        this.addChild(this.root);


        cc.log("##################");
        var accesser = jsb.SQLiteBridge.getAccesser("hogehoge.db");
        var ret = accesser.execSql("CREATE TABLE field_auth(id integer primary key autoincrement, field_name VARCHAR(32) UNIQUE, status VARCHAR(32))");
        cc.log(ret);
        //cc.log(JSON.parse(ret));
        var ret = accesser.execSql("INSERT INTO field_auth(field_name, status) VALUES('animal', 'open')");
        cc.log(ret);
        //cc.log(JSON.parse(ret));
        var ret = accesser.execSql("INSERT INTO field_auth(field_name, status) VALUES('vagetable', 'open')");
        cc.log(ret);
        var ret = accesser.execSql("SELECT count(*) as cnt FROM field_auth");
        cc.log(ret);
        cc.log(JSON.parse(ret));
        cc.log("GGGGGGGGGGGGGGGGGG");

        // ボタン制御
        var button_start = ccui.helper.seekWidgetByName(this.root, "button_start");
        button_start.addTouchEventListener(this.buttonStartTouchEvent, this);

        var button_invite = ccui.helper.seekWidgetByName(this.root, "button_invite");
        button_invite.addTouchEventListener(this.buttonInviteTouchEvent, this);

        var button_invite_close = ccui.helper.seekWidgetByName(this.root, "button_invite_close");
        button_invite_close.addTouchEventListener(this.buttonInviteCloseTouchEvent, this);

        var button_invite_line = ccui.helper.seekWidgetByName(this.root, "button_invite_line");
        button_invite_line.addTouchEventListener(this.buttonInviteLineTouchEvent, this);

        var button_invite_mail = ccui.helper.seekWidgetByName(this.root, "button_invite_mail");
        button_invite_mail.addTouchEventListener(this.buttonInviteMailTouchEvent, this);

        var button_invite_facebook = ccui.helper.seekWidgetByName(this.root, "button_invite_facebook");
        button_invite_facebook.addTouchEventListener(this.buttonInviteFacebookTouchEvent, this);

        var button_invite_twitter = ccui.helper.seekWidgetByName(this.root, "button_invite_twitter");
        button_invite_twitter.addTouchEventListener(this.buttonInviteTwitterTouchEvent, this);

        var button_menu = ccui.helper.seekWidgetByName(this.root, "button_menu");
        button_menu.addTouchEventListener(this.buttonMenuTouchEvent, this);
        
        // 新着情報等
        this.info_modal_controller = new InfoModalController();
        this.info_modal_controller.init(this.root);
        //this.info_modal_controller.appear("こんにちは");

        // 友達に教える
        this.invite_adults_confirm_modal_controller = new AdultsConfirmModalController();
        this.invite_adults_confirm_modal_controller.init(this.root, this.inviteIn);

        // おやこ確認用モーダルレイヤ
        this.menu_adults_confirm_modal_controller = new AdultsConfirmModalController();
        this.menu_adults_confirm_modal_controller.init(this.root, this.goMenuScene);

        return true;
    },
    buttonStartTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            cc.director.runScene(new cc.TransitionFade(0.5, new StageScene()));
            break;
        }
    },
    buttonInviteTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            this.invite_adults_confirm_modal_controller.appear();
            break;
        }
    },
    buttonInviteCloseTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            ccs.actionManager.playActionByName(res.UiIndex_json, "invite_out");
            break;
        }
    },
    buttonInviteLineTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");

            // line投稿処理
            share_line();
            break;
        }
    },
    buttonInviteMailTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");

            // mail投稿処理
            share_mail();
            break;
        }
    },
    buttonInviteFacebookTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");

            // facebook投稿処理
            share_facebook();
            break;
        }
    },
    buttonInviteTwitterTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");

            // twitter投稿処理
            share_twitter();
            break;
        }
    },
    buttonMenuTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            this.menu_adults_confirm_modal_controller.appear();
            break;
        }
    },
    inviteIn: function () {
        ccs.actionManager.playActionByName(res.UiIndex_json, "invite_in");
    },
    goMenuScene: function () {
        cc.director.runScene(new cc.TransitionFade(0.5, new MenuScene()));
    }
});

var IndexScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new IndexLayer();
        this.addChild(layer);
    }
});

