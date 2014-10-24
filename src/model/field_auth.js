
var FIELD_INIT_DATA = [
    {
        field_name: 'animal',
        default_status: 'open',
        can_open_by_payment: false,
        can_open_by_share: false
    },
    {
        field_name: 'color',
        default_status: 'close',
        can_open_by_payment: false,
        can_open_by_share: true
    },
    {
        field_name: 'vegetable',
        default_status: 'close',
        can_open_by_payment: true,
        can_open_by_share: true
    },
    {
        field_name: 'vehicle',
        default_status: 'close',
        can_open_by_payment: true,
        can_open_by_share: false
    },
    {
        field_name: 'hoge',
        default_status: 'close',
        can_open_by_payment: true,
        can_open_by_share: false
    }
];

var FieldAuth = {
    _createTable:function () {
        var sql = "CREATE TABLE field_auth (" +
                    "field_name VARCHAR(32) UNIQUE," +
                    "status VARCHAR(32))";
        SQLTool.execSql("FieldAuth.db", sql);
    },
    _initData:function () {
        _.each(FIELD_INIT_DATA, function(element, index, array) {
            var sql = "INSERT INTO field_auth(" +
                            "field_name," +
                            "status)" +
                        "VALUES(" +
                            "'" + element.field_name + "'," +
                            "'" + element.default_status + "')";
            SQLTool.execSql("FieldAuth.db", sql);
        }, this);
    },
    init:function () {
        // 初期化してなければ初期化
        var sql = "SELECT count(*) as cnt FROM field_auth";
        var ret = SQLTool.execSql("FieldAuth.db", sql);
        if(ret.status === 0 && ret.result[0].cnt !== "0"){
            return;
        }
        FieldAuth._createTable();
        FieldAuth._initData();
    }
};

function Field() {
    /*
     * 特定のフィールドに入れる権利が有るか
     */
    this.canEnterField = function() {
        return FieldAuthAPI.canEnterField(this.field_name);
    };
};

var FieldAuthAPI = {
    /*
     * DB初期化
     */
    initDB:function () {
        FieldAuth.init();
    },

    canEnterField:function (field_name) {
        var sql = "SELECT count(*) as cnt FROM field_auth " +
                    "WHERE " +
                        "field_name == '" + field_name + "' AND " +
                        "status == 'open'";
        var ret = SQLTool.execSql("FieldAuth.db", sql);
        if(ret.status !== 0){
            cc.log("ERROR canEnterField!!!");
            return;
        }
        return Boolean(Number(ret.result[0].cnt));
    },

    /*
     * 特定のフィールドに入れる権利を付与
     */
    enableEnterField:function (field_name) {
        var accesser = new jsb.SQLiteBridge("FieldAuth.db");
        var sql = "UPDATE field_auth " + 
                        "SET status='open' " +
                    "WHERE " +
                        "field_name == '" + field_name + "'";
        var ret = SQLTool.execSql("FieldAuth.db", sql);
        if(ret.status !== 0){
            cc.log("ERROR enableEnterField!!!");
            return;
        }
    },

    /*
     * フィールド情報一覧
     */
    allFields:function () {
        return _.map(FIELD_INIT_DATA, function(element) {
            field = new Field();
            return _.extend(field, element);
        });
    }
};
