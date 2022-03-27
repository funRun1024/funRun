export default {
  pages: [
    // "pages/runMsg/index",
    // "pages/personRun/index",
    // "pages/run/index",
    // "pages/index/index",
    // "pages/top/index"
    // "pages/cloth/index"
    // "pages/track/index",'
    'pages/index/index',
    'pages/result/index',
    'pages/track/index',
    'pages/top/index',
    'pages/cloth/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '趣跑',
    navigationBarTextStyle: 'black'
  },
  permission: {
    'scope.userLocation': {
      desc: '申请访问你的位置信息'
    }
  }
};
