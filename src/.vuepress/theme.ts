// @ts-ignore
import {hopeTheme} from "vuepress-theme-hope";
import {enNavbar, zhNavbar} from "./navbar";
import {enSidebar, zhSidebar} from "./sidebar";

export default hopeTheme({

    // 全局默认作者信息
    author: {

        // 作者名字
        name: "Yaien",

        // 作者网站
        url: "https://yanggl.cn",

        // 作者邮邮箱
        email: 'yaien_6530@163.com'
    },

    // 自定义排序
    sidebarSorter: ["readme", "order", "date", "filename"],

    // 站点图标
    favicon: "/logo.png",

    // 导航栏左侧logo
    logo: "/logo.png",

    // 深色模式支持
    darkmode: "toggle",

    // 字体图标资源链接
    iconAssets: "iconfont",

    // 向下滚动时自动隐藏导航栏
    navbarAutoHide: "always",

    // Github仓库链接
    repo: "https://github.com/yaien6530/yaien6530.github.io",

    // 页面是否显示编辑此页按钮
    editLink: false,

    breadcrumb: false,

    breadcrumbIcon: false,

    print: false,

    // 文档在仓库中的目录
    docsDir: "docs",

    // 博客功能配置
    blog: {
        // 博主媒体展示
        medias: {
            // Email: "mailto:info@example.com",
            // GitHub: "https://example.com",
            // Gmail: "mailto:info@example.com",
            // QQ: "2549597630",
            // Qzone: "https://example.com",
            // Reddit: "https://example.com",
            // Wechat: "https://example.com",
            // Weibo: "https://example.com",
        },

        // 博主头像
        // avatar: '/assets/images/avatar/avatar_3.png',

        // 剪裁头像为圆形的
        roundAvatar: true,

        // 文章列表中展示的文章信息
        articleInfo: ["Date", "Tag", "Original"],

        // 每页展示文章数量
        articlePerPage: 4
    },

    // 国际化语言支持
    locales: {
        "/": {
            // navbar
            navbar: zhNavbar,

            // sidebar
            sidebar: zhSidebar,

            footer: "<a href=\"https://beian.miit.gov.cn/\">桂ICP备2022011356号-1</a>",

            displayFooter: true,

            blog: {
                // 口号、座右铭或介绍语
                description: "披荆斩棘 勇往直前",
            },
        },

        "/en/": {
            navbar: enNavbar,

            sidebar: enSidebar,

            footer: "<a href=\"https://beian.miit.gov.cn/\">桂ICP备2022011356号-1</a>",

            displayFooter: true,

            blog: {
                // 口号、座右铭或介绍语
                description: "A JAVA developer who wants to stand at the top of the industry pyramid",
                // 个人介绍页地址
                intro: "/en/intro.html",
            },
        },
    },

    // 插件配置
    plugins: {
        blog: true,

        components: {
            // components: [
            //     "BiliBili",
            //     "CodePen",
            //     "FontIcon",
            //     "PDF",
            //     "Replit",
            //     "Share"
            // ],
            // componentOptions: {
            //     share: {
            //         services: [
            //             "qq",
            //             "email",
            //             "weibo"
            //         ],
            //     }
            // }
        },

        // all features are enabled for demo, only preserve features you need here
        mdEnhance: {
            align: true,
            attrs: true,
            chart: true,
            card: true,
            codetabs: true,
            demo: true,
            echarts: true,
            figure: true,
            flowchart: true,
            gfm: true,
            imgLazyload: true,
            imgSize: true,
            include: true,
            katex: true,
            mark: true,
            mermaid: true,
            playground: {
                presets: ["ts", "vue"],
            },
            sub: true,
            sup: true,
            tabs: true,
            vPre: true,
            vuePlayground: true,
        },

        // uncomment these if you want a PWA
        // pwa: {
        //   favicon: "/favicon.ico",
        //   cacheHTML: true,
        //   cachePic: true,
        //   appendBase: true,
        //   apple: {
        //     icon: "/assets/icon/apple-icon-152.png",
        //     statusBarColor: "black",
        //   },
        //   msTile: {
        //     image: "/assets/icon/ms-icon-144.png",
        //     color: "#ffffff",
        //   },
        //   manifest: {
        //     icons: [
        //       {
        //         src: "/assets/icon/chrome-mask-512.png",
        //         sizes: "512x512",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-mask-192.png",
        //         sizes: "192x192",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-512.png",
        //         sizes: "512x512",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-192.png",
        //         sizes: "192x192",
        //         type: "image/png",
        //       },
        //     ],
        //     shortcuts: [
        //       {
        //         name: "Demo",
        //         short_name: "Demo",
        //         url: "/demo/",
        //         icons: [
        //           {
        //             src: "/assets/icon/guide-maskable.png",
        //             sizes: "192x192",
        //             purpose: "maskable",
        //             type: "image/png",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // },
    }
}, {
    // 启用自定义
    custom: true
})
