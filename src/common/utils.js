
var CommonUtil = {
    hide_children:function (node) {
        cc.log(node.getName() + " >>> setOpacity");
        node.setOpacity(0);
        _.each(node.getChildren(), function(element, index, array) {
              this.hide_children(element);
        }, this);
    },
    fade_to_children:function (node, duration, opacity) {
        cc.log(node.getName() + " >>> fade_to_children");
        var fade_action = cc.fadeTo(duration, opacity);
        node.runAction(fade_action);
        _.each(node.getChildren(), function(element, index, array) {
              this.fade_to_children(element, duration, opacity);
        }, this);
    }
};

