import {
  getSignature
} from "@/until/api/wxconfig"; //分享api
import wx from 'weixin-js-sdk'
import store  from "../store";

/**
 *分享
 * @param _this
 * @param shareTitle 标题
 * @param shareUrl 链接
 * @param shareImg 图片
 * @param shareDesc 描述
 */
export function getwxready(str) {
  var url = location.href.split('#')[0]
  if(str.pcid || str.pcarticleid){
    var urlstr = `https://jd.unithought.com/pcid=${str.pcid}&pcpoid=${str.pcpoid}&pcarticleid=${str.pcarticleid}`
  }else{
    var urlstr = `https://jd.unithought.com/`
  }
  console.log(str);
  if(str.dname){
    var urlstr = `https://jd.unithought.com/pcid=${str.pcid}&pcpoid=${str.pcpoid}&pcarticleid=${str.pcarticleid}&dname=${str.dname}`
  }
  
  getSignature(url).then(res => {
    let data = res.data;
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appid, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.noncestr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名
      jsApiList: ['updateAppMessageShareData','updateTimelineShareData','onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
      wx.updateAppMessageShareData({
        title:str.title, // 分享标题
        desc:str.desc, // 分享描述
        link:urlstr, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:str.imgUrl || 'https://jd.unithought.com/shareLogo.png', // 分享图标
        success: function () {
          // alert('updateAppMessageShareData')
        }
      })
      wx.onMenuShareAppMessage({
        title:str.title, // 分享标题
        desc:str.desc, // 分享描述
        link:urlstr, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:str.imgUrl || 'https://jd.unithought.com/shareLogo.png', // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
            // alert('onMenuShareAppMessage')
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
      })

      // 朋友圈
      wx.updateAppMessageShareData({
        title:str.title, // 分享标题
        desc:str.desc, // 分享描述
        link:urlstr, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:str.imgUrl || 'https://jd.unithought.com/shareLogo.png', // 分享图标
        success: function () {
          // alert('updateAppMessageShareData')
        }
      })
      wx.onMenuShareTimeline({
        title:str.title, // 分享标题
        desc:str.desc, // 分享描述
        link:urlstr, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:str.imgUrl || 'https://jd.unithought.com/shareLogo.png', // 分享图标
        success: function () {
          // alert('updateAppMessageShareData')
        }
      })
    });
  }).catch(err => {
  })
}


export function getparams(form = ''){
  var sharedata = {
    title: '积大健康学苑',
    desc: "欢迎加入积大健康学苑",
    link: `https://jd.unithought.com/#/articledetails`,
    imgUrl: '',
  };

  if(form){
    var { pctitle, pcpicurl, video_link, cover_img,pcarticleid,pcid,pcpoid } = form;
    var sharedata = {
      title: pctitle,
      desc: "欢迎加入积大健康学苑",
      link: '',
      imgUrl: pcpicurl,
      pcid,
      pcpoid,
      pcarticleid,
      dname:form.dname
    };
  }

  getwxready(sharedata);
}