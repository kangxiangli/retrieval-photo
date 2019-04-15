const Mock = require("mockjs");
// 获取 mock.Random 对象
const Random = Mock.Random;
/**
 * mock 一组产品数据
 * */
const produceNewsData = function() {
  let articles = [];
  for (let i = 0; i < 10; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 10), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage("300x250", "mock的图片"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: "2018-9-22" + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    articles.push(newArticleObject);
  }

  return {
    articles: articles
  };
};
// /**
//  * mock 用户登录接口
//  * */
// const loginInterface = function() {
//   let whiteUser = [{ username: "root", pwd: "123456"}, {username: "lism", pwd: "123456" }];
//   let logined = false; //默认是未登录
//   whiteUser.forEach(user => {
//     if (params.username === user.username && params.pwd === user.pwd) {
//       logined = true
//     }
//   });
//   return logined;
// };

// Mock.mock( url, post/get , 返回的数据)；
// Mock.mock('/kas/test', 'post', produceNewsData);
// Mock.mock('/kas/login', 'post', loginInterface);
