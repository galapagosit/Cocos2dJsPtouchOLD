#include "Bridge.h"
#include "cocos2d.h"
#include "cocostudio/CCActionManagerEx.h"

void Bridge::actionManagerExPlayActionByName(const char *json, const char *animation_name)
{
    CCLOG("Bridge::actionManagerExPlayActionByName start");
    CCLOG("json:%s", json);
    CCLOG("animation_name:%s", animation_name);

    cocostudio::ActionManagerEx::getInstance()->playActionByName(json, animation_name);

    CCLOG("Bridge::actionManagerExPlayActionByName end");
}
