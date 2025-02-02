
var CommonUtil = {
    hideChildren:function (node) {
        node.setOpacity(0);
        _.each(node.getChildren(), function(element, index, array) {
              this.hideChildren(element);
        }, this);
    },
    fadeToChildren:function (node, duration, opacity) {
        var fade_action = cc.fadeTo(duration, opacity);
        node.runAction(fade_action);
        _.each(node.getChildren(), function(element, index, array) {
              this.fadeToChildren(element, duration, opacity);
        }, this);
    },
    dispPos:function (node, color) {
        var draw = new cc.DrawNode();
        size = node.getContentSize();
        draw.drawDot(cc.p(0, 0), 5, color);
        node.addChild(draw, node.getLocalZOrder() + 1);
    },
    dispAnchorPoint:function (node, color) {
        var draw = new cc.DrawNode();
        size = node.getContentSize();
        draw.drawDot(
            cc.p(size.width * node.anchorX,
                 size.height * node.anchorY),
                 5,
                 color);
        node.addChild(draw, node.getLocalZOrder() + 1);
    },
    dispContentSize:function (node, color) {
        var layer = new cc.LayerColor(color);
        layer.setContentSize(node.getContentSize());
        layer.setOpacity(100);
        node.addChild(layer, node.getLocalZOrder() + 1);
    }
};

