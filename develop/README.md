# 系统开发

## 系统结构

[Halo](https://github.com/halo-dev/halo) 博客系统分为以下四个部分：

| 项目名称                                                 | 简介                                                                                                                   |
| :------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| [halo](https://github.com/halo-dev/halo)                 | 提供整个系统的服务，采用 [Spring Boot](https://spring.io/) 开发                                                        |
| [halo-admin](https://github.com/halo-dev/halo-admin)     | 负责后台管理的渲染，采用 [Vue](https://vuejs.org/) 开发，理论上可以部署在任何地方                                      |
| [halo-comment](https://github.com/halo-dev/halo-comment) | 评论插件，采用 [Vue](https://vuejs.org/) 开发，在主题中运行方式引入构建好的 `Javascript` 文件即可                      |
| [halo-theme-\*](https://github.com/halo-dev)             | 主题项目集，采用 [Freemarker](https://freemarker.apache.org/) 模板引擎编写，需要包含一些特殊的配置才能够被 halo 所使用 |

### 工作目录

默认配置下，`Halo` 是工作在 `~/.halo` 目录下的。在`开发环境`下，默认的`工作目录`是 `~/halo-dev`，在`测试环境`下，默认的工作目录是 `~/halo-test`。

### 目录结构

```txt
├── application.yaml    // 用户自定义配置文件，默认是不存在的
├── db                  // H2 Database 数据库文件，可能还会有 halo.trace.db
│   ├── halo.mv.db
├── logs                // 日志目录
│   ├── spring.log
├── templates
│   └── themes          // Halo 主题目录
│       ├── anatole
└── upload              // 通过本地上传的文件所在目录
```

### 自定义配置

> 为什么要提前讲自定义配置呢？是因为在这里让大家了解到 `Halo` 的`配置方式`，以及`配置优先级`，不至于未来运行项目的时候不知道如何优雅地修改配置。

`Halo` 配置目录优先级如下（从上到下优先级越来越小，上层的配置将会覆盖下层）:

- `Halo` 自定义配置
  - file:~/.halo/
  - file:~/.halo-dev/
- `Spring Boot` 默认配置
  - file:./config/
  - file:./
  - classpath:/config/
  - classpath:/

> 参考: [Application Property Files](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html#boot-features-external-config-application-property-files)

在开发的时候，希望大家能够在 `~/halo-dev/application.yml` 中进行添加自定义配置。当然后面也会讲到如何用`运行参数` 和 `VM options` 进行控制配置，届时可根据具体情况进行选择。

::: tip 注意
开发的时候，我们不建议直接更改`项目源码`中的所包含的`配置文件`，包括 `application.yml`、`application-dev.yml`、`application-test.yml` 和 `application-user.yml`。
:::

## 系统开发

### 所需要的环境

1. IDE：[IntelliJ IDEA](https://www.jetbrains.com/idea/download/) 或者 [STS](https://spring.io/tools)（Spring Tools Suite）
2. 工具：[Gradle](https://gradle.org/)，[Lombok](https://projectlombok.org/) 插件
3. JDK：`1.8+`

::: tip 推荐 IntelliJ IDEA 社区版（开源免费）
<https://github.com/JetBrains/intellij-community>
:::

::: tip 注意
`Halo` 项目使用了 `Lombok`，运行 `Halo` 之前请检查 `IDE` 是否已经安装好了 `Lombok` 插件。

如果使用的 `IDE` 是 `IntelliJ IDEA`，请在设置中启用 `Build, Execution, Deployment/Annotation Processors` 的 `Enable annotation processing`。

如果仍然因为 `Lombok` 报错，请更新 `IntelliJ IDEA` 至最新版。
:::

### 克隆项目（Optional）

如果你已经 `fork` 了 [`Halo`](https://github.com/halo-dev/halo)，请将以下命令中的 `halo-dev` 替换为你的 `Github 用户名`。

```bash
git clone https://github.com/halo-dev/halo

// 如果你在 Github 上已经添加了你的 ssh key，请使用以下命令进行 clone：
git clone git@github.com:halo-dev/halo.git
```

::: tip 推荐
这里推荐使用第二种方式进行克隆，这样每次提交代码的时候，就不会提示登录 `Github` 了。
:::

### 导入项目

导入项目的时候请选择 `Gradle 项目`进行导入。

> `IntelliJ IDEA` 在导入项目的时候请勾选 `auto import`，推荐使用 `gradle wrapper`。

### 运行方式

`Halo` 运行方式总体来讲有以下两种：

#### 直接运行 `Application` 主类（配合 IDE 运行）

如果需要指定配置，请在 `Run/Debug Configuration` 内进行设置 `VM options`（这里推荐采用上文的[自定义配置](#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%85%8D%E7%BD%AE)），例如：

```ini
-Dspring.profiles.active=dev
-Dhalo.auth-enabled=false
-Dhalo.production-env=false
```

#### 采用 `gradle bootRun task` 运行（不需要 IDE）

在项目根目录下运行以下命令：

```bash
# 类 Unix 用户
./gradlew bootRun

# Windows 用户
./gradlew.bat bootRun
```

如果需要手动指定配置，可添加 `--args` 参数（这里推荐采用上文的[自定义配置](#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%85%8D%E7%BD%AE)），例如：

```bash
# 类 Unix 用户
./gradlew bootRun --args="--spring.profiles.active=dev --server.port=2333"

# Windows 用户
./gradlew.bat bootRun --args="--spring.profiles.active=dev --server.port=2333"
```

如果一切正常且没有额外指定配置，则可根据控制台的输出链接进行访问 `Halo`：

```java
2019-06-06 16:20:52.285  INFO 1330 --- [  restartedMain] run.halo.app.listener.StartedListener    : Halo started at         http://127.0.0.1:8090
2019-06-06 16:20:52.285  INFO 1330 --- [  restartedMain] run.halo.app.listener.StartedListener    : Halo admin started at   http://127.0.0.1:8090/admin
2019-06-06 16:20:52.285 DEBUG 1330 --- [  restartedMain] run.halo.app.listener.StartedListener    : Halo doc was enable at  http://127.0.0.1:8090/swagger-ui.html # 仅在开发环境才会输出
```

::: tip 提示
首次运行的时候，会跳转到博客安装页面，请大家耐心填写完毕，最后正式进入`开发之旅`。

这里推荐一个配置：

| key    | value         |
| :----- | :------------ |
| 用户名 | test          |
| 昵称   | test          |
| 邮箱   | test@test.com |
| 密码   | opentest      |

:::

---

### 高级配置

#### 调整启动参数（VMoptions）

运行命令中添加 `VM options`，例如：

```ini
-Dspring.profiles.active=dev
```

#### 调整启动参数（args）

运行命令中添加参数，例如：

```ini
--spring.profiles.active=dev
```

::: tip 提示
`IDE` 一般都会提供一个 `Run/Debug 配置`，可以添加 `VM options` 和 `参数`。以上示例可以直接应用在以`命令运行`方式上。
:::

#### 启用自动构建（Build project automatically）

在开发环境下，修改代码之后，每次都需要重启应用，是一个非常耗时的操作。

有一个专门解决这个问题的工具，那就是 [JRebel](https://jrebel.com/)，但是它的费用实在是太昂贵，作为普通的开发者很难承受这笔费用（但**不推荐**使用破解版）。

于是 `Halo` 最后采用了 `Spring Boot` 官方推荐的 [Developer Tools](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html)。

这里以 `IntelliJ IDEA` 为例。

1. 进入 `Settings` (Preferences on macOS)。
2. 打开 `Build, Execution, Deployment > Compiler`. 启用 `Build project automatically`。
3. 点击 `应用`。
4. 按 `Ctrl+Shift+A` (Cmd+Shift+A on macOS)快捷键，然后搜索 `Registry`。打开之后找到 `compiler.automake.allow.when.app.running`，并启用它 (IntelliJ IDEA 15 and newer)。

> 来源于 <https://zeroturnaround.com/software/jrebel/quickstart/intellij/enable-automatic-compilation-in-intellij-idea/>

::: tip Developer Tools 原理
在保存代码的时候，`IDE` 会自动为我们编译代码，`Developer Tools` 检测到代码的 `class 文件`（只能检测 `classpath` 下的 `class 文件`）的变更，会自动重启项目。注意，这里的重启速度会有质的提升，具体原因是 `Spring Boot` 提供的 `restart 技术`提供了两个 `classloaders`：`base classloader` 和 `restart classloader`。当项目重启的时候 `restart classloader` 将会被抛弃，并重启创建一个，这比 `code starts`（冷启动）快很多。当然，肯定是比不上 `JRebel` 采用的 `Reload 技术`。

更多细节请查阅: [Automatic Restart](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html#using-boot-devtools-restart)
:::

## 主题开发

> `Halo` 的模板引擎为 [Freemarker](https://freemarker.apache.org/)。在开发 `Halo` 的主题之前，建议先看一遍 `Freemarker` 的相关文档：<http://freemarker.foofun.cn> 或 <https://freemarker.apache.org/>。

### 搭建开发环境

> 假设你已经在本地电脑配置好了 `Java` 运行环境（`JRE`）。

`Halo` 的运行可参考上述 [系统开发](#系统开发)，或者直接下载打包好的程序启动，如下步骤：

1. 从 [Github release](https://github.com/halo-dev/halo/releases) 下载最新的 `jar` 包
2. 在终端中执行：

```bash
java -jar halo-版本号.jar --spring.profiles.active=dev
```

启动完成之后，在电脑的用户目录下即可看到 `halo-dev` 文件夹。

### 准备工作

1. 在 `halo-dev/templates/themes` 下新建一个文件夹，该文件夹就是你所新建的主题目录。
2. 使用你熟悉的编辑器打开你所新建的主题目录。

### 开发约定

- 主题目录下必须存在 `theme.yaml（主题描述文件）`，`settings.yaml（主题配置文件）`，相关格式在后面会详细讲解。
- 如果要开源到 Github 我们建议将仓库名设置为 `halo-theme-主题名`，并设置仓库的 `topic` 为 `halo` 和 `halo-theme`，这样可以方便使用者搜索。
- 所有模板文件的后缀为 `.ftl`。
- 主题目录需要以 `screenshot` 命名的预览图片，以供后台展示。

### 开发样板

为了让开发者更快速的上手主题的开发，我们提供了一个简单的[开发样板](https://github.com/halo-dev/halo-theme-quick-starter)以供参考。

### 目录结构

为了让开发更加规范，我们推荐使用以下的目录结构：

```txt
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

### 配置文件

`Halo` 的主题模块使用 [yaml](https://yaml.org/) 文件来对主题进行配置。

`theme.yaml`（或 `theme.yml`）里面主要描述主题的名称，开发者的信息，开源地址等等。

`settings.yaml`（或 `settings.yml`）包含了主题所有的配置选项。值得注意的是，这些选项仅仅是用于构建配置表单，并不会对主题的配置起作用。

#### theme.yaml

```yaml
id: 主题id，唯一，不能与其他主题一样。我们建议设置为 `作者名_主题名称`
name: 主题名称
author:
  name: 作者名称
  website: 作者网址
description: 主题描述
logo: 主题 Logo 地址
website: 主题预览地址
repo: 主题仓库地址，如项目的 Github 地址
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

#### settings.yaml

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

#### settings.yaml#items

`settings.yaml` 的 `items` 下即为所有表单元素，所支持的表单元素如下

```yaml
items:
    # 普通文本框
    - name: item1               // 表单项的 name 属性，将存于数据库中，对应该表单元素的值。
      label: item1              // 表单项的 label
      type: text                // 表单项类型：普通文本框
      default: ''               // 默认值
      placeholder: ''           // 表单项的 placeholder，一般给用户提示

    # 多行文本框
    - name: item2               // 同上
      label: item2              // 同上
      type: textarea            // 表单项类型：多行文本框
      default: ''               // 同上
      placeholder: ''           // 同上

    # 单选框
    - name: item3               // 同上
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
    - name: item4               // 同上
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

<details>
  <summary>
    settings.yaml 实例
  </summary>

<https://github.com/halo-dev/halo-theme-material/blob/master/settings.yaml>

</details>

### 全局变量

这些变量可以在页面的任意地方调用。

1. 博客地址：`${context!}`
2. 主题根路径：`${static!}`
3. 博客标题：`${options.blog_title!}`
4. 博客关键字：`${options.seo_keywords!}`
5. 博客描述：`${options.seo_description!}`
6. 统计代码：`${options.blog_statistics_code!}`
7. 页脚信息：`${options.blog_footer_info!}`
8. Favicon：`${options.blog_favicon!}`
9. Logo：`${options.blog_logo!}`
10. 主题设置项：`${settings.[name]}` // `name` 为 [settings.yaml](#settings-yaml-items) 设置中的 `name` 值

### 公共模板

> 为了减少重复代码，我们将某些常见的全局变量封装成了一个公共模板，我们只需要引入该模板，然后调用其中的宏模板即可。

```html
// 在模板中引入公共模板，需要注意的是，这个路径是固定的，不需要修改。 <#import
"/common/macro/common_macro.ftl" as common>
```

#### 统计代码

```html
<@common.statistics /> // 等同于 ${options.blog_statistics_code!}
```

#### 页脚信息

```html
<@common.footer_info /> // 等同于 ${options.blog_footer_info!}
```

#### Favicon

```html
<@common.favicon /> // 等同于
<link
  rel="shortcut icon"
  type="images/x-icon"
  href="${options.blog_favicon!}"
/>
```

#### 站点验证代码

```html
<@common.verification /> // 等同于
<meta
  name="google-site-verification"
  content="${options.seo_verification_google}"
/>
<meta name="msvalidate.01" content="${options.seo_verification_bing}" />
<meta
  name="baidu-site-verification"
  content="${options.seo_verification_baidu}"
/>
<meta name="360-site-verification" content="${options.seo_verification_qihu}" />
```

#### 相对时间

```html
<@common.timeline datetime="时间" /> // 输出 x 年前/x 个月前/x 天前/昨天/x
小时前/x 分钟前/x 秒前/刚刚
```

#### 公共 head 标签

```html
<@common.globalHeader /> // 等同于 <@common.favicon /> <@common.verification />
```

#### 公共底部

```html
<@common.globalFooter /> // 等同于 <@common.statistics /> <@common.footer_info
/>
```

### 页面变量

#### index.ftl

#### post.ftl

#### archives.ftl

#### sheet.ftl

#### photos.ftl

#### links.ftl

#### journals.ftl

#### categories.ftl

#### category.ftl

#### tags.ftl

#### tag.ftl

#### search.ftl

### 自定义标签

> 自定义标签可以在页面的任意地方调用。

#### postTag（文章）

##### 获取最新文章：

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

##### 获取所有文章条数

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

##### 根据年份归档

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

##### 根据年月归档

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

##### 根据分类 id 查询文章

```html
<@postTag method="listByCategoryId" categoryId="分类 id">
// 返回参数：posts
</@postTag>
```

##### 根据标签 id 查询文章

```html
<@postTag method="listByTagId" categoryId="标签 id">
// 返回参数：posts
</@postTag>
```

#### commentTag（评论）

##### 获取最新评论：

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

##### 获取所有评论条数

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

#### menuTag（菜单）

##### 获取所有菜单

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

##### 获取多级菜单列表

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

#### categoryTag（分类）

##### 获取所有分类

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

##### 根据文章 id 获取分类

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

##### 获取所有分类条数

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

#### tagTag（标签）

##### 获取所有标签

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

##### 根据文章 id 获取标签

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

##### 获取所有标签条数

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

#### photoTag（图库）

##### 获取所有图片

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

##### 获取图片组

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

##### 根据分组获取图片

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

##### 获取所有图片条数

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

#### linkTag（友情链接）

##### 获取所有友情链接

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

##### 获取友情链接组

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

##### 获取所有友情链接条数

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

### 接入评论

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
<#include "comment.ftl"> <@comment post=post type="post" />
```

在 `sheet.ftl` 中：

```html
<#include "comment.ftl"> <@comment post=sheet type="sheet" />
```
