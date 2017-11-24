var nowUser = {
	imgUrl: "images/1.jpg",
	userName: "Alex"
};

var commentData = [{
		imgUrl: "images/1.jpg",
		userName: "夏天流汗的胖子 ",
		postTime: "2017-08-07",
		postContent:`你意思游戏板块有比腾讯更挣钱的公司？`,
		subComments: [{
			imgUrl: "images/36_1502066886.jpg",
			userName: "Td. ",
			postTime: "2017-08-07",
			postContent: `拉倒吧，腾讯就趁一个微信，QQ。别的都不行。`
		}],
		good:45,
		bad:46
	},
	{
		imgUrl: "images/45_1480471028.jpeg",
		userName: "牧师（教育）  ",
		postTime: "2017-08-07",
		postContent:`你意思游戏板块有比腾讯更挣钱的公司？`,
		subComments: [{
			imgUrl: "images/36_1502066886.jpg",
			userName: "小麦子哈  ",
			postTime: "2017-08-07",
			postContent:`拉倒吧，腾讯就趁一个微信，QQ。别的都不行。`,
			subComments: [{
				imgUrl: "images/36_1502066886.jpg",
				userName: "小麦子哈  ",
				postTime: "2017-08-07",
				postContent:`企业首先要收入才能养人，腾讯有游戏收入养，阿里有商家养，其它如果没有广告收入，就倒闭了`
			}]
		}, {
			imgUrl: "images/52_1496366031.jpg",
			userName: "季不住  ",
			postTime: "2017-08-07",
			postContent:`腾讯的产品、阿里的运营、百度的xx。\n腾讯的广告收入低，是因为腾讯注重用户体验，不做像x度、x头条这种杀鸡取卵的事情。`,
			subComments: [{
				imgUrl: "images/36_1502066886.jpg",
				userName: "小麦子哈  ",
				postTime: "2017-08-07",
				postContent:`你意思游戏板块有比腾讯更挣钱的公司？`
			}]
		}],
		good:5,
		bad:23
	}
];

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  