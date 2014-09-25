#include "jsb_bridge_auto.hpp"
#include "cocos2d_specifics.hpp"
#include "Bridge.h"

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
JSClass  *jsb_Bridge_class;
JSObject *jsb_Bridge_prototype;

bool js_jsb_bridge_auto_Bridge_actionManagerExPlayActionByName(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	bool ok = true;
	if (argc == 2) {
		const char* arg0;
		const char* arg1;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, false, "js_jsb_bridge_auto_Bridge_actionManagerExPlayActionByName : Error processing arguments");
		Bridge::actionManagerExPlayActionByName(arg0, arg1);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return true;
	}
	JS_ReportError(cx, "js_jsb_bridge_auto_Bridge_actionManagerExPlayActionByName : wrong number of arguments");
	return false;
}



void js_Bridge_finalize(JSFreeOp *fop, JSObject *obj) {
    CCLOGINFO("jsbindings: finalizing JS object %p (Bridge)", obj);
    js_proxy_t* nproxy;
    js_proxy_t* jsproxy;
    jsproxy = jsb_get_js_proxy(obj);
    if (jsproxy) {
        nproxy = jsb_get_native_proxy(jsproxy->ptr);

        Bridge *nobj = static_cast<Bridge *>(nproxy->ptr);
        if (nobj)
            delete nobj;
        
        jsb_remove_proxy(nproxy, jsproxy);
    }
}

void js_register_jsb_bridge_auto_Bridge(JSContext *cx, JSObject *global) {
	jsb_Bridge_class = (JSClass *)calloc(1, sizeof(JSClass));
	jsb_Bridge_class->name = "Bridge";
	jsb_Bridge_class->addProperty = JS_PropertyStub;
	jsb_Bridge_class->delProperty = JS_DeletePropertyStub;
	jsb_Bridge_class->getProperty = JS_PropertyStub;
	jsb_Bridge_class->setProperty = JS_StrictPropertyStub;
	jsb_Bridge_class->enumerate = JS_EnumerateStub;
	jsb_Bridge_class->resolve = JS_ResolveStub;
	jsb_Bridge_class->convert = JS_ConvertStub;
	jsb_Bridge_class->finalize = js_Bridge_finalize;
	jsb_Bridge_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

	static JSPropertySpec properties[] = {
		{"__nativeObj", 0, JSPROP_ENUMERATE | JSPROP_PERMANENT, JSOP_WRAPPER(js_is_native_obj), JSOP_NULLWRAPPER},
		{0, 0, 0, JSOP_NULLWRAPPER, JSOP_NULLWRAPPER}
	};

	static JSFunctionSpec funcs[] = {
        JS_FS_END
	};

	static JSFunctionSpec st_funcs[] = {
		JS_FN("actionManagerExPlayActionByName", js_jsb_bridge_auto_Bridge_actionManagerExPlayActionByName, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FS_END
	};

	jsb_Bridge_prototype = JS_InitClass(
		cx, global,
		NULL, // parent proto
		jsb_Bridge_class,
		dummy_constructor<Bridge>, 0, // no constructor
		properties,
		funcs,
		NULL, // no static properties
		st_funcs);
	// make the class enumerable in the registered namespace
//	bool found;
//FIXME: Removed in Firefox v27	
//	JS_SetPropertyAttributes(cx, global, "Bridge", JSPROP_ENUMERATE | JSPROP_READONLY, &found);

	// add the proto and JSClass to the type->js info hash table
	TypeTest<Bridge> t;
	js_type_class_t *p;
	std::string typeName = t.s_name();
	if (_js_global_type_map.find(typeName) == _js_global_type_map.end())
	{
		p = (js_type_class_t *)malloc(sizeof(js_type_class_t));
		p->jsclass = jsb_Bridge_class;
		p->proto = jsb_Bridge_prototype;
		p->parentProto = NULL;
		_js_global_type_map.insert(std::make_pair(typeName, p));
	}
}

void register_all_jsb_bridge_auto(JSContext* cx, JSObject* obj) {
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

	js_register_jsb_bridge_auto_Bridge(cx, obj);
}

