import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    "/",
    {text: "笔记", icon: "code", link: "/note/"},
    {
        text: "资源",
        icon: "code",
        prefix: "/resources",
        children: [
            {text: "书籍读物", link: "/books"},
            {text: "快速导航", link: "/navigation"}
        ]
    },
    {
        text: "关于",
        icon: "code",
        prefix: "/about",
        children: [
            {text: "我的简介", link: "/me"},
            {text: "我的朋友", link: "/friend"},
            {text: "更新内容", link: "/update"}
        ]
    }
]);
