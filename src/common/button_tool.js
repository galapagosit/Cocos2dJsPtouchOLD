
var ButtonTool = {
    attachEventLikeJelly:function (button, callback, target) {
        button.addTouchEventListener(
            function (sender, type) {
                switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_BEGAN");

                    // プルプル震わせる
                    var action1_first = cc.scaleTo(0.1, 0.9, 1.1);
                    var action2_first = cc.scaleTo(0.1, 1.1, 0.9);
                    var action1 = cc.scaleTo(0.1, 0.95, 1.05);
                    var action2 = cc.scaleTo(0.1, 1.05, 0.95);
                    sender.runAction(
                        cc.sequence(
                            action1_first, action2_first,
                            action1, action2
                        )
                    );
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_ENDED");
                    callback(sender, type);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    cc.log(sender.getName() + " >>> ccui.Widget.TOUCH_CANCELED");
                    var action1 = cc.scaleTo(0.05, 1, 1);
                    sender.runAction(action1);
                    break;
                }
            }, this
        );
    }
};

