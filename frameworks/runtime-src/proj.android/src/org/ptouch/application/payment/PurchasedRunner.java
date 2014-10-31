package org.ptouch.application.payment;

import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

public class PurchasedRunner implements Runnable{
    private String sku;
    public PurchasedRunner(String sku){
        this.sku = sku;
    }
    @Override
    public void run() {
        Cocos2dxJavascriptJavaBridge.evalString("itemPurchased(\"" + this.sku + "\")");
    }
};