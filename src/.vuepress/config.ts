import theme from "./theme.js";
import {getDirname, path} from "@vuepress/utils";
import {defineUserConfig,} from "vuepress";

// @ts-ignore
const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
    base: "/",

    locales: {
        "/": {
            lang: "zh-CN",
            title: "Yaien",
            description: "一位靓仔的博客",
        },
        "/en/": {
            lang: "en-US",
            title: "Yaien",
            description: "A pretty guy's blog",
        },
    },

    markdown: {
        code: {
            lineNumbers: 10,
        },
    },

    theme,

    alias: {
        "@theme-hope/modules/blog/components/BlogHero": path.resolve(
            __dirname,
            "./components/BlogHero.vue"
        ),
        // "@theme-hope/modules/blog/components/InfoPanel": path.resolve(
        //     __dirname,
        //     "./components/InfoPanel.vue"
        // ),
        // "@theme-hope/modules/blog/components/ArticleList": path.resolve(
        //     __dirname,
        //     "./components/InfoPanel.vue"
        // ),
    }

    // Enable it with pwa
    // shouldPrefetch: false,
});
