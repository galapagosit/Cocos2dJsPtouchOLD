//
//  TwitterTool.m
//  Cocos2dJsPtouch
//
//  Created by 橋本 大輔 on 9/10/14.
//
//
#import <Social/Social.h>

#import "TwitterTool.h"
#import "ScriptingCore.h"

@implementation TwitterTool
+(BOOL)share:(NSString *)message {
    NSLog(@"TwitterTool share start message:%@", message);
    
    // root view controller取得
    UIWindow *window = [UIApplication sharedApplication].keyWindow;
    if (window == nil) {
        window = [[UIApplication sharedApplication].windows objectAtIndex:0];
    }
    UIViewController *viewController = window.rootViewController;

//    if (![SLComposeViewController isAvailableForServiceType:SLServiceTypeTwitter]) {
//        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"ツイートエラー"
//                                                        message:@"Twitterアカウントが設定されていません。"
//                                                       delegate:nil
//                                              cancelButtonTitle:nil
//                                              otherButtonTitles:@"OK", nil];
//        [alert show];
//        return FALSE;
//    }
    
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{
        // Your code to run on the main queue/thread
        SLComposeViewController *controller = [SLComposeViewController composeViewControllerForServiceType:SLServiceTypeTwitter];
        // メッセージ
        [controller setInitialText:message];
        // アプリのURL
        [controller addURL:[NSURL URLWithString:@"http://yahoo.co.jp"]];
        // イメージファイルパス
        [controller addImage:[UIImage imageNamed:@"res/HelloWorld.png"]];
        
        controller.completionHandler =^(SLComposeViewControllerResult result){
            NSLog(@"TwitterTool SLComposeViewControllerResult");
            [viewController dismissViewControllerAnimated:YES completion:nil];

            if(result == SLComposeViewControllerResultDone){
                // 投稿成功時の処理
                // can not send tweetでもここに来てしまう。。。同一文字列の投稿のケースかな
                NSLog(@"TwitterTool share success");
                
                // jsのメソッド実行
                ScriptingCore* sc = ScriptingCore::getInstance();
                jsval nsval;
                sc->evalString("cc.log(\"hogehoge\")", &nsval);
            }
        };
        [viewController presentViewController:controller animated:YES completion:nil];
    }];

    return TRUE;
}
@end
