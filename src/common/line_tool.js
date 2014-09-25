
var share_line_message = "シェアするよ!! http://yahoo.co.jp";

var share_line = function(){
    if(cc.sys.OS_ANDROID === cc.sys.os){
        cc.log("share_line android");
        var ret = jsb.reflection.callStaticMethod("org/ptouch/application/social/LineTool",
                                                  "share",
                                                  "(Ljava/lang/String;)V",
                                                  share_line_message);
    }else if(cc.sys.OS_IOS === cc.sys.os){
        cc.log("share_line ios");
        var ret = jsb.reflection.callStaticMethod("LineTool",
                                                  "share:",
                                                  share_line_message);
    }
};
