# 公共模板

> 为了减少重复代码，我们将某些常见的全局变量封装成了一个公共模板，我们只需要引入该模板，然后调用其中的宏模板即可。

```html
// 在模板中引入公共模板，需要注意的是，这个路径是固定的，不需要修改。
<#import "/common/macro/common_macro.ftl" as common>（已过时，version>=1.0.3 则不需要引入）
```

## 统计代码（已过时）

```html
<@common.statistics />

// 等同于
${options.blog_statistics_code!}
```

## 统计代码（version>=1.0.3）

```html
<@global.statistics />

// 等同于
${options.blog_statistics_code!}
```

## 页脚信息（已过时）

```html
<@common.footer_info />

// 等同于
${options.blog_footer_info!}
```

## 页脚信息（version>=1.0.3）

```html
<@global.footer_info />

// 等同于
${options.blog_footer_info!}
```

## Favicon（已过时）

```html
<@common.favicon />

// 等同于
<link rel="shortcut icon" type="images/x-icon" href="${options.blog_favicon!}">
```

## Favicon（version>=1.0.3）

```html
<@global.favicon />

// 等同于
<link rel="shortcut icon" type="images/x-icon" href="${options.blog_favicon!}">
```

## 站点验证代码（已废弃）

```html
<@common.verification />

// 等同于
<meta name="google-site-verification" content="${options.seo_verification_google}" />
<meta name="msvalidate.01" content="${options.seo_verification_bing}" />
<meta name="baidu-site-verification" content="${options.seo_verification_baidu}" />
<meta name="360-site-verification" content="${options.seo_verification_qihu}" />
```

## 相对时间（已过时）

```html
<@common.timeline datetime="时间" />

// 输出
x 年前/x 个月前/x 天前/昨天/x 小时前/x 分钟前/x 秒前/刚刚
```

## 相对时间（version>=1.0.3）

```html
<@global.timeline datetime="时间" />

// 输出
x 年前/x 个月前/x 天前/昨天/x 小时前/x 分钟前/x 秒前/刚刚
```

## 公共 head 标签（已过时）

```html
<@common.globalHeader />

// 等同于
<@common.favicon />
<@common.verification />
```

## 公共 head 标签（version>=1.0.3）

```html
<@global.head />

// 等同于
<#if options.seo_spider_disabled!false>
    <meta name="robots" content="none">
</#if>
<meta name="generator" content="Halo ${version!}"/>
<@global.custom_head />
<@global.favicon />
```

## 公共底部（已过时）

```html
<@common.globalFooter />

// 等同于
<@common.statistics />
<@common.footer_info />
```

## 公共底部（version>=1.0.3）

```html
<@global.footer />

// 等同于
<@global.statistics />
<@global.footer_info />
```

## 评论模块（version>=1.0.3）

```html
<@global.comment post= type="" />

// 等同于
<#if !post.disallowComment!false>
    <script src="//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"></script>
    <script src="//cdn.jsdelivr.net/gh/halo-dev/halo-comment@1.0.4/dist/halo-comment.min.js"></script>
    <halo-comment id="${post.id}" type="${type}"/>
</#if>
```

<div>
  <AdSense-Doc
  ad-client="ca-pub-5271828906478846"
  ad-slot="2656935500"
  ad-style="display:block; text-align:center;"
  ad-format="fluid"
  ></AdSense-Doc>
</div>