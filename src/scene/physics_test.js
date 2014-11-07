
var PhysicsTestLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        
        // 物理空間の作成
        this.initSpace();

        // デバッグモード設定
        this.setupDebugNode();

        // shapeの設置
        // shapeは動かない物体
        this.initShapes();

        // bodyの設置
        // bodyは動く物体
        this.initBodies();

        // フレーム毎の処理
        this.scheduleUpdate();

        return true;
    },
    setupDebugNode : function()
    {
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible = true;
        this.addChild(this._debugNode);
    },
    update : function(dt) {
        // 物理空間を更新
        this.space.step(dt);
    },
    initSpace : function() {
        this.space = new cp.Space();
        var space = this.space;

        // 衝突判定の精度
        // 多いほど正確に演算されるが、cpu負荷がかかる(デフォルト値は10)
        space.iterations = 10;

        // 重力
        space.gravity = cp.v(0, 0);

        // 物体がsleep状態になるためのアイドル時間
        space.sleepTimeThreshold = 0.5;

        // 物体の重なり許容量
        // 多くすると物体同士が衝突した際にめり込む
        space.collisionSlop = 0.1;
    },
    initShapes : function() {
        var space = this.space;

        // 地面を作成
        var floor = space.addShape(new cp.SegmentShape(space.staticBody, cp.v(0, 0), cp.v(1280, 0), 0));
        // 反発
        floor.setElasticity(1);
        // 摩擦
        floor.setFriction(1);
    },
    addPlayer : function() {
        var space = this.space;

        var mass = 100;
        var width = 80;
        var height = 30;
        var body = space.addBody(new cp.Body(mass, cp.momentForBox(mass, width, height)));
        body.setPos(cp.v(500, 100));
            body.setForce(cp.v(0, 100));

        var shape = space.addShape(new cp.BoxShape(body, width, height));
        shape.setElasticity(1);
        shape.setFriction(1);
    },
    initBodies : function() {
        var space = this.space;

        // playerを作成
        this.addPlayer();

        for (var i = 1; i <= 10; i++) {
            var radius = 20;
            mass = 3;
            var body = space.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, radius, cp.v(0, 0))));
            body.setPos(cp.v(200 + i, (2 * radius + 5) * i));
            body.setForce(cp.v(0, 100));
            var circle = space.addShape(new cp.CircleShape(body, radius, cp.v(0, 0)));
            circle.setElasticity(0.8);
            circle.setFriction(1);
        }
    }
});

var PhysicsTestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PhysicsTestLayer();
        this.addChild(layer);
    }
});

