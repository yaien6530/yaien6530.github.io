import {sidebar} from "vuepress-theme-hope";

export const zhSidebar = sidebar({
    "/note/": [
        {
            text: "数据结构",
            link: "structure/"
        },
        {
            text: "算法",
            link: "algorithm/"
        },
        {
            text: "网络编程",
            link: "net/",
        },
        {
            text: "JAVA",
            link: "java/",
        },
        {
            text: "数据库",
            link: "db/",
        },
        {
            text: "微服务",
            link: "microservices/",
        },
        {
            text: "开发框架",
            link: "framework/",
        },
        {
            text: "其他",
            link: "other/",
        },
    ],
    "/note/java/": [
        {
            text: "Jvm",
            prefix: "jvm/",
            children: "structure",
            collapsible: true
        },
        {
            text: "并发编程",
            prefix: "concurrency/",
            children: "structure",
            collapsible: true
        },
    ],
    "/note/db/": [
        {
            text: "MongoDB",
            prefix: "mongodb/",
            children: "structure",
            collapsible: true
        },
        {
            text: "MySQL",
            prefix: "mysql/",
            children: "structure",
            collapsible: true
        },
        {
            text: "Redis",
            prefix: "redis/",
            children: "structure",
            collapsible: true
        },
    ],
    "/note/microservices/": [
        {
            text: "Dubbo",
            prefix: "dubbo/",
            children: "structure",
            collapsible: true
        },
        {
            text: "ES",
            prefix: "elasticsearch/",
            children: "structure",
            collapsible: true
        },
        {
            text: "Gateway",
            prefix: "gateway/",
            children: "structure",
            collapsible: true
        },
        {
            text: "Kafka",
            prefix: "kafka/",
            children: "structure",
            collapsible: true
        },
        {
            text: "Nacos",
            prefix: "nacos/",
            children: "structure",
            collapsible: true
        },
        {
            text: "Rabbitmq",
            prefix: "rabbitmq/",
            children: "structure",
            collapsible: true
        },
        {
            text: "Rocketmq",
            prefix: "rocketmq/",
            children: "structure",
            collapsible: true
        },
        {
            text: "Seata",
            prefix: "seata/",
            children: "structure",
            collapsible: true
        },
        {
            text: "Security",
            prefix: "security/",
            children: "structure",
            collapsible: true
        },
        {
            text: "Sentinel",
            prefix: "sentinel/",
            children: "structure",
            collapsible: true
        },
        {
            text: "SkyWalking",
            prefix: "skywalking/",
            children: "structure",
            collapsible: true
        },
        {
            text: "Zookeeper",
            prefix: "zookeeper/",
            children: "structure",
            collapsible: true
        },
    ],
    "/note/framework/": [
        {
            text: "Spring",
            prefix: "spring/",
            children: "structure",
            collapsible: true
        },
        {
            text: "Spring Boot",
            prefix: "springboot/",
            children: "structure",
            collapsible: true
        },
        {
            text: "Spring MVC",
            prefix: "springmvc/",
            children: "structure",
            collapsible: true
        },
    ],
    "/note/structure/": "structure",
    "/note/algorithm/": "structure",
    "/note/net/": "structure",
    "/note/other/": "structure",
    "/informal-essay/": "structure",
});
