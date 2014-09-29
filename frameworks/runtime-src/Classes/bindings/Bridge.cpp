#include "Bridge.h"
#include "FieldAuth.h"
#include "cocos2d.h"
#include "cocostudio/CCActionManagerEx.h"

void Bridge::actionManagerExPlayActionByName(const char *json, const char *animation_name)
{
    CCLOG("Bridge::actionManagerExPlayActionByName start");
    CCLOG("json:%s", json);
    CCLOG("animation_name:%s", animation_name);

    cocostudio::ActionManagerEx::getInstance()->playActionByName(json, animation_name);
}

bool Bridge::fieldAuthCanEnterField(const char *field_name)
{
    CCLOG("Bridge::fieldAuthCanEnterField start");
    FieldAuth *fieldAuth = &FieldAuth::singleton();
    return fieldAuth->canEnterField(field_name);
}

void Bridge::fieldAuthEnableEnterField(const char *field_name)
{
    CCLOG("Bridge::fieldAuthEnableEnterField start");
    FieldAuth *fieldAuth = &FieldAuth::singleton();
    fieldAuth->enableEnterField(field_name);
}