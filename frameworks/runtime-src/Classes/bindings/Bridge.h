#ifndef __BRIDGE_H__
#define __BRIDGE_H__

#include <iostream>
#include "ScriptingCore.h"

class Bridge
{
public:
    // cocostudio アニメーション関連
    static void actionManagerExPlayActionByName(const char *json, const char *animation_name);
    static void actionManagerExPlayActionByNameWithCallback(const char *json, const char *animation_name, jsval callbackTarget, const std::string callbackSelector);
    
    // FieldAuth周り
    static bool fieldAuthCanEnterField(const char *field_name);
    static void fieldAuthEnableEnterField(const char *field_name);
};
#endif
