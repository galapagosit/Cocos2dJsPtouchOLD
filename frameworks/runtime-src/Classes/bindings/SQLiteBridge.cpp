#include "SQLiteBridge.h"

#include "cocos2d.h"
#include "sqlite3.h"
#include "picojson.h"

using namespace cocos2d;
using namespace std;


SQLiteBridge::SQLiteBridge(std::string dbFileName)
{
    char *errorMessage;
    
    //DBファイルの保存先のパス
    auto filePath = FileUtils::getInstance()->getWritablePath();
    filePath.append(dbFileName);
    
    auto status = sqlite3_open(filePath.c_str(), &this->useDataBase);
    if (status != SQLITE_OK){
        CCLOG("open failed : %s", errorMessage);
        return;
    }
}

SQLiteBridge::~SQLiteBridge()
{
    CCLOG("SQLiteBridge::~SQLiteBridge");
    sqlite3_close(useDataBase);
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

std::string SQLiteBridge::execSql(std::string sql)
{
    CCLOG("SQLiteBridge::execSql start : %s", sql.c_str());
    char *errorMessage;
    
    picojson::object result;
    picojson::array resultArray;
    
    auto status = sqlite3_exec(useDataBase, sql.c_str(), execSqlCallback, &resultArray, &errorMessage);
    result.insert(std::make_pair("status", picojson::value(double(status))));
    if( status != SQLITE_OK ){
        CCLOG("execSql failed : %s", errorMessage);
        result.insert(std::make_pair("errorMessage", picojson::value(errorMessage)));
    }else{
        result.insert(std::make_pair("result", picojson::value(resultArray)));
    }
    picojson::value json = picojson::value(result);
    return json.serialize();
}
