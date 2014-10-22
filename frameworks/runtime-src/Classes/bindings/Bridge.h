#ifndef __BRIDGE_H__
#define __BRIDGE_H__

#include <iostream>
#include "ScriptingCore.h"

class Bridge
{
public:
    // cocostudio アニメーション関連
    static void actionManagerExPlayActionByNameWithCallback(const char *json, const char *animation_name, jsval callbackTarget, const std::string callbackSelector);
    //static void actionManagerExPlayActionByNameWithCallback(const char *json, const char *animation_name, long callbackTarget, const std::string callbackSelector);
};
#endif
