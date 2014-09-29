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
    filePath.append("PtouchDB.db");
    
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
                                                        field_name VARCHAR(32) UNIQUE,\
                                                        status VARCHAR(32))");
}

// 初期データの投入
// 2回目移行はDUPLICATEで更新されないはず
void FieldAuth::initData()
{
    this->exec_sql((char *)"INSERT INTO field_auth(field_name, status)\
                                            VALUES('animal', 'open')");
    this->exec_sql((char *)"INSERT INTO field_auth(field_name, status)\
                                            VALUES('vehicle', 'open')");
    this->exec_sql((char *)"INSERT INTO field_auth(field_name, status)\
                                            VALUES('vegetable', 'close')");
}

static int canEnterFieldCallback(void *data, int argc, char **argv, char **azColName){
//    int i;
//    for(i=0; i<argc; i++){
//        printf("%s = %s\n", azColName[i], argv[i] ? argv[i] : "NULL");
//    }
    // ココに来たってことはレコードがあるってことなので
    bool *exist_record = (bool *)data;
    *exist_record = true;
    return 0;
}

/*
 * 特定のフィールドに入れる権利が有るか
 */
bool FieldAuth::canEnterField(const char * field_name)
{
    char *sql = sqlite3_mprintf( "SELECT * FROM field_auth WHERE field_name == '%q' AND status=='open';", field_name );
    CCLOG( "%s\n", sql );
    
    bool exist_record = false;
    auto status = sqlite3_exec(useDataBase, sql, canEnterFieldCallback, &exist_record, &errorMessage);
    if( status != SQLITE_OK ) CCLOG("exec_sql failed : %s", errorMessage);
    
    sqlite3_free( sql );
    return exist_record;
}

/*
 * 特定のフィールドに入れる権利を付与
 */
void FieldAuth::enableEnterField(const char * field_name)
{
    char *sql = sqlite3_mprintf( "UPDATE field_auth SET status='open' WHERE field_name == '%q';", field_name );
    CCLOG( "%s\n", sql );
    
    this->exec_sql(sql);
    
    sqlite3_free( sql );

}