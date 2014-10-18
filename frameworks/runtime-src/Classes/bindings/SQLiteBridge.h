#ifndef __BRIDGE_H__
#define __BRIDGE_H__

#include "sqlite3.h"
#include <iostream>

class SQLiteBridge
{
private:
    sqlite3 *useDataBase = NULL;
    
public:
    SQLiteBridge();
    ~SQLiteBridge();
    
    static SQLiteBridge *getAccesser(const char *dbFileName);
    const char *execSql(const char *sql);
};
#endif
