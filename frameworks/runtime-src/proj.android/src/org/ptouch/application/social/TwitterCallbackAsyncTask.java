package org.ptouch.application.social;

import java.io.IOException;

import org.cocos2dx.javascript.AppActivity;

import twitter4j.StatusUpdate;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;
import android.content.Context;
import android.content.res.AssetManager;
import android.net.Uri;
import android.os.AsyncTask;
import android.util.Log;

public class TwitterCallbackAsyncTask extends AsyncTask<Uri, Integer, AccessToken>{

    Context context;
    
    public TwitterCallbackAsyncTask(Context context){
        this.context = context;
    }
    
    @Override
    protected AccessToken doInBackground(Uri... params) {
        Log.d("TwitterCallbackAsyncTask", "doInBackground");
        Uri callbackUri = params[0];
        AccessToken accToken = null;
        String verifier = callbackUri.getQueryParameter("oauth_verifier");
        if (verifier == null) {
            Log.d("TwitterCallbackAsyncTask", "verifier is null");
            return null;
        }
        try {
            accToken = TwitterTool._oauth.getOAuthAccessToken(
                    TwitterTool._req, verifier);
        } catch (TwitterException e) {
            Log.v("ERR","callback err:" + e.getMessage());
            return null;
        }
        return accToken;
    }

    @Override
    protected void onPostExecute(AccessToken result){
        if (result != null) {
            // tokenとtokenSecretの取得
            String token = result.getToken();
            String tokenSecret = result.getTokenSecret();
            Log.d("TwitterCallbackAsyncTask", "token:" + token);
            Log.d("TwitterCallbackAsyncTask", "tokenSecret:" + tokenSecret);
            
            // The factory instance is re-useable and thread safe.
            TwitterFactory factory = new TwitterFactory();
            Twitter twitter = factory.getInstance();
            twitter.setOAuthConsumer(TwitterTool.ConsumerKey, TwitterTool.ConsumerSecret);
            AccessToken accessToken = new AccessToken(token, tokenSecret);
            twitter.setOAuthAccessToken(accessToken);
            
            try {
                AppActivity app = (AppActivity) AppActivity.getContext();
                AssetManager as = app.getResources().getAssets();
                StatusUpdate status = new StatusUpdate(TwitterTool._message);
                try {
                    status.media("ptouch", as.open("res/HelloWorld.png"));
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                    return;
                }
                twitter.updateStatus(status);
                Log.d("TwitterCallbackAsyncTask", "Successfully updated the status to [" + status.toString() + "].");
            } catch (TwitterException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        } else {
            Log.v("ERR","callback task error.");
        }
    }
}