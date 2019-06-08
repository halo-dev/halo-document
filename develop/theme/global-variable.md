# 全局变量

> 这些变量可以在页面的任意地方调用。

- 博客地址：\${context!}
- 主题根路径：\${static!}
- 博客标题：\${options.blog_title!}
- 博客关键字：\${options.seo_keywords!}
- 博客描述：\${options.seo_description!}
- 统计代码：${options.blog_statistics_code!}
- 页脚信息：${options.blog_footer_info!}
- Favicon：${options.blog_favicon!}
- Logo：${options.blog_logo!}
- 主题设置项：\${settings.[settings.yaml](/develop/theme/config.html#settings-yaml-items) 中各项的 name 值}