#ifndef __BRIDGE_H__
#define __BRIDGE_H__

class Bridge
{
public:
    // cocostudio アニメーション関連
	static void actionManagerExPlayActionByName(const char *json, const char *animation_name);
    
    // FieldAuth周り
    static bool fieldAuthCanEnterField(const char *field_name);
    static void fieldAuthEnableEnterField(const char *field_name);
};
#endif
