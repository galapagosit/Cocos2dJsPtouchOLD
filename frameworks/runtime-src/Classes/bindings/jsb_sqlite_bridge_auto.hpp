#ifndef __jsb_sqlite_bridge_auto_h__
#define __jsb_sqlite_bridge_auto_h__

#include "jsapi.h"
#include "jsfriendapi.h"


extern JSClass  *jsb_SQLiteBridge_class;
extern JSObject *jsb_SQLiteBridge_prototype;

bool js_jsb_sqlite_bridge_auto_SQLiteBridge_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_jsb_sqlite_bridge_auto_SQLiteBridge_finalize(JSContext *cx, JSObject *obj);
void js_register_jsb_sqlite_bridge_auto_SQLiteBridge(JSContext *cx, JSObject *global);
void register_all_jsb_sqlite_bridge_auto(JSContext* cx, JSObject* obj);
bool js_jsb_sqlite_bridge_auto_SQLiteBridge_execSql(JSContext *cx, uint32_t argc, jsval *vp);
bool js_jsb_sqlite_bridge_auto_SQLiteBridge_SQLiteBridge(JSContext *cx, uint32_t argc, jsval *vp);
#endif

