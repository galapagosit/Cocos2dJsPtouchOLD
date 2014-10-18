#include "SQLiteBridge.h"

#include "cocos2d.h"
#include "sqlite3.h"
#include "picojson.h"

using namespace cocos2d;
using namespace std;


SQLiteBridge::SQLiteBridge()
{
}

SQLiteBridge::~SQLiteBridge()
{
    sqlite3_close(useDataBase);
}

SQLiteBridge *SQLiteBridge::getAccesser(const char *dbFileName)
{
    CCLOG("SQLiteBridge::getAccesser start : %s", dbFileName);
    
    SQLiteBridge *accesser = new SQLiteBridge();
    char *errorMessage;
    
    //DBファイルの保存先のパス
    auto filePath = FileUtils::getInstance()->getWritablePath();
    filePath.append(dbFileName);
    
    auto status = sqlite3_open(filePath.c_str(), &accesser->useDataBase);
    if (status != SQLITE_OK){
        CCLOG("open failed : %s", errorMessage);
        return NULL;
    }else{
        CCLOG("open sucessed");
    }
    
    CCLOG("SQLiteBridge::getAccesser end : %s", dbFileName);
    return accesser;
}

static int execSqlCallback(void *data, int argc, char **argv, char **azColName){
    picojson::array *resultArray = (picojson::array *)data;
    picojson::object obj;
    int i;
    for(i=0; i<argc; i++){
        obj.insert(std::make_pair(azColName[i], picojson::value(argv[i])));
    }
    resultArray->push_back(picojson::value(obj));
    return 0;
}

const char *SQLiteBridge::execSql(const char *sql)
{
    CCLOG("SQLiteBridge::execSql start : %s", sql);
    char *errorMessage;
    
    picojson::object result;
    picojson::array resultArray;
    
    auto status = sqlite3_exec(useDataBase, sql, execSqlCallback, &resultArray, &errorMessage);
    if( status != SQLITE_OK ){
        CCLOG("execSql failed : %s", errorMessage);
        return NULL;
    }
    result.insert(std::make_pair("result", picojson::value(resultArray)));
    
    picojson::value json = picojson::value(result);
    const char *json_str = json.serialize().c_str();
    CCLOG("SQLiteBridge::execSql end : %s : %s", sql, json_str);
    return json_str;
}
