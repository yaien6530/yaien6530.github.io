import {sidebar} from "vuepress-theme-hope";

export const enSidebar = sidebar({
    "/en/note/": [
        {
            text: "structure",
            prefix: "structure/",
            collapsible: true,
            children: "structure",
        },
        {
            text: "algorithm",
            prefix: "algorithm/",
            collapsible: true,
            children: "structure",
        },
        {
            text: "Java",
            prefix: "java/",
            collapsible: true,
            children: "structure",
        },
        {
            text: "MyBatis",
            prefix: "mybatis/",
            collapsible: true,
            children: "structure",
        },
        {
            text: "MySQL",
            prefix: "mysql/",
            collapsible: true,
            children: [
                {
                    text: "base",
                    prefix: "base/",
                    children: "structure"
                },
                {
                    text: "further",
                    prefix: "further/",
                    children: "structure"
                },
            ]
        },
        {
            text: "Nacos",
            prefix: "nacos/",
            collapsible: true,
            children: "structure",
        },
        {
            text: "Redis",
            prefix: "redis/",
            collapsible: true,
            children: "structure",
        },
        {
            text: "Spring",
            prefix: "spring/",
            collapsible: true,
            children: [
                {
                    text: "base",
                    prefix: "base/",
                    children: "structure"
                },
                {
                    text: "further",
                    prefix: "further/",
                    children: "structure"
                },
                {
                    text: "sourcecode",
                    prefix: "sourcecode/",
                    children: "structure"
                },
            ]
        },
        {
            text: "SpringBoot",
            prefix: "springboot/",
            collapsible: true,
            children: "structure",
        },
        {
            text: "SpringMVC",
            prefix: "springmvc/",
            collapsible: true,
            children: "structure",
        },
        {
            text: "other",
            prefix: "other/",
            collapsible: true,
            children: "structure",
        },
    ],
    "/en/tutorial/": "structure",
    "/en/books/": "structure",
    "/en/informal-essay/": "structure",
});
