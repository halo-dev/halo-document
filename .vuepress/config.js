module.exports = {
  title: 'Halo',
  description: 'Halo | ✍️ 可能是最好的 Java 博客系统',
  host: 'localhost',
  port: '4000',
  docsDir: 'docs',
  ga: 'UA-110780416-2',
  head: [
    ['link', { rel: 'icon', href: '/halo.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  siteConfig: {
    links: {
      github: 'https://github.com/halo-dev/halo',
    },
  },
  themeConfig: {
    repo: 'halo-dev/halo',
    editLinks: false,
    nav: [
      { text: '首 页', link: '/' },
      { text: '用户文档', link: '/docs/' },
      { text: '开发文档', link: '/develop/' },
      { text: '主题仓库', link: '/theme/' },
      { text: '社 区', link: 'https://bbs.halo.run' },
    ],
    sidebar: [
      {
        title: '安装指南',
        collapsable: false,
        children: [
          '/docs/migrate-from-0.4.4',
          '/docs/install-with-centos',
          '/docs/install-with-docker',
          '/docs/reverse-proxy',
          '/docs/install-with-docker-compose',
        ],
      },
      {
        title: 'FAQ',
        collapsable: false,
        children: [
          '/docs/faq',
        ],
      },
      {
        title: '捐赠',
        collapsable: false,
        children: [
          '/docs/donate',
        ],
      },
    ],
    lastUpdated: '最后更新于',
  },
}
