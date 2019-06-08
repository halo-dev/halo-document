module.exports = {
  title: 'Halo',
  description: 'Halo | ✍️ 一款现代化的个人独立博客系统',
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
    docsRepo: 'halo-dev/halo-document',
    editLinks: true,
    editLinkText: '帮助我们改善此页面',
    nav: [
      { text: '首 页', link: '/' },
      { text: '用户文档', link: '/docs/' },
      { text: '开发文档', link: '/develop/application/structure' },
      { text: '主题仓库', link: '/theme/' },
      { text: '社 区', link: 'https://bbs.halo.run' },
    ],
    sidebar: {
      '/docs/':[
        {
          title: '安装指南',
          collapsable: false,
          children: [
            'migrate-from-0.4.4',
            'install-with-centos',
            'install-with-docker',
            'reverse-proxy',
            'install-with-docker-compose',
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
        }
      ],
      '/develop/':[
        {
          title: '系统开发',
          collapsable: false,
          children: [
            'application/structure',
            'application/start',
          ],
        },
        {
          title: '主题开发',
          collapsable: false,
          children: [
            'theme/ready',
            'theme/config',
            'theme/global-variable',
            'theme/public-template',
            'theme/page-variable',
            'theme/custom-tag',
            'theme/model-variable',
            'theme/access-comment'
          ],
        }
      ]
    },
    lastUpdated: '最后更新于',
  },
}
