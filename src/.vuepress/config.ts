import theme from "./theme.js";
import {getDirname, path} from "@vuepress/utils";
import {defineUserConfig,} from "vuepress";
import docSearchPlugin from "@vuepress/plugin-docsearch";

// @ts-ignore
const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
    base: "/",

    locales: {
        "/": {
            lang: "zh-CN",
            title: "Yaien Blog",
            description: "一位靓仔的博客",
        },
        "/en/": {
            lang: "en-US",
            title: "Yaien Blog",
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
    },

    plugins: [
        // docSearchPlugin({
        //     appId: "Q2K01RLYYB",
        //     apiKey: "d7d985865cfb20328bbd184fe8cd6ead",
        //     indexName: "yanggl1",
        //     locales: {
        //         "/": {
        //             placeholder: "搜索",
        //             translations: {
        //                 button: {
        //                     buttonText: "搜索",
        //                     buttonAriaLabel: "搜索",
        //                 },
        //                 modal: {
        //                     searchBox: {
        //                         resetButtonTitle: "清除查询条件",
        //                         resetButtonAriaLabel: "清除查询条件",
        //                         cancelButtonText: "取消",
        //                         cancelButtonAriaLabel: "取消",
        //                     },
        //                     startScreen: {
        //                         recentSearchesTitle: "搜索历史",
        //                         noRecentSearchesText: "没有搜索历史",
        //                         saveRecentSearchButtonTitle: "保存至搜索历史",
        //                         removeRecentSearchButtonTitle: "从搜索历史中移除",
        //                         favoriteSearchesTitle: "收藏",
        //                         removeFavoriteSearchButtonTitle: "从收藏中移除",
        //                     },
        //                     errorScreen: {
        //                         titleText: "无法获取结果",
        //                         helpText: "你可能需要检查你的网络连接",
        //                     },
        //                     footer: {
        //                         selectText: "选择",
        //                         navigateText: "切换",
        //                         closeText: "关闭",
        //                         searchByText: "搜索提供者",
        //                     },
        //                     noResultsScreen: {
        //                         noResultsText: "无法找到相关结果",
        //                         suggestedQueryText: "你可以尝试查询",
        //                         reportMissingResultsText: "你认为该查询应该有结果？",
        //                         reportMissingResultsLinkText: "点击反馈",
        //                     }
        //                 }
        //             }
        //         },
        //         "/en/": {
        //             placeholder: "Search Documentation",
        //             translations: {
        //                 button: {
        //                     buttonText: 'Search',
        //                     buttonAriaLabel: 'Search',
        //                 },
        //                 modal: {
        //                     searchBox: {
        //                         resetButtonTitle: 'Clear the query',
        //                         resetButtonAriaLabel: 'Clear the query',
        //                         cancelButtonText: 'Cancel',
        //                         cancelButtonAriaLabel: 'Cancel',
        //                     },
        //                     startScreen: {
        //                         recentSearchesTitle: 'Recent',
        //                         noRecentSearchesText: 'No recent searches',
        //                         saveRecentSearchButtonTitle: 'Save this search',
        //                         removeRecentSearchButtonTitle: 'Remove this search from history',
        //                         favoriteSearchesTitle: 'Favorite',
        //                         removeFavoriteSearchButtonTitle: 'Remove this search from favorites',
        //                     },
        //                     errorScreen: {
        //                         titleText: 'Unable to fetch results',
        //                         helpText: 'You might want to check your network connection.',
        //                     },
        //                     footer: {
        //                         selectText: 'to select',
        //                         selectKeyAriaLabel: 'Enter key',
        //                         navigateText: 'to navigate',
        //                         navigateUpKeyAriaLabel: 'Arrow up',
        //                         navigateDownKeyAriaLabel: 'Arrow down',
        //                         closeText: 'to close',
        //                         closeKeyAriaLabel: 'Escape key',
        //                         searchByText: 'Search by',
        //                     },
        //                     noResultsScreen: {
        //                         noResultsText: 'No results for',
        //                         suggestedQueryText: 'Try searching for',
        //                         reportMissingResultsText: 'Believe this query should return results?',
        //                         reportMissingResultsLinkText: 'Let us know.',
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // })
    ],

    shouldPrefetch: false,
});
