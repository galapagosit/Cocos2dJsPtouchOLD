#ifndef __jsb_bridge_auto_h__
#define __jsb_bridge_auto_h__

#include "jsapi.h"
#include "jsfriendapi.h"


extern JSClass  *jsb_Bridge_class;
extern JSObject *jsb_Bridge_prototype;

bool js_jsb_bridge_auto_Bridge_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_jsb_bridge_auto_Bridge_finalize(JSContext *cx, JSObject *obj);
void js_register_jsb_bridge_auto_Bridge(JSContext *cx, JSObject *global);
void register_all_jsb_bridge_auto(JSContext* cx, JSObject* obj);
bool js_jsb_bridge_auto_Bridge_actionManagerExPlayActionByName(JSContext *cx, uint32_t argc, jsval *vp);
#endif

