//
//  ViewController.m
//  Bugz
//
//  Created by Erin Hearty on 6/7/15.
//  Copyright (c) 2015 Erin Hearty. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSURL *url = [NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"main" ofType:@"html" inDirectory:@"assets"]];
    
    //set desired width and height
    UIWebView *myWebView = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, 1, 1)];
    myWebView.scalesPageToFit = YES;
    [myWebView setDelegate:self];
    [myWebView loadRequest:[NSURLRequest requestWithURL:url]];
    [self.view addSubview:myWebView];
    self.mainView = myWebView;

}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    CGRect screenRect = [[UIScreen mainScreen] bounds];
    CGFloat screenWidth = screenRect.size.width;
    CGFloat screenHeight = screenRect.size.height;
    
    self.mainView.frame = CGRectMake(0, 0, screenWidth, screenHeight);
    self.mainView.bounds = self.mainView.bounds;
    self.mainView.clipsToBounds = YES;
    
    self.mainView.scalesPageToFit = YES;
    self.mainView.autoresizesSubviews = NO;
    self.mainView.autoresizingMask=(UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth);
    [self.mainView setBackgroundColor:[UIColor redColor]];
}

@end
