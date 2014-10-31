
var queryPaymentInfoList = function(){
    if(cc.sys.OS_ANDROID === cc.sys.os){
        cc.log("queryPaymentInfo android");

        var payment_ids = [];
        _.each(FIELD_INIT_DATA, function(field_data){
            if(field_data.payment_id){
                payment_ids.push(field_data.payment_id);
            }
        });

        // java activity 内部に課金情報がストックされる
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
                                              "queryInventoryList",
                                              "(Ljava/lang/String;)V",
                                              payment_ids.join(","));
    }else if(cc.sys.OS_IOS === cc.sys.os){
        //cc.log("share_mail ios");
        //var ret = jsb.reflection.callStaticMethod("MailTool",
        //                                          "share:message:",
        //                                          share_mail_title, share_mail_message);
    }
};

var getPurchaseItemPrice = function(item_id){
    if(cc.sys.OS_ANDROID === cc.sys.os){
        cc.log("getPurchaseItemPrice android:"+ item_id);
        var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
                                                  "getSkuPrice",
                                                  "(Ljava/lang/String;)Ljava/lang/String;",
                                                  item_id);
        cc.log("getPurchaseItemPrice:" + item_id + ":price:" + ret);
    }else if(cc.sys.OS_IOS === cc.sys.os){
        //cc.log("share_mail ios");
        //var ret = jsb.reflection.callStaticMethod("MailTool",
        //                                          "share:message:",
        //                                          share_mail_title, share_mail_message);
    }
};

var purchaseItem = function(item_id){
    if(cc.sys.OS_ANDROID === cc.sys.os){
        cc.log("purchaseItem android");
        var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
                                                  "launchPurchaseFlow",
                                                  "(Ljava/lang/String;)V",
                                                  item_id);
    }else if(cc.sys.OS_IOS === cc.sys.os){
        //cc.log("share_mail ios");
        //var ret = jsb.reflection.callStaticMethod("MailTool",
        //                                          "share:message:",
        //                                          share_mail_title, share_mail_message);
    }
};

var itemPurchased = function(item_id){
    cc.log("itemPurchased:" + item_id);
    var field_name = _.detect(FIELD_INIT_DATA, function(field_data){ return field_data.payment_id === item_id; }).field_name;
    FieldAuthAPI.enableEnterField(field_name);
};
