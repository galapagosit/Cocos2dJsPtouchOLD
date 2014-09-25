
var JSON_CONFIGS = [
    "res/config/default.json",
    "res/config/hashimoto.json",
    "res/config/stage.json"
];

var create_target = function (json_config) {
    // Targetとなるレイヤを作成
    var target = new cc.LayerColor(cc.color(0, 0, 100, 255));
    target.width = 200;
    target.height = 50;

    label = cc.LabelTTF.create(json_config, "Helvetica", 20);
    label.x = target.width / 2;
    label.y = target.height / 2;
    target.addChild(label, 15);

    target.json_config = json_config;
    return target;
};

var SelectTestLayer = cc.Layer.extend({
    targets: [],
    ctor:function () {
        this._super();

        var y = 50;
        for (i in JSON_CONFIGS){
            var target = create_target(JSON_CONFIGS[i]);
            target.x = 200;
            target.y = y;
            this.addChild(target, 10);
            y += 70;

            this.targets.push(target);
        }

        var that = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log(target.getName() + " >>> onTouchBegan");
                return true;
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log(target.getName() + " >>> onTouchEnded");

                for (j in that.targets){
                    var target = that.targets[j];
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    cc.log("locationInNode.x >>> " + locationInNode.x);
                    cc.log("locationInNode.y >>> " + locationInNode.y);

                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        cc.log(target.getName() + " >>> onTouchEnded");
                        cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                        return true;
                    }
                }
                return false;
            }
        });
        cc.eventManager.addEventListenerWithSceneGraphPriority(listener, this);

        cc.log(" >>> add!!");

        return true;
    }
});

var SelectTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SelectTestLayer();
        this.addChild(layer);
    }
});

