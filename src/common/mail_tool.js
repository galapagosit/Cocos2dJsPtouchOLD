
var share_mail_title = "シェアするよ!!";
var share_mail_message = "シェアするよ!! http://yahoo.co.jp";

var share_mail = function(){
    if(cc.sys.OS_ANDROID === cc.sys.os){
        cc.log("share_mail android");
        var ret = jsb.reflection.callStaticMethod("org/ptouch/application/social/MailTool",
                                                  "share",
                                                  "(Ljava/lang/String;Ljava/lang/String;)V",
                                                  share_mail_title, share_mail_message);
    }else if(cc.sys.OS_IOS === cc.sys.os){
        cc.log("share_mail ios");
        var ret = jsb.reflection.callStaticMethod("MailTool",
                                                  "share:message:",
                                                  share_mail_title, share_mail_message);
    }
};
