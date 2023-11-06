// @ts-ignore
import {hopeTheme} from "vuepress-theme-hope";
import {enNavbar, zhNavbar} from "./navbar";
import {enSidebar, zhSidebar} from "./sidebar";

export default hopeTheme({

    // 全局默认作者信息
    author: {
        // 作者名字
        name: "Yaien Blog",

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

    // 是否全局启用路径导航
    breadcrumb: false,

    // 是否在路径导航显示图标
    breadcrumbIcon: false,

    // 是否在桌面模式下显示打印按钮
    print: false,

    // 博客功能配置
    blog: {
        // 博主媒体展示
        medias: {
            // Email: "mailto:info@example.com",
            GitHub: "https://example.com",
            Gmail: "mailto:info@example.com",
            QQ: "2549597630",
            Wechat: "https://example.com",
        },

        // 剪裁头像为圆形的
        roundAvatar: true,

        // 文章列表中展示的文章信息
        articleInfo: ["Date", "Tag", "Original"],

        // 每页展示文章数量
        articlePerPage: 10,

    },

    // 国际化语言支持
    locales: {
        "/": {
            navbar: zhNavbar,
            sidebar: zhSidebar,
            footer: "<a style='color: #666;font-size: 13px;margin: 6px 0' href=\"https://beian.miit.gov.cn/\">桂ICP备2022011356号-1</a>",
            displayFooter: true,
            blog: {
                description: "披荆斩棘 勇往直前",
                intro: "/about/me.html",
            },
        },

        "/en/": {
            navbar: enNavbar,
            sidebar: enSidebar,
            footer: "<a href=\"https://beian.miit.gov.cn/\">桂ICP备2022011356号-1</a>",
            displayFooter: true,
            blog: {
                description: "A JAVA developer who wants to stand at the top of the industry pyramid",
                intro: "/en/intro.html",
            },
        },
    },

    // 插件配置
    plugins: {
        blog: {
            excerptLength: 0
        },
        mdEnhance: {
            card: true,
            gfm: true,
            figure: true,
            imgLazyload: true,
            playground: {
                presets: ["ts", "vue"],
            },
        },
        comment: {
            provider: "Giscus",
            repo: "yaien6530/blog-giscus",
            repoId: "R_kgDOJvOJXQ",
            category: "Announcements",
            categoryId: "DIC_kwDOJvOJXc4CXM6Q"
        },
        copyright: {
            global: true,
            author: "Yaien",
            license: "MIT"
        }
    }
}, {
    // 启用自定义
    custom: true
})
