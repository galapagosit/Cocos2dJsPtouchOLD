//
//  MailTool.m
//  Cocos2dJsPtouch
//
//  Created by 橋本 大輔 on 9/22/14.
//
//

#import "MailTool.h"
#import "RootViewController.h"

@implementation MailTool
+ (BOOL)share:(NSString *)title
      message:(NSString *)message;
{
    NSLog(@"MailTool share start message:%@", message);

    dispatch_async(dispatch_get_main_queue(), ^{
        // root view controller取得
        UIWindow *window = [UIApplication sharedApplication].keyWindow;
        if (window == nil) {
            window = [[UIApplication sharedApplication].windows objectAtIndex:0];
        }
        RootViewController *viewController = (RootViewController *)window.rootViewController;
        [viewController sendMail:title message:message];
    });

    return TRUE;
}
@end
