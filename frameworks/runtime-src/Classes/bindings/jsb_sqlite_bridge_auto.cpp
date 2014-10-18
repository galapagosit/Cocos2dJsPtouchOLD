#include "jsb_sqlite_bridge_auto.hpp"
#include "cocos2d_specifics.hpp"
#include "SQLiteBridge.h"

template<class T>
static bool dummy_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
    JS::RootedValue initializing(cx);
    bool isNewValid = true;
	if (isNewValid)
	{
		TypeTest<T> t;
		js_type_class_t *typeClass = nullptr;
		std::string typeName = t.s_name();
		auto typeMapIter = _js_global_type_map.find(typeName);
		CCASSERT(typeMapIter != _js_global_type_map.end(), "Can't find the class type!");
		typeClass = typeMapIter->second;
		CCASSERT(typeClass, "The value is null.");

		JSObject *_tmp = JS_NewObject(cx, typeClass->jsclass, typeClass->proto, typeClass->parentProto);
		T* cobj = new T();
		js_proxy_t *pp = jsb_new_proxy(cobj, _tmp);
		JS_AddObjectRoot(cx, &pp->obj);
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(_tmp));
		return true;
	}

    return false;
}

static bool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
	return false;
}

static bool js_is_native_obj(JSContext *cx, JS::HandleObject obj, JS::HandleId id, JS::MutableHandleValue vp)
{
	vp.set(BOOLEAN_TO_JSVAL(true));
	return true;	
}
JSClass  *jsb_SQLiteBridge_class;
JSObject *jsb_SQLiteBridge_prototype;

bool js_jsb_sqlite_bridge_auto_SQLiteBridge_execSql(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	SQLiteBridge* cobj = (SQLiteBridge *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, false, "js_jsb_sqlite_bridge_auto_SQLiteBridge_execSql : Invalid Native Object");
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, false, "js_jsb_sqlite_bridge_auto_SQLiteBridge_execSql : Error processing arguments");
		const char* ret = cobj->execSql(arg0);
		jsval jsret = JSVAL_NULL;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}

	JS_ReportError(cx, "js_jsb_sqlite_bridge_auto_SQLiteBridge_execSql : wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
bool js_jsb_sqlite_bridge_auto_SQLiteBridge_getAccesser(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, false, "js_jsb_sqlite_bridge_auto_SQLiteBridge_getAccesser : Error processing arguments");
		SQLiteBridge* ret = SQLiteBridge::getAccesser(arg0);
		jsval jsret = JSVAL_NULL;
		do {
		if (ret) {
			js_proxy_t *jsProxy = js_get_or_create_proxy<SQLiteBridge>(cx, (SQLiteBridge*)ret);
			jsret = OBJECT_TO_JSVAL(jsProxy->obj);
		} else {
			jsret = JSVAL_NULL;
		}
	} while (0);
		JS_SET_RVAL(cx, vp, jsret);
		return true;
	}
	JS_ReportError(cx, "js_jsb_sqlite_bridge_auto_SQLiteBridge_getAccesser : wrong number of arguments");
	return false;
}

bool js_jsb_sqlite_bridge_auto_SQLiteBridge_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
    SQLiteBridge* cobj = new (std::nothrow) SQLiteBridge();
    TypeTest<SQLiteBridge> t;
    js_type_class_t *typeClass = nullptr;
    std::string typeName = t.s_name();
    auto typeMapIter = _js_global_type_map.find(typeName);
    CCASSERT(typeMapIter != _js_global_type_map.end(), "Can't find the class type!");
    typeClass = typeMapIter->second;
    CCASSERT(typeClass, "The value is null.");
    JSObject *obj = JS_NewObject(cx, typeClass->jsclass, typeClass->proto, typeClass->parentProto);
    JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
    // link the native object with the javascript object
    js_proxy_t* p = jsb_new_proxy(cobj, obj);
    if (JS_HasProperty(cx, obj, "_ctor", &ok))
        ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(obj), "_ctor", argc, argv);
    return true;
}



void js_SQLiteBridge_finalize(JSFreeOp *fop, JSObject *obj) {
    CCLOGINFO("jsbindings: finalizing JS object %p (SQLiteBridge)", obj);
    js_proxy_t* nproxy;
    js_proxy_t* jsproxy;
    jsproxy = jsb_get_js_proxy(obj);
    if (jsproxy) {
        nproxy = jsb_get_native_proxy(jsproxy->ptr);

        SQLiteBridge *nobj = static_cast<SQLiteBridge *>(nproxy->ptr);
        if (nobj)
            delete nobj;
        
        jsb_remove_proxy(nproxy, jsproxy);
    }
}

void js_register_jsb_sqlite_bridge_auto_SQLiteBridge(JSContext *cx, JSObject *global) {
	jsb_SQLiteBridge_class = (JSClass *)calloc(1, sizeof(JSClass));
	jsb_SQLiteBridge_class->name = "SQLiteBridge";
	jsb_SQLiteBridge_class->addProperty = JS_PropertyStub;
	jsb_SQLiteBridge_class->delProperty = JS_DeletePropertyStub;
	jsb_SQLiteBridge_class->getProperty = JS_PropertyStub;
	jsb_SQLiteBridge_class->setProperty = JS_StrictPropertyStub;
	jsb_SQLiteBridge_class->enumerate = JS_EnumerateStub;
	jsb_SQLiteBridge_class->resolve = JS_ResolveStub;
	jsb_SQLiteBridge_class->convert = JS_ConvertStub;
	jsb_SQLiteBridge_class->finalize = js_SQLiteBridge_finalize;
	jsb_SQLiteBridge_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

	static JSPropertySpec properties[] = {
		{"__nativeObj", 0, JSPROP_ENUMERATE | JSPROP_PERMANENT, JSOP_WRAPPER(js_is_native_obj), JSOP_NULLWRAPPER},
		{0, 0, 0, JSOP_NULLWRAPPER, JSOP_NULLWRAPPER}
	};

	static JSFunctionSpec funcs[] = {
		JS_FN("execSql", js_jsb_sqlite_bridge_auto_SQLiteBridge_execSql, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
	};

	static JSFunctionSpec st_funcs[] = {
		JS_FN("getAccesser", js_jsb_sqlite_bridge_auto_SQLiteBridge_getAccesser, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FS_END
	};

	jsb_SQLiteBridge_prototype = JS_InitClass(
		cx, global,
		NULL, // parent proto
		jsb_SQLiteBridge_class,
		js_jsb_sqlite_bridge_auto_SQLiteBridge_constructor, 0, // constructor
		properties,
		funcs,
		NULL, // no static properties
		st_funcs);
	// make the class enumerable in the registered namespace
//	bool found;
//FIXME: Removed in Firefox v27	
//	JS_SetPropertyAttributes(cx, global, "SQLiteBridge", JSPROP_ENUMERATE | JSPROP_READONLY, &found);

	// add the proto and JSClass to the type->js info hash table
	TypeTest<SQLiteBridge> t;
	js_type_class_t *p;
	std::string typeName = t.s_name();
	if (_js_global_type_map.find(typeName) == _js_global_type_map.end())
	{
		p = (js_type_class_t *)malloc(sizeof(js_type_class_t));
		p->jsclass = jsb_SQLiteBridge_class;
		p->proto = jsb_SQLiteBridge_prototype;
		p->parentProto = NULL;
		_js_global_type_map.insert(std::make_pair(typeName, p));
	}
}

void register_all_jsb_sqlite_bridge_auto(JSContext* cx, JSObject* obj) {
	// first, try to get the ns
	JS::RootedValue nsval(cx);
	JS::RootedObject ns(cx);
	JS_GetProperty(cx, obj, "jsb", &nsval);
	if (nsval == JSVAL_VOID) {
		ns = JS_NewObject(cx, NULL, NULL, NULL);
		nsval = OBJECT_TO_JSVAL(ns);
		JS_SetProperty(cx, obj, "jsb", nsval);
	} else {
		JS_ValueToObject(cx, nsval, &ns);
	}
	obj = ns;

	js_register_jsb_sqlite_bridge_auto_SQLiteBridge(cx, obj);
}

