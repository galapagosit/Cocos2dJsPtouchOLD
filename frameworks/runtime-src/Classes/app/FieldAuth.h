#ifndef  _FIELD_AUTH_H_
#define  _FIELD_AUTH_H_

#include "Singleton.h"
#include "sqlite3.h"
#include <iostream>


/**
 フィールドに入れるか否かを管理するためのクラス
 */
class FieldAuth: public Singleton<FieldAuth>
{
private:
    sqlite3 *useDataBase = NULL;
    char *errorMessage = NULL;
    
    FieldAuth();
    
    friend class Singleton<FieldAuth>;
    static FieldAuth *createInstance()
    {
        FieldAuth *fieldAuth = new FieldAuth();
        fieldAuth->initDatabase();
        return fieldAuth;
    }
    
public:
    virtual ~FieldAuth();
    
    // データベースの初期化
    void initDatabase();
    void exec_sql(char *sql);
    void createTable();
    void initData();
    
    bool canEnterField(const char *field_name);
    void enableEnterField(const char *field_name);
};

#endif // _FIELD_AUTH_H_

