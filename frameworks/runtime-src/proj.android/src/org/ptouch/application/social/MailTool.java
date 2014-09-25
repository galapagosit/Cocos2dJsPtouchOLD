package org.ptouch.application.social;

import org.cocos2dx.javascript.AppActivity;

import android.content.Intent;
import android.util.Log;

public class MailTool {
    public static void share(String title, String message){
        Log.d("LineTool", "title:" + title + " message:" + message);
        
        // Intentインスタンスを生成  
        Intent intent = new Intent();  
          
        // アクションを指定(ACTION_SENDTOではないところがミソ)  
        intent.setAction(Intent.ACTION_SEND);  
        // データタイプを指定  
        intent.setType("message/rfc822");  

        // 件名を指定  
        intent.putExtra(Intent.EXTRA_SUBJECT, title);  
        // 本文を指定  
        intent.putExtra(Intent.EXTRA_TEXT, message);  
          
        // Intentを発行
        AppActivity app = (AppActivity) AppActivity.getContext();
        app.startActivity(intent);  
    }
}
