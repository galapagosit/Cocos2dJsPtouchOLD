#include "FieldAuth.h"
#include "cocos2d.h"

using namespace cocos2d;

FieldAuth::FieldAuth()
{
}

FieldAuth::~FieldAuth()
{
    sqlite3_close(useDataBase);
}

void FieldAuth::initDatabase()
{
    CCLOG("FieldAuth::initDatabase start");
    
    //DBファイルの保存先のパス
    auto filePath = FileUtils::getInstance()->getWritablePath();
    filePath.append("Test.db");
    
    //OPEN
    auto status = sqlite3_open(filePath.c_str(), &useDataBase);
    
    //ステータスが0以外の場合はエラーを表示
    if (status != SQLITE_OK){
        CCLOG("open failed : %s", errorMessage);
    }else{
        CCLOG("open sucessed");
    }

    this->createTable();
    this->initData();
    
    CCLOG("FieldAuth::initDatabase end");
}

void FieldAuth::exec_sql(char *sql)
{
    auto status = sqlite3_exec(useDataBase, sql, NULL, NULL, &errorMessage );
    if( status != SQLITE_OK ) CCLOG("exec_sql failed : %s", errorMessage);
}

void FieldAuth::createTable()
{
    this->exec_sql((char *)"CREATE TABLE field_auth(id integer primary key autoincrement,\
                                                        field_name VARCHAR(32),\
                                                        status VARCHAR(32))");
}

void FieldAuth::initData()
{
    this->exec_sql((char *)"INSERT INTO field_auth(field_name, status)\
                                            VALUES('animal', 'open')");
    this->exec_sql((char *)"INSERT INTO field_auth(field_name, status)\
                                            VALUES('vehicle', 'open')");
    this->exec_sql((char *)"INSERT INTO field_auth(field_name, status)\
                                            VALUES('vegetable', 'close')");
}