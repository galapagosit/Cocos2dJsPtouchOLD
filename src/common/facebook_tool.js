
var share_facebook_map = {
    "dialog": "ptouch_share_link",
    "description": "description!!",
    "title": "title",
    "link": "http://www.cocos2d-x.org",
    "imageUrl": "http://files.cocos2d-x.org/images/orgsite/logo.png"
};

var share_facebook = function(swallowTouches, onTouchBegan){
    window.facebook = window.facebook || (window.plugin ? plugin.FacebookAgent.getInstance() : null);

    // facebook ログイン
    facebook.isLoggedIn(function (type, msg) {
        cc.log("facebook.isLoggedIn callback");
        if (type == plugin.FacebookAgent.CODE_SUCCEED) {
            if (msg["isLoggedIn"]) {
                cc.log("facebook.isLoggedIn true");
                facebook.share(share_facebook_map, function (resultcode, msg) {
                    cc.log("facebook share success!!!");
                    cc.log(JSON.stringify(msg));
                });
            } else {
                cc.log("facebook.isLoggedIn false");
                facebook.login(function (type, msg) {
                    cc.log("facebook.login callback");
                    facebook.share(share_facebook_map, function (resultcode, msg) {
                        cc.log("facebook share success!!!");
                        cc.log(JSON.stringify(msg));
                    });
                });
            }
        } else {
            cc.log("facebook.isLoggedIn error");
        }
    });
};

