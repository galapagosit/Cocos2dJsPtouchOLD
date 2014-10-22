
var SQLTool = {
    execSql:function (dbName, sql) {
        var accesser = new jsb.SQLiteBridge(dbName);
        var ret = accesser.execSql(sql);
        return JSON.parse(ret);
    }
};
