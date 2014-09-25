//
//  MailTool.h
//  Cocos2dJsPtouch
//
//  Created by 橋本 大輔 on 9/22/14.
//
//

#import <Foundation/Foundation.h>

@interface MailTool : NSObject
+(BOOL)share:(NSString *)title
     message:(NSString *)message;
@end
