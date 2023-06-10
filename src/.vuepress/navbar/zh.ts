import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    "/",
    {
        text: "笔记",
        icon: "note",
        prefix: "/note/",
        children: [
            {text: "Java", icon: "java", link: "java/"},
            {text: "数据库", icon: "mysql", link: "db/"},
            {text: "开发框架", icon: "build", link: "framework/"},
            {text: "微服务", icon: "cache", link: "microservices/"},
            {text: "数据结构", icon: "material", link: "structure/"},
            {text: "算法", icon: "number", link: "algorithm/"},
            {text: "其他", icon: "regexp", link: "other/"},
        ]
    },
    {
        text: "分类",
        icon: "storage",
        children: [
            {text: "分类", icon: "type", link: "/category/"},
            {text: "标签", icon: "tag", link: "/tag/"},
            {text: "时间线", icon: "line", link: "/timeline/"},
        ]
    },
    {text: "随笔", icon: "edit", link: "/informal/"},
    {text: "书籍", icon: "study", link: "/books/"},
    {text: "教程", icon: "write", link: "/tutorial/"},
    {text: "关于我", icon: "people", link: "/intro.md"}
]);
