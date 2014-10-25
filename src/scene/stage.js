
var StageLayer = cc.Layer.extend({
    root: null,
    contain_layer: null,
    page: 1,
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
        this.setFieldObject();

        var button_scroll_left = ccui.helper.seekWidgetByName(this.root, "button_scroll_left");
        button_scroll_left.addTouchEventListener(this.buttonScrollLeftTouchEvent, this);

        var button_scroll_right = ccui.helper.seekWidgetByName(this.root, "button_scroll_right");
        button_scroll_right.addTouchEventListener(this.buttonScrollRightTouchEvent, this);

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
    setFieldObject: function () {
        // 入れ物を作成
        this.contain_layer = new cc.LayerColor(cc.color(0, 0, 100, 100));
        this.contain_layer.setContentSize(cc.size(1280, 400));
        var panel_root = ccui.helper.seekWidgetByName(this.root, "panel_root");
        panel_root.addChild(this.contain_layer, 120);

        var all_fields = FieldAuthAPI.allFields();
        _.each(all_fields, function(field, index) {
            var sprite = new cc.Sprite(field.imageFile());
            sprite.field = field;
            sprite.x = 300 + index * 350;
            sprite.y = 200;

            // 未開放のものは開放方法をアイコンで出す
            if(!field.canEnterField()){
                if(field.can_open_by_payment){
                    var icon = new cc.Sprite("res/image/field_icon/payment.png");
                    icon.x = 50
                    icon.y = 280;
                    sprite.addChild(icon);
                }
                if(field.can_open_by_share){
                    var icon = new cc.Sprite("res/image/field_icon/share.png");
                    icon.x = 160
                    icon.y = 280;
                    sprite.addChild(icon);
                }
            }
 
            // タッチイベント登録
            var listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: false,
                onTouchBegan: function (touch, event) {
                    return true;
                },
                onTouchEnded: function (touch, event) {
                    var target = event.getCurrentTarget();

                    // タッチした範囲の判定
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                        cc.log(target.getName() + " >>> tapped");

                        // 入れるフィールドなら
                        if(target.field.canEnterField()){
                            cc.LoaderScene.preload(g_resources, function () {
                                cc.director.runScene(new FieldScene(target.field.field_name));
                            }, this);
                        }else{

                        }

                        return true;
                    }
                    return false;
                }
            });
            cc.eventManager.addEventListenerWithSceneGraphPriority(listener, sprite);

            this.contain_layer.addChild(sprite, 122);
            CommonUtil.dispContentSize(sprite, cc.color.BLUE);
            CommonUtil.dispAnchorPoint(sprite, cc.color.RED);
        }, this);
    },
    buttonScrollLeftTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            this.page -= 1;
            this.moveToPage();
            break;
        }
    },
    buttonScrollRightTouchEvent: function (sender, type) {
        switch (type) {
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
            this.page += 1;
            this.moveToPage();
            break;
        }
    },
    scrollNum:function () {
        return 3;
    },
    moveToPage: function () {
        this.checkPageButton();
        var move = cc.moveTo(0.7, cc.p((1 - this.page) * 350, 0)).easing(cc.easeElasticOut());
        this.contain_layer.runAction(move);
    },
    checkPageButton: function () {
        var button_scroll_left = ccui.helper.seekWidgetByName(this.root, "button_scroll_left");
        if(this.page <= 1){
            button_scroll_left.setEnabled(false);
        }else{
            button_scroll_left.setEnabled(true);
        }

        var button_scroll_right = ccui.helper.seekWidgetByName(this.root, "button_scroll_right");
        if(this.page >= this.scrollNum()){
            button_scroll_right.setEnabled(false);
        }else{
            button_scroll_right.setEnabled(true);
        }
    }
    //buttonStageAnimalTouchEvent: function (sender, type) {
    //    switch (type) {
    //    case ccui.Widget.TOUCH_ENDED:
    //        cc.log(sender.getName() + " >>> Touch Up");
    //        break;
    //    default:
    //        break;
    //    }
    //}
});

var StageScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StageLayer();
        this.addChild(layer);
    }
});

