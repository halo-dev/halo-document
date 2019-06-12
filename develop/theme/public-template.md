# 公共模板

> 为了减少重复代码，我们将某些常见的全局变量封装成了一个公共模板，我们只需要引入该模板，然后调用其中的宏模板即可。

```html
// 在模板中引入公共模板，需要注意的是，这个路径是固定的，不需要修改。
<#import "/common/macro/common_macro.ftl" as common>
```

## 统计代码

```html
<@common.statistics />

// 等同于
${options.blog_statistics_code!}
```

## 页脚信息

```html
<@common.footer_info />

// 等同于
${options.blog_footer_info!}
```

## Favicon

```html
<@common.favicon />

// 等同于
<link rel="shortcut icon" type="images/x-icon" href="${options.blog_favicon!}">
```

## 站点验证代码

```html
<@common.verification />

// 等同于
<meta name="google-site-verification" content="${options.seo_verification_google}" />
<meta name="msvalidate.01" content="${options.seo_verification_bing}" />
<meta name="baidu-site-verification" content="${options.seo_verification_baidu}" />
<meta name="360-site-verification" content="${options.seo_verification_qihu}" />
```

## 相对时间

```html
<@common.timeline datetime="时间" />

// 输出
x 年前/x 个月前/x 天前/昨天/x 小时前/x 分钟前/x 秒前/刚刚
```

## 公共 head 标签

```html
<@common.globalHeader />

// 等同于
<@common.favicon />
<@common.verification />
```

## 公共底部

```html
<@common.globalFooter />

// 等同于
<@common.statistics />
<@common.footer_info />
```

<div>
  <AdSense-Doc
  ad-client="ca-pub-5271828906478846"
  ad-slot="2656935500"
  ad-style="display:block; text-align:center;"
  ad-format="fluid"
  ></AdSense-Doc>
</div>