package org.ptouch.application.social;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.cocos2dx.javascript.AppActivity;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

public class LineTool {
    public static void share(String message){
        Log.d("LineTool", "message:" + message);
        AppActivity app = (AppActivity) AppActivity.getContext();
        Uri CONTENT_URI;
        try {
            CONTENT_URI = Uri.parse("line://msg/text/" + URLEncoder.encode(message, "UTF-8"));
            Intent intent = new Intent(Intent.ACTION_VIEW, CONTENT_URI);
            app.startActivity(intent);
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
