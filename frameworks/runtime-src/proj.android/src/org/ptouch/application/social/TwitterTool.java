package org.ptouch.application.social;

import org.cocos2dx.javascript.AppActivity;

import twitter4j.TwitterException;
import twitter4j.auth.OAuthAuthorization;
import twitter4j.auth.RequestToken;
import twitter4j.conf.Configuration;
import twitter4j.conf.ConfigurationContext;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

public class TwitterTool {
    
    public static String ConsumerKey = "d0zAwTYNtxCVCa1i8XB5LXrpd";
    public static String ConsumerSecret = "n8OxWCX64JHCw6pSCkuW6f1T5lLEBYy5MU7EF2Sn8atI8geXkf";

    public static String CallbackUri = "ptouchtwittercallback://AppActivity";
    
    public static RequestToken _req = null;
    public static OAuthAuthorization _oauth = null;
    public static String _message = null;
    
    public static void share(String message){
        Log.d("TwitterTool", "message:" + message);

        TwitterTool twitterTool = new TwitterTool();
        twitterTool.startTwitterOAuth(message);
    }
    
    //twitterにoauthリクエストを送る
    public void startTwitterOAuth(String message){
        //Twitetr4jの設定を読み込む
        Configuration conf = ConfigurationContext.getInstance();

        if(_oauth == null){
            //Oauth認証オブジェクト作成
            _oauth = new OAuthAuthorization(conf);
            //Oauth認証オブジェクトにconsumerKeyとconsumerSecretを設定
            _oauth.setOAuthConsumer(ConsumerKey, ConsumerSecret);
        }
        //メッセージをセット
        _message = message;
        
        //アプリの認証オブジェクト作成
        try {
            //認証後アプリに戻るようにcallbackを設定
            _req = _oauth.getOAuthRequestToken(CallbackUri);
        } catch (TwitterException e) {
            Log.v("TEST", "err:" + e.getErrorMessage(), e);
            //return;
        }
        String uri = _req.getAuthorizationURL();

        //ブラウザーアプリへ移動、RequestTokenを取得するために
        Log.d("AppActivity", "Intent.ACTION_VIEW url:" + uri);
        AppActivity app = (AppActivity) AppActivity.getContext();
        app.startActivity(new Intent(Intent.ACTION_VIEW , Uri.parse(uri)));
        app.finish();
    }

}
