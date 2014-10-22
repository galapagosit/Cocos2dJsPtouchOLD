
var FieldAuth = {
    _createTable:function () {
        SQLTool.execSql("FieldAuth.db", "CREATE TABLE field_auth (\
                             id integer primary key autoincrement,\
                             field_name VARCHAR(32) UNIQUE,\
                             status VARCHAR(32))");
    },
    _initData:function () {
        SQLTool.execSql("FieldAuth.db", "INSERT INTO field_auth(field_name, status)\
                                            VALUES('animal', 'open')");
        SQLTool.execSql("FieldAuth.db", "INSERT INTO field_auth(field_name, status)\
                                            VALUES('vehicle', 'open')");
        SQLTool.execSql("FieldAuth.db", "INSERT INTO field_auth(field_name, status)\
                                            VALUES('vegetable', 'close')");
    },
    init:function () {
        // 初期化してなければ初期化
        var ret = SQLTool.execSql("FieldAuth.db", "SELECT count(*) as cnt FROM field_auth");
        if(ret.status === 0 && ret.result[0].cnt !== "0"){
            return;
        }
        FieldAuth._createTable();
        FieldAuth._initData();
    },

    /*
     * 特定のフィールドに入れる権利が有るか
     */
    canEnterField:function (fieldName) {
        var sql = "SELECT count(*) as cnt FROM field_auth WHERE field_name == '" + fieldName + "' AND status=='open';";
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
    enableEnterField:function (fieldName) {
        var accesser = new jsb.SQLiteBridge("FieldAuth.db");
        var sql = "UPDATE field_auth SET status='open' WHERE field_name == '" + fieldName + "';";
        var ret = SQLTool.execSql("FieldAuth.db", sql);
        if(ret.status !== 0){
            cc.log("ERROR enableEnterField!!!");
            return;
        }
    }
};

