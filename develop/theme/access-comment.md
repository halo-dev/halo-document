# 接入评论
> 关于文章和页面的评论，我们提供了一个评论插件，也就是 [halo-comment](https://github.com/halo-dev/halo-comment)。只需要非常简单的步骤就可以让其接入到文章或页面。当然，你也可以使用 comment 相关的 api，自己开发评论模块。

我们推荐在主题目录新建一个 `comment.ftl`，然后只需要在文章或页面中引用即可，减少重复代码。

```html
<#macro comment post,type>
    <#if !post.disallowComment!false>
      <div class="comment-container">
        <script src="//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"></script>
        <script src="//cdn.jsdelivr.net/gh/halo-dev/halo-comment@1.0.0/dist/halo-comment.min.js"></script>
        <halo-comment id="${post.id}" type="${type}"/>
      </div>
    </#if>
</#macro>
```

::: tip 提示
可以对 `comment-container` 设置相应的样式，让其和主题样式融合的更好。
:::

引入方式，在 `post.ftl` 中：

```html
<#include "comment.ftl">
<@comment post=post type="post" />
```

在 `sheet.ftl` 中：

```html
<#include "comment.ftl">
<@comment post=sheet type="sheet" />
```