---
sidebar: auto
---

# 开发文档

## 系统结构

[Halo](https://github.com/halo-dev/halo) 博客系统分为以下四个部分：

| 项目名称                                                  | 简介                                                                                                                   |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| [halo](https://github.com/halo-dev/halo)                  | 提供整个系统的服务，采用 [Spring Boot](https://spring.io/) 开发                                                        |
| [halo-admin](https://github.com/halo-dev/halo-admin)      | 负责后台管理的渲染，采用 [Vue](https://vuejs.org/) 开发，理论上可以部署在任何地方                                      |
| [halo-comment](https://github.com/halo-dev/halo-document) | 评论插件，采用 [Vue](https://vuejs.org/) 开发，在主题中运行方式引入构建好的 `Javascript` 文件即可                      |
| [halo-theme-\*](https://github.com/halo-dev)              | 主题项目集，采用 [Freemarker](https://freemarker.apache.org/) 模板引擎编写，需要包含一些特殊的配置才能够被 halo 所使用 |

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

> 为什么要提前将自定义配置呢？是因为在这里让大家了解到 `Halo` 的`配置方式`，以及`配置优先级`，不至于未来运行项目的时候不知道如何优雅地修改配置。

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

### 所需要的环境：

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

如果需要指定配置，请在 `Run/Debug Configuration` 内进行设置 `VM options`，例如：

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

如果需要手动指定配置，可添加 `--args` 参数，例如：

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

每次保存代码的时候，`IDE` 会自动为我们编译代码，`Developer Tools` 检测到代码的 `class 文件`（只能检测 classpath 下的 class 文件）的变更，会自动重启项目。注意，这里的重启速度会有质的提升，具体原因是因为 `Spring Boot` 提供的 `restart 技术`提供了两个 `classloaders`：`base classloader` 和 `restart classloader`。当项目重启的时候 `restart classloader` 将会被抛弃，并重启创建一个，这比 `code starts`（冷启动）快很多。当然，肯定是比不上 `JRebel` 采用的 `Reload 技术`。

> 具体细节请查阅: [Automatic Restart](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html#using-boot-devtools-restart)

这里以 `IntelliJ IDEA` 为例。

1. 进入 `Settings` (Preferences on macOS)。
2. 打开 `Build, Execution, Deployment > Compiler`. 启用 `Build project automatically`。
3. 点击 `应用`。
4. 按 `Ctrl+Shift+A` (Cmd+Shift+A on macOS)快捷键，然后搜索 `Registry`。打开之后找到 `compiler.automake.allow.when.app.running`，并启用它 (IntelliJ IDEA 15 and newer)。

> 来源于 <https://zeroturnaround.com/software/jrebel/quickstart/intellij/enable-automatic-compilation-in-intellij-idea/>

## 主题开发

> Halo 的模板引擎为 Freemarker，建议在开发 Halo 的主题之前，先看一遍 Freemarker 的相关文档：<http://freemarker.foofun.cn>。

### 搭建开发环境

> 假设你已经在本地电脑配置好了 Java 运行环境。

Halo 的运行可参考上述 [系统开发](#系统开发)，或者直接下载打包好的程序启动，如下步骤：

- 从 [Github release]() 下载最新的 Jar 包。
- 在终端中执行 `java -jar halo-版本号.jar --spring.profiles.active=dev`

启动完成之后，在电脑的用户目录即可看到 `halo-dev` 文件夹。

### 准备工作

1. 在 `halo-dev/templates/themes` 下新建一个文件夹，该文件夹就是你所新建的主题目录。
2. 使用你熟悉的编辑器打开你所新建的主题目录。

### 开发约定

- 主题目录下必须存在 `theme.yaml（主题描述文件）`，`settings.yaml（主题配置文件）`，相关格式在后面会详细讲解。
- 如果要开源到 Github 我们建议将仓库名设置为 `halo-theme-主题名`，并设置仓库的 `topic` 为 `halo` 和 `halo-theme`，这样可以方便使用者搜索。

### 配置文件

> Halo 的主题模块使用 yaml 来对主题进行配置，`theme.yaml` 里面主要描述主题的名称，开发者的信息，开源地址等等。`settings.yaml` 包含了主题所有的配置选项，需要注意的是，这些选项仅仅是用于构建配置表单，并不起到对主题的配置作用。

#### theme.yaml

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

theme.yaml 实例：

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

### 全局变量

> 这些变量可以在页面的任意地方调用。

- 博客地址：\${context!}
- 主题根路径：\${static!}
- 博客标题：\${options.blog_title!}
- 博客关键字：\${options.seo_keywords!}
- 博客描述：\${options.seo_description!}

### 自定义标签

> 自定义标签可以在页面的任意地方调用。

#### postTag

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

#### commentTag

#### menuTag

#### categoryTag

#### tagTag

#### photoTag

#### linkTag

### 页面变量

待完善
