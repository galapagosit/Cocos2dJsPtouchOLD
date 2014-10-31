/****************************************************************************
Copyright (c) 2008-2010 Ricardo Quesada
Copyright (c) 2010-2012 cocos2d-x.org
Copyright (c) 2011      Zynga Inc.
Copyright (c) 2013-2014 Chukong Technologies Inc.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package org.cocos2dx.javascript;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.cocos2dx.plugin.FacebookWrapper;
import org.cocos2dx.plugin.PluginWrapper;
import org.ptouch.application.social.TwitterCallbackAsyncTask;
import org.ptouch.application.social.TwitterTool;
import org.ptouch.application.util.IabHelper;
import org.ptouch.application.util.IabResult;
import org.ptouch.application.util.Inventory;
import org.ptouch.application.util.Purchase;
import org.ptouch.application.util.SkuDetails;
import org.ptouch.application.payment.PurchasedRunner;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

public class AppActivity extends Cocos2dxActivity {

    // for In-app Billing start
    IabHelper mHelper;
    List<String> additionalSkuList = Collections.synchronizedList(new ArrayList<String>());
    Map<String, Object> skuMap = Collections.synchronizedMap(new HashMap<String, Object>());
    // for In-app Billing end

    @Override
    protected void onCreate(final Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // for In-app Billing start
        // TODO: 暗号化するべきと書いてあったが、、、
        String base64EncodedPublicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkLb20v3OjX70eCSjAWexOZcUDKJ/gLc01ZJbtBqjXOBHqpy1VV3pOv9lRJIkCFslZLl16F9haLziCkIZIqoxTbiu0P4ykMtrkTkBBAccB6sfcg/x621HGEnLqokmA+LInkPN7bDDgH6M3hv+yrZVu0d09jxvI3lgPlUC6fUzAakoXYTi6jbRbVjl9sRe5VmdI23OR3Qn7sNK2P0GgFHii/aLZP3muPHxGIrW7C5NvslGbqv5i/QNgO4BhUrgIrCeJaoa0Se57zh0EU5V1NOkhbWp10OPuQ7PBSxDBGk/r33iKQ16fGHr5FQ0hvdCbzs4y30YyyL2eUKtZaoaEq9++QIDAQAB";

        // compute your public key and store it in base64EncodedPublicKey
        mHelper = new IabHelper(this, base64EncodedPublicKey);

        mHelper.startSetup(new IabHelper.OnIabSetupFinishedListener() {
            public void onIabSetupFinished(IabResult result) {
                if (!result.isSuccess()) {
                    // Oh noes, there was a problem.
                    Log.d("AppActivity", "Problem setting up In-app Billing: "
                            + result);
                } else {
                    Log.d("AppActivity", "Success setting up In-app Billing");
                }
                // Hooray, IAB is fully set up!
            }
        });
        // for In-app Billing end
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        // for In-app Billing start
        if (mHelper != null)
            mHelper.dispose();
        mHelper = null;
        // for In-app Billing end
    }

    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);

        // for FACEBOOK SDK start
        PluginWrapper.init(this);
        PluginWrapper.setGLSurfaceView(glSurfaceView);
        FacebookWrapper.onCreate(this);
        // for FACEBOOK SDK end
        
        return glSurfaceView;
    }
    
    /*
     * for FACEBOOK SDK start
     */
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        FacebookWrapper.onAcitivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        FacebookWrapper.onSaveInstanceState(outState);
    }
    /*
     * for FACEBOOK SDK end
     */
    
    /*
     * for Twitter start
     */
    @Override
    protected void onResume() {
        Log.d("AppActivity", "onResume");
        super.onResume();

        //callback - Twitterの認証画面から発行されるIntentからUriを取得
        Uri uri = getIntent().getData();
        if(uri != null && uri.toString().startsWith(TwitterTool.CallbackUri)){
            TwitterCallbackAsyncTask callbackTask = new TwitterCallbackAsyncTask(this);
            callbackTask.execute(uri);
        }
    }
    /*
     * for Twitter end
     */
    
    /*
     * for In-app Billing start
     */
    public static void queryInventoryList(String commaSeparatedInventoryList){
        Log.d("AppActivity", "queryInventoryList");

        AppActivity app = (AppActivity) AppActivity.getContext();
        
        String[] array = commaSeparatedInventoryList.split(",");
        
        app.additionalSkuList.clear();
        for(int i = 0; i < array.length; i++){
            app.additionalSkuList.add(array[i]);
        }
        
        //we must use runOnUiThread here
        app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                AppActivity app = (AppActivity) AppActivity.getContext();
                app.queryInventoryListOnUiThread();
            }
        });
    }
    
    public void queryInventoryListOnUiThread(){
        mHelper.queryInventoryAsync(true, additionalSkuList, mQueryFinishedListener);
    }
    
    IabHelper.QueryInventoryFinishedListener mQueryFinishedListener = new IabHelper.QueryInventoryFinishedListener() {
        public void onQueryInventoryFinished(IabResult result, Inventory inventory)
        {
            if (result.isFailure()) {
                // handle error
                Log.d("AppActivity", "onQueryInventoryFinished:error");
                return;
            }

            for (String sku: additionalSkuList) {
                SkuDetails skuDetails = inventory.getSkuDetails(sku);
                if(skuDetails == null){
                    Log.d("AppActivity", "SkuDetails is NULL sku:" + sku);
                    continue;
                }
                
                HashMap<String, Object> skuDetailMap = new HashMap<String, Object>();
                skuDetailMap.put("price", skuDetails.getPrice());
                skuDetailMap.put("purchased", inventory.hasPurchase(sku));

                Log.d("AppActivity", "put skuDetailMap:" + skuDetailMap);
                skuMap.put(sku, skuDetailMap);
                
                // 通常は購入後のコールバックで行うべき処理だが、アプリインストールし直し、購入したけど反映されないケースのリカバリ
                if(inventory.hasPurchase(sku)){
                    AppActivity app = (AppActivity) AppActivity.getContext();
                    app.runOnGLThread(new PurchasedRunner(sku));
                }
            }
        }
    };
    
    public static String getSkuPrice(String sku){
        Log.d("AppActivity", "getPrice:" + sku);
        AppActivity app = (AppActivity) AppActivity.getContext();
        if(!app.skuMap.containsKey(sku)){
            Log.d("AppActivity", "error skuMap not contain sku:" + sku);
            return "";
        }
        
        Object hashMap = app.skuMap.get(sku);
        HashMap<String, Object> skuDetailMap = ((HashMap<String, Object>)hashMap);
        
        Log.d("AppActivity", "skuPrice:" + (String)(skuDetailMap.get("price")));
        return (String)(skuDetailMap.get("price"));
    }
    
    public static void launchPurchaseFlow(String sku){
        Log.d("AppActivity", "launchPurchaseFlow:" + sku);
        //we must use runOnUiThread here
        class PurchaseRunner implements Runnable{
            private String sku;
            public PurchaseRunner(String sku){
                this.sku = sku;
            }
            @Override
            public void run() {
                AppActivity app = (AppActivity) AppActivity.getContext();
                app.launchPurchaseFlowOnUiThread(this.sku);
            }
        };
        AppActivity app = (AppActivity) AppActivity.getContext();
        app.runOnUiThread(new PurchaseRunner(sku));
    }
    
    public void launchPurchaseFlowOnUiThread(String sku){
        mHelper.launchPurchaseFlow(this, sku, 10001,
                mPurchaseFinishedListener, "");
    }
    
    IabHelper.OnIabPurchaseFinishedListener mPurchaseFinishedListener = new IabHelper.OnIabPurchaseFinishedListener() {
        public void onIabPurchaseFinished(IabResult result, Purchase purchase)
        {
           if (result.isFailure()) {
              Log.d("AppActivity", "OnIabPurchaseFinishedListener error" + result);
              return;
           }
           Log.d("AppActivity", "onIabPurchaseFinished Sku:" + purchase.getSku());
           Log.d("AppActivity", "onIabPurchaseFinished OrderId:" + purchase.getOrderId());
           Log.d("AppActivity", "onIabPurchaseFinished DeveloperPayload:" + purchase.getDeveloperPayload());
           
           // 購入結果をjs側で反映
           AppActivity app = (AppActivity) AppActivity.getContext();
           app.runOnGLThread(new PurchasedRunner(purchase.getSku()));
        }
    };
    /*
     * for In-app Billing end
     */
}
