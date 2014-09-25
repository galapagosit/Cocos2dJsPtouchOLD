
var share_twitter_message = "シェアするよ!! http://yahoo.co.jp";

var share_twitter = function(){
    if(cc.sys.OS_ANDROID === cc.sys.os){
        cc.log("share_twitter android");
        var ret = jsb.reflection.callStaticMethod("org/ptouch/application/social/TwitterTool",
                                                  "share",
                                                  "(Ljava/lang/String;)V",
                                                  share_twitter_message);
    }else if(cc.sys.OS_IOS === cc.sys.os){
        cc.log("share_twitter ios");
        var ret = jsb.reflection.callStaticMethod("TwitterTool",
                                                  "share:",
                                                  share_twitter_message);
    }
};
