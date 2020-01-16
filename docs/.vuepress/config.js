const {
  description
} = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Halo',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,
  host: 'localhost',
  port: '8080',
  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['link', {
      rel: 'icon',
      href: '/halo.png'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#3eaf7c'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    ['meta', {
      name: 'google-site-verification',
      content: 'gRZYnaYWUQXWLvov-54i4W4-SdWlhwJt46uHU2q0eIs'
    }]
  ],
  siteConfig: {
    links: {
      github: 'https://github.com/halo-dev/halo',
    },
  },
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'halo-dev/halo',
    docsRepo: 'halo-dev/halo-document',
    editLinks: true,
    docsDir: '',
    editLinkText: '帮助我们改善此页面',
    lastUpdated: '最后更新于',
    nav: [{
        text: '首 页',
        link: '/'
      },
      {
        text: '用户文档',
        link: '/guide/'
      },
      {
        text: '开发文档',
        link: '/develop/application/structure'
      },
      {
        text: '主题仓库',
        link: '/theme/'
      }, {
        text: '资源下载',
        link: 'https://dl.halo.run'
      },
      {
        text: '社 区',
        link: 'https://bbs.halo.run'
      },
    ],
    sidebar: {
      '/guide/': [{
          title: '安装指南',
          collapsable: false,
          children: [
            'install/migrate-from-0.4.4',
            'install/install-with-linux',
            'install/install-with-docker',
            'install/reverse-proxy',
            'install/install-with-docker-compose',
          ],
        }, {
          title: '使用指南',
          collapsable: false,
          children: [
            'use/markdown',
            'use/after-installation',
          ],
        },
        {
          title: 'FAQ',
          collapsable: false,
          children: [
            'faq',
          ],
        },
        {
          title: '捐赠',
          collapsable: false,
          children: [
            'donate',
          ],
        }
      ],
      '/develop/': [{
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
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/nprogress',
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-110780416-2'
      }
    ]
  ]
}