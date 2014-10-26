
var InfoModalController = cc.Class.extend({
    root: null,
    modal_layer: null,

    init:function (root) {
        this.root = root;
        this.modal_layer = ccs.uiReader.widgetFromJsonFile(res.UiInfoModal_json);
        // これしないとInvalid Native Object
        this.modal_layer.retain();

        // 隠しておく
        CommonUtil.hideChildren(this.modal_layer);

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
        CommonUtil.fadeToChildren(this.modal_layer, 0.5, 255);

        // テキスト配置
        var font_conf;
        if(cc.sys.OS_ANDROID === cc.sys.os){
            font_conf = "res/fonts/Abduction.ttf";
        } else {
            font_conf = "Abduction";
        }

        var label = cc.LabelTTF.create(
                                    "aaa bbbbb kkkkk iiiii ooooo pppppjjjjjjjj\nnew line\nほげほげ!!\nnew line\nnew line\nnew line\nnew line\nnew line\nnew line\nnew line\nnew line\nnew line\nnew line\nnew line",
                                    font_conf,
                                    30);

        // 折り返しのために幅だけ固定
        label.setDimensions(cc.size(600, 0));
        label.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        label.color = cc.color(0, 0, 0);
        label.setAnchorPoint(0, 0);
        var labelSize = label.getContentSize();

        // Create the scrollview
        var scrollView = new ccui.ScrollView();
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(false);
        scrollView.setBackGroundColor(cc.color.GREEN);
        scrollView.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setContentSize(cc.size(600, 320));
        scrollView.setInnerContainerSize(labelSize);
        scrollView.setPosition(340, 225);
        var scrollViewSize = scrollView.getContentSize();

        // 子要素として追加
        scrollView.addChild(label);
        this.modal_layer.addChild(scrollView, 130);

        scrollView.addEventListener(this.scrollviewEvent, this);

        //CommonUtil.dispAnchorPoint(scrollView, cc.color.RED);
        //CommonUtil.dispAnchorPoint(label, cc.color.BLUE);
        //CommonUtil.dispContentSize(label, cc.color.BLUE);
    },
    disappear: function () {
        // 隠しておく
        CommonUtil.hideChildren(this.modal_layer);
        this.root.removeChild(this.modal_layer, true);
    },
    scrollviewEvent: function (sender, type) {
        switch (type) {
            case ccui.ScrollView.EVENT_SCROLLING:
                // はみ出す長さ
                var h = sender.getInnerContainer().height - sender.getContentSize().height;
                cc.log("scrolling(%)!!!" + (-sender.getInnerContainer().y / h * 100));

                break;
            default:
                break;
        }
    }
});

