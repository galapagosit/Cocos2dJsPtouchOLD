//
//  LineTool.m
//  Cocos2dJsPtouch
//
//  Created by 橋本 大輔 on 9/21/14.
//
//

#import "LineTool.h"

@implementation LineTool
+(BOOL)share:(NSString *)message {
    NSLog(@"LineTool share start message:%@", message);

    NSString *LineUrlString = [NSString stringWithFormat:@"line://msg/text/%@",
                               [message stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:LineUrlString]];
    
    return TRUE;
}
@end
