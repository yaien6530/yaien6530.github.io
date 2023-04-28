import {defaultTheme, defineUserConfig} from 'vuepress'

export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: 'YAIEN',
    description: '这是我的第一个 VuePress 站点',
    head: [['link', {rel: 'icon', href: '/images/vite.svg'}]],
    theme: defaultTheme({
        logo:'/images/vite.svg',
        navbar: [
            {
                text: 'HOME',
                link: '/',
            },
            {
                text: 'TAG',
                link: '/foo/',
            },
            {
                text: 'BLOG',
                link: '/foo/',
            }
        ]
    })
})
