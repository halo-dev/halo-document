# 主题开发

> Halo 的模板引擎为 Freemarker，建议在开发 Halo 的主题之前，先看一遍 Freemarker 的相关文档：<http://freemarker.foofun.cn>。

## 搭建开发环境

> 假设你已经在本地电脑配置好了 Java 运行环境。

Halo 的运行可参考上述 [系统开发](#系统开发)，或者直接下载打包好的程序启动，如下步骤：

- 从 [Github release]() 下载最新的 Jar 包。
- 在终端中执行 `java -jar halo-版本号.jar --spring.profiles.active=dev`

启动完成之后，在电脑的用户目录即可看到 `halo-dev` 文件夹。

## 准备工作

1. 在 `halo-dev/templates/themes` 下新建一个文件夹，该文件夹就是你所新建的主题目录。
2. 使用你熟悉的编辑器打开你所新建的主题目录。

## 开发约定

- 主题目录下必须存在 `theme.yaml（主题描述文件）`，`settings.yaml（主题配置文件）`，相关格式在后面会详细讲解。
- 如果要开源到 Github 我们建议将仓库名设置为 `halo-theme-主题名`，并设置仓库的 `topic` 为 `halo` 和 `halo-theme`，这样可以方便使用者搜索。
- 所有模板文件的后缀为 `.ftl`。
- 主题目录需要以 `screenshot` 命名的预览图片，以供后台展示。

## 开发样板
> 为了让开发者更快速的上手主题的开发，我们提供了一个简单的开发样板以供参考。

仓库地址：<https://github.com/halo-dev/halo-theme-quick-starter>

## 目录结构
> 为了让开发更加规范，我们推荐使用以下的目录构建。

```bash
├── module                      // 公共模板目录
│   ├── comment.ftl             // 比如：评论模板
│   ├── layout.ftl              // 比如：布局模板
├── source                      // 静态资源目录
│   ├── css                     // 样式目录
│   ├── images                  // 图片目录
│   ├── js                      // JS 脚本目录
│   └── plugins                 // 前端库目录
├── index.ftl                   // 首页
├── post.ftl                    // 文章页
├── sheet.ftl                   // 自定义页面
├── archives.ftl                // 归档页
├── categories.ftl              // 分类目录页
├── category.ftl                // 单个分类的所属文章页
├── tags.ftl                    // 标签页面
├── tag.ftl                     // 单个标签的所属文章页
├── search.ftl                  // 搜索结果页
├── links.ftl                   // 内置页面：友情链接
├── photos.ftl                  // 内置页面：图库
├── journals.ftl                // 内置页面：日志
├── 404.ftl                     // 404 页
├── 500.ftl                     // 500 页 
├── README.md                   // README，一般用于主题介绍或说明
├── screenshot.png              // 主题预览图
├── settings.yaml               // 主题选项配置文件
└── theme.yaml                  // 主题描述文件
```

## 配置文件

> Halo 的主题模块使用 yaml 来对主题进行配置，`theme.yaml` 里面主要描述主题的名称，开发者的信息，开源地址等等。`settings.yaml` 包含了主题所有的配置选项，需要注意的是，这些选项仅仅是用于构建配置表单，并不起到对主题的配置作用。

### theme.yaml

```yaml
id: 主题id，唯一，不能与其他主题一样。我们建议设置为 `作者名_主题名称`
name: 主题名称
author:
  name: 作者名称
  website: 作者网址
description: 主题描述
logo: 主题 Logo 地址
website: 主题地址
repo: 主题开源地址
version: 版本号
```

<details>
<summary>theme.yaml 实例</summary>

```yaml
id: caicai_anatole
name: Anatole
author:
  name: Caicai
  website: https://www.caicai.me
description: A other Halo theme
logo: https://avatars1.githubusercontent.com/u/1811819?s=460&v=4
website: https://github.com/halo-dev/halo-theme-anatole
repo: https://github.com/halo-dev/halo-theme-anatole
version: 1.0
```
</details>

### settings.yaml

```yaml
# Tab 节点
group1:
  label: 第一个 Tab 名称
  # 表单项
  items:
    # 省略
group2:
  label: 第二个 Tab 名称
  # 表单项
  items:
    # 省略
```

### settings.yaml#items

> settings.yaml 的 items 下即为所有表单元素，所支持的表单元素如下

```yaml
items:
    # 普通文本框
    item1:                      // 表单项的根节点，一般和 name 同名
      name: item1               // 表单项的 name 属性，将存于数据库中，对应该表单元素的值。
      label: item1              // 表单项的 label
      type: text                // 表单项类型：普通文本框
      default: ''               // 默认值
      placeholder: ''           // 表单项的 placeholder，一般给用户提示

    # 多行文本框
    item2:                      // 同上
      name: item2               // 同上
      label: item2              // 同上
      type: textarea            // 表单项类型：多行文本框
      default: ''               // 同上
      placeholder: ''           // 同上

    # 单选框
    item3:                      // 同上
      name: item3               // 同上
      label: item3              // 同上
      type: radio               // 表单项类型：单选框
      data-type: bool           // 数据类型：bool，string，long，double
      default: value1           // 同上
      options:                  // 选项
        - value: value1         // 值
          label: label1         // 说明
        - value: value2
          label: label2

    # 下拉框
    item4:                      // 同上
      name: item4               // 同上
      label: item4              // 同上
      type: select              // 表单项类型：下拉框
      data-type: bool           // 数据类型：bool，string，long，double
      default: value1           // 同上
      options:                  // 选项
        - value: value1         // 值
          label: label1         // 说明
        - value: value2
          label: label2
```

settings.yaml 实例：参考 <https://github.com/halo-dev/halo-theme-material/blob/master/settings.yaml>。

## 全局变量

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
- 主题设置项：\${settings.[settings.yaml](#settings-yaml-items) 中各项的 name 值}

## 公共模板

> 为了减少重复代码，我们将某些常见的全局变量封装成了一个公共模板，我们只需要引入该模板，然后调用其中的宏模板即可。

```html
// 在模板中引入公共模板，需要注意的是，这个路径是固定的，不需要修改。
<#import "/common/macro/common_macro.ftl" as common>
```

### 统计代码

```html
<@common.statistics />

// 等同于
${options.blog_statistics_code!}
```

### 页脚信息

```html
<@common.footer_info />

// 等同于
${options.blog_footer_info!}
```

### Favicon

```html
<@common.favicon />

// 等同于
<link rel="shortcut icon" type="images/x-icon" href="${options.blog_favicon!}">
```

### 站点验证代码

```html
<@common.verification />

// 等同于
<meta name="google-site-verification" content="${options.seo_verification_google}" />
<meta name="msvalidate.01" content="${options.seo_verification_bing}" />
<meta name="baidu-site-verification" content="${options.seo_verification_baidu}" />
<meta name="360-site-verification" content="${options.seo_verification_qihu}" />
```

### 相对时间

```html
<@common.timeline datetime="时间" />

// 输出
x 年前/x 个月前/x 天前/昨天/x 小时前/x 分钟前/x 秒前/刚刚
```

### 公共 head 标签

```html
<@common.globalHeader />

// 等同于
<@common.favicon />
<@common.verification />
```

### 公共底部

```html
<@common.globalFooter />

// 等同于
<@common.statistics />
<@common.footer_info />
```

## 页面变量

### index.ftl

### post.ftl

### archives.ftl

### sheet.ftl

### photos.ftl

### links.ftl

### journals.ftl

### categories.ftl

### category.ftl

### tags.ftl

### tag.ftl

### search.ftl

## 自定义标签

> 自定义标签可以在页面的任意地方调用。

### postTag（文章）

#### 获取最新文章：

```html
<@postTag method="latest" top="条数">
// 返回参数：posts
</@postTag>
```

<details>
<summary>实例</summary>

```html
<@postTag method="latest" top="3">
    <#list posts as post>
        <a href="${context}/archives/${post.url!}">${post.title!}</a>
    </#list>
</@postTag>

// 输出
<a href="http://localhost:8090/archives/url1">title1</a>
<a href="http://localhost:8090/archives/url2">title2</a>
<a href="http://localhost:8090/archives/url3">title3</a>
```

</details>

#### 获取所有文章条数

```html
<@postTag method="count">
// 返回参数：count
</@postTag>
```

<details>
<summary>实例</summary>

```html
<@postTag method="count">
文章数量：${count!0}
</@postTag>

// 输出
文章数量：20
```

</details>

#### 根据年份归档

```html
<@postTag method="archiveYear">
// 返回参数：archives
</@postTag>
```

<details>
<summary>实例</summary>

```html
<@postTag method="archiveYear">
  <#list archives as archive>
      <h1>年份： ${archive.year?c}</h1>
      <ul>
          <#list archive.posts?sort_by("createTime")?reverse as post>
            <li>
              <a href="${context!}/archives/${post.url!}">${post.title!}</a>
            </li>
          </#list>
      </ul>
  </#list>
</@postTag>

// 输出
<h1>2019</h1>
<ul>
  <li>
    <a href="http://localhost:8090/archives/url1">title1</a>
  </li>
  <li>
    <a href="http://localhost:8090/archives/url2">title2</a>
  </li>
</ul>
<h1>2018</h1>
<ul>
  <li>
    <a href="http://localhost:8090/archives/url3">title3</a>
  </li>
  <li>
    <a href="http://localhost:8090/archives/url4">title4</a>
  </li>
</ul>
```
</details>

#### 根据年月归档

```html
<@postTag method="archiveMonth">
// 返回参数：archives
</@postTag>
```

<details>
<summary>实例</summary>

```html
<@postTag method="archiveYear">
  <#list archives as archive>
      <h1>${archive.year?c}-${archive.month?c}</h1>
      <ul>
          <#list archive.posts?sort_by("createTime")?reverse as post>
            <li>
              <a href="${context!}/archives/${post.url!}">${post.title!}</a>
            </li>
          </#list>
      </ul>
  </#list>
</@postTag>

// 输出
<h1>2019-01</h1>
<ul>
  <li>
    <a href="http://localhost:8090/archives/url1">title1</a>
  </li>
  <li>
    <a href="http://localhost:8090/archives/url2">title2</a>
  </li>
</ul>
<h1>2018-12</h1>
<ul>
  <li>
    <a href="http://localhost:8090/archives/url3">title3</a>
  </li>
  <li>
    <a href="http://localhost:8090/archives/url3">title4</a>
  </li>
</ul>
```
</details>

#### 根据分类 id 查询文章

```html
<@postTag method="listByCategoryId" categoryId="分类 id">
// 返回参数：posts
</@postTag>
```

#### 根据标签 id 查询文章

```html
<@postTag method="listByTagId" categoryId="标签 id">
// 返回参数：posts
</@postTag>
```

### commentTag（评论）

#### 获取最新评论：

```html
<@commentTag method="latest" top="条数">
// 返回参数：comments
</@commentTag>
```

<details>
<summary>实例</summary>

```html
<@commentTag method="latest" top="3">
    <#list comments as comment>
        ${comment.author!}：${comment.content!}
    </#list>
</@commentTag>

// 输出
Author1：写的不错
Author2：真的真好
Author3：继续加油
```

</details>

#### 获取所有评论条数

```html
<@commentTag method="count">
// 返回参数：count
</@commentTag>
```

<details>
<summary>实例</summary>

```html
<@commentTag method="count">
评论数量：${count!0}
</@commentTag>

// 输出
评论数量：20
```

</details>

### menuTag（菜单）

#### 获取所有菜单

```html
<@menuTag method="list">
// 返回参数：menus
</@menuTag>
```

<details>
<summary>实例</summary>

```html
<@menuTag method="list">
  <ul>
    <#list menus as menu>
      <li>
        <a href="${menu.url!}">${menu.name!}</a>
      </li>
    </#list>
  </ul>
</@menuTag>

// 输出
<ul>
  <li>
    <a href="/">首页</a>
  </li>
  <li>
    <a href="/archives">归档</a>
  </li>
</ul>
```

</details>

#### 获取多级菜单列表

```html
<@menuTag method="tree">
// 返回参数：menus
</@menuTag>
```

<details>
<summary>实例</summary>

```html
<@menuTag method="tree">
  <ul>
    <#list menus as menu>
      <li>
        <a href="${menu.url!}">${menu.name!}</a>
        <#if menu.children?? && menu.children?size gt 0>
            <ul>
              <#list menu.children as child>
                <li>
                  <a href="${child.url!}">${child.name!}</a>
                </li>
              </#list>
            </ul>
        </#if>
      </li>
    </#list>
  </ul>
</@menuTag>

// 输出
<ul>
  <li>
    <a href="/">首页</a>
  </li>
  <li>
    <a href="/archives">归档</a>
    <ul>
        <li>
          <a href="/categories/study">学习笔记</a>
        </li>
        <li>
          <a href="/categories/java">Java</a>
        </li>
    </ul>
  </li>
</ul>
```

</details>


### categoryTag（分类）

#### 获取所有分类

```html
<@categoryTag method="list">
// 返回参数：categories
</@categoryTag>
```

<details>
<summary>实例</summary>

```html
<@categoryTag method="list">
  <#list categories as category>
    <a href="${context!}/categories/${category.slugName!}">${category.name}</a>
  </#list>
</@categoryTag>

// 输出
<a href="http://localhost:8090/categories/url1">name1</a>
<a href="http://localhost:8090/categories/url2">name2</a>
```

</details>

#### 根据文章 id 获取分类

```html
<@categoryTag method="listByPostId" postId="文章 id">
// 返回参数：categories
</@categoryTag>
```

<details>
<summary>实例</summary>

```html
<@categoryTag method="listByPostId" postId="1">
  <#list categories as category>
    <a href="${context!}/categories/${category.slugName!}">${category.name}</a>
  </#list>
</@categoryTag>

// 输出
<a href="http://localhost:8090/categories/url1">name1</a>
<a href="http://localhost:8090/categories/url2">name2</a>
```

</details>

#### 获取所有分类条数

```html
<@categoryTag method="count">
// 返回参数：count
</@categoryTag>
```

<details>
<summary>实例</summary>

```html
<@categoryTag method="count">
分类数量：${count!0}
</@categoryTag>

// 输出
分类数量：20
```

</details>

### tagTag（标签）

#### 获取所有标签

```html
<@tagTag method="list">
// 返回参数：tags
</@tagTag>
```

<details>
<summary>实例</summary>

```html
<@tagTag method="list">
  <#list tags as tag>
    <a href="${context!}/tags/${tag.slugName!}">${tag.name}</a>
  </#list>
</@tagTag>

// 输出
<a href="http://localhost:8090/tags/url1">name1</a>
<a href="http://localhost:8090/tags/url2">name2</a>
```

</details>

#### 根据文章 id 获取标签

```html
<@tagTag method="listByPostId" postId="文章 id">
// 返回参数：tags
</@tagTag>
```

<details>
<summary>实例</summary>

```html
<@tagTag method="listByPostId" postId="1">
  <#list tags as tag>
    <a href="${context!}/tags/${tag.slugName!}">${tag.name}</a>
  </#list>
</@tagTag>

// 输出
<a href="http://localhost:8090/tags/url1">name1</a>
<a href="http://localhost:8090/tags/url2">name2</a>
```

</details>

#### 获取所有标签条数

```html
<@tagTag method="count">
// 返回参数：count
</@tagTag>
```

<details>
<summary>实例</summary>

```html
<@tagTag method="count">
标签数量：${count!0}
</@tagTag>

// 输出
标签数量：20
```

</details>

### photoTag（图库）

#### 获取所有图片

```html
<@photoTag method="list">
// 返回参数：photos
</@photoTag>
```

<details>
<summary>实例</summary>

```html
<@photoTag method="list">
  <#list photos as photo>
    <img href="${photo.url}" />
  </#list>
</@photoTag>

// 输出
<img href="http://localhost:8090/upload/2019/1/1.png" />
<img href="http://localhost:8090/upload/2019/1/2.png" />
```

</details>

#### 获取图片组
```html
<@photoTag method="listTeams">
// 返回参数：teams
</@photoTag>
```

<details>
<summary>实例</summary>

```html
<@photoTag method="listTeams">
  <#list teams as item>
    <h1>${item.team}</h1>
    <#list item.photos as photo>
      <img href="${photo.url}" />
    </#list>
  </#list>
</@photoTag>

// 输出
<h1>风景</h1>
<img href="http://localhost:8090/upload/2019/1/1.png" />
<img href="http://localhost:8090/upload/2019/1/2.png" />
<h1>旅游</h1>
<img href="http://localhost:8090/upload/2019/1/3.png" />
<img href="http://localhost:8090/upload/2019/1/4.png" />
```

</details>

#### 根据分组获取图片
```html
<@photoTag method="listByTeam" team="分组名称">
// 返回参数：photos
</@photoTag>
```

<details>
<summary>实例</summary>

```html
<@photoTag method="listByTeam" team="风景">
  <#list photos as photo>
    <img href="${photo.url}" />
  </#list>
</@photoTag>

// 输出
<img href="http://localhost:8090/upload/2019/1/1.png" />
<img href="http://localhost:8090/upload/2019/1/2.png" />
```

</details>

#### 获取所有图片条数

```html
<@photoTag method="count">
// 返回参数：count
</@photoTag>
```

<details>
<summary>实例</summary>

```html
<@photoTag method="count">
图片数量：${count!0}
</@photoTag>

// 输出
图片数量：20
```

</details>

### linkTag（友情链接）

#### 获取所有友情链接

```html
<@linkTag method="list">
// 返回参数：links
</@linkTag>
```

<details>
<summary>实例</summary>

```html
<@linkTag method="list">
  <#list links as link>
    <a href="${link.url!}">${link.name!}</a>
  </#list>
</@linkTag>

// 输出
<a href="url1">name1</a>
<a href="url1">name2</a>
```

</details>

#### 获取友情链接组
```html
<@linkTag method="listTeams">
// 返回参数：teams
</@linkTag>
```

<details>
<summary>实例</summary>

```html
<@linkTag method="listTeams">
  <#list teams as item>
    <h1>${item.team}</h1>
    <#list item.links as link>
      <a href="${link.url!}">${link.name!}</a>
    </#list>
  </#list>
</@linkTag>

// 输出
<h1>好友</h1>
<a href="url1">name1</a>
<a href="url1">name2</a>
<h1>网友</h1>
<a href="url3">name3</a>
<a href="url4">name4</a>
```

</details>

#### 获取所有友情链接条数

```html
<@linkTag method="count">
// 返回参数：count
</@linkTag>
```

<details>
<summary>实例</summary>

```html
<@linkTag method="count">
友情链接数量：${count!0}
</@linkTag>

// 输出
友情链接数量：20
```

</details>

## 接入评论
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