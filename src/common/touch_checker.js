
var create_test_listener = function(swallowTouches, onTouchBegan){
    var swallowTouches = swallowTouches;
    var onTouchBegan = onTouchBegan;
    var listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: swallowTouches,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            cc.log(target.getName() + " >>> onTouchBegan");
            return onTouchBegan;
        },
        onTouchMoved: function (touch, event) {
            var target = event.getCurrentTarget();
            cc.log(target.getName() + " >>> onTouchMoved");
        },
        onTouchEnded: function (touch, event) {
            var target = event.getCurrentTarget();
            cc.log(target.getName() + " >>> onTouchEnded");
        }
    });
    return listener;
};

