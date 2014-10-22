#include "Bridge.h"
#include "cocos2d.h"
#include "cocostudio/CCActionManagerEx.h"
#include "ScriptingCore.h"


void Bridge::actionManagerExPlayActionByNameWithCallback(const char *json, const char *animation_name, jsval callbackTarget, const std::string callbackSelector)
{
    CCLOG("Bridge::actionManagerExPlayActionByNameWithCallback start");
    CCLOG("json:%s", json);
    CCLOG("animation_name:%s", animation_name);

    auto callback = cocos2d::CallFunc::create([callbackTarget, callbackSelector](){
        CCLOG("actionManagerExPlayActionByNameWithCallback callback!");
        ScriptingCore *scriptingCore = ScriptingCore::getInstance();
        //JSContext *cx = scriptingCore->getGlobalContext();
        scriptingCore->executeFunctionWithOwner(callbackTarget, callbackSelector.c_str());
    });

    cocostudio::ActionManagerEx::getInstance()->playActionByName(json, animation_name, callback);
}
