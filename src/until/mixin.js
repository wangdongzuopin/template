/**
 * 路由埋点
 * 王栋
 * 2021-12-31
 * 沃夫慈悲
 */
import {
    tabdata
} from "@/until/data/tabber.js";
export const mixin = {
    data() {
        return {
            page: '',
            mixindata: {
                openid: '',
                previousPageName: '',
                pageName: '',
                pageRoute: '',
                parameterName: '',
                article_id: ''
            }
        }
    },
    methods: {
        // 获取当前页面信息
        getcurrentPageData() {
            let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
            this.mixindata.pageName = this.name || ''
            this.mixindata.pageRoute = routes[routes.length - 1].route //获取当前页面路由
            this.mixindata.previousPageName = ''
            this.mixindata.openid = uni.getStorageSync("openid");
            // 上个页面的名字和路径
            if (routes[routes.length - 2]) {
                this.mixindata.previousPageName = routes[routes.length - 2].$vm.name || ""
                this.mixindata.previousPageRoute = routes[routes.length - 2].route || ""
            }
            if (this.mixindata.pageRoute == 'pageA/track/index') {
                this.mixindata.article_id = this.id
                if (this.mixindata.article_id) {
                    this.mixindata.article_id = Number(this.mixindata.article_id)
                } else {
                    this.mixindata.article_id = ''
                }
            }


            this.saveBehaviorStatistics()
        },
        // 埋点Post请求
        saveBehaviorStatistics() {
            if (this.mixindata.openid) {
                this.$http.saveBehaviorStatistics(this.mixindata)
            }

        },

        setTitle(id) {
            if (!id) {
                return;
            }
            const data = tabdata.filter((res) => res.id == id);
            if (data.length > 0) {
                document.title = data[0].name;
            }
        },
    },
    created() {
        this.$nextTick(() => {
            this.setTitle(this.$route.params.id);
            // this.getcurrentPageData()
        })
    },
}