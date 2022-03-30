/**
 * 路由埋点
 * 王栋
 * 2021-12-31
 * 沃夫慈悲
 */

export const mixin = {
    data() {
        return {

        }
    },
    methods: {

    },
    // created() {
    //     const { pctitle, pcpicurl,pcid, pcpoid,cover_img,video_link } = this.detailform;
    //     if(pcid && pcpoid){
    //         var urlstr = `https://jd.unithought.com/pcid=${str.pcid}&pcpoid=${str.pcpoid}`
    //       }else{
    //         var urlstr = `https://jd.unithought.com/`
    //       }
    //     document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    //         // 发送给好友
    //         WeixinJSBridge.on('menu:share:appmessage', function () {
    //             WeixinJSBridge.invoke('sendAppMessage', {
    //                 "img_url": video_link?cover_img:pcpicurl,
    //                 "img_width": "640",
    //                 "img_height": "640",
    //                 "link":urlstr,
    //                 "desc": pctitle || ''
    //             }, function (res) {
    //                 console.log(res);
    //                 return
    //                 //分享给好友成功
    //                 if (res.err_msg == "send_app_msg:ok") {
                      
    //                 }
    //             })
    //         });
    //     }, false);
    // },
}