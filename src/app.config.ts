export default {
  pages: [
    // "pages/result/index",
    // "pages/run/index",
    // "pages/track/index",'
    'pages/top/index',
    'pages/cloth/index',
    'pages/index/index'
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
