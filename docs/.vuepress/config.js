import {defaultTheme, defineUserConfig} from 'vuepress'

export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: 'YAIEN',
    description: '这是我的第一个 VuePress 站点',
    dest:'/',
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
                link: '/docker/',
            },
            {
                text: 'BLOG',
                link: '/foo/',
            }
        ],
        repoLabel:'GITHUB',
        repo: 'https://github.com/yaien6530/yaien6530.github.io',
    })
})
