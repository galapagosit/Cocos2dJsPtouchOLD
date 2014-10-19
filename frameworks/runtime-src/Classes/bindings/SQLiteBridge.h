#ifndef __BRIDGE_H__
#define __BRIDGE_H__

#include "sqlite3.h"
#include <iostream>

class SQLiteBridge
{
private:
    sqlite3 *useDataBase = NULL;
public:
    SQLiteBridge(std::string dbFileName);
    ~SQLiteBridge();
    
    std::string execSql(std::string sql);
};
#endif
