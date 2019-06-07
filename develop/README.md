# 系统开发

## 系统结构

[Halo](https://github.com/halo-dev/halo) 博客系统分为以下四个部分：

| 项目名称                                                  | 简介                                                                                                                   |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| [halo](https://github.com/halo-dev/halo)                  | 提供整个系统的服务，采用 [Spring Boot](https://spring.io/) 开发                                                        |
| [halo-admin](https://github.com/halo-dev/halo-admin)      | 负责后台管理的渲染，采用 [Vue](https://vuejs.org/) 开发，理论上可以部署在任何地方                                      |
| [halo-comment](https://github.com/halo-dev/halo-comment) | 评论插件，采用 [Vue](https://vuejs.org/) 开发，在主题中运行方式引入构建好的 `Javascript` 文件即可                      |
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

每次保存代码的时候，`IDE` 会自动为我们编译代码，`Developer Tools` 检测到代码的 `class 文件`（只能检测 classpath 下的 class 文件）的变更，会自动重启项目。注意，这里的重启速度会有质的提升，具体原因是因为 `Spring Boot` 提供的 `restart 技术`提供了两个 `classloaders`：`base classloader` 和 `restart classloader`。当项目重启的时候 `restart classloader` 将会被抛弃，并重启创建一个，这比 `code starts`（冷启动）快很多。当然，肯定是比不上 `JRebel` 采用的 `Reload 技术`。

> 具体细节请查阅: [Automatic Restart](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html#using-boot-devtools-restart)

这里以 `IntelliJ IDEA` 为例。

1. 进入 `Settings` (Preferences on macOS)。
2. 打开 `Build, Execution, Deployment > Compiler`. 启用 `Build project automatically`。
3. 点击 `应用`。
4. 按 `Ctrl+Shift+A` (Cmd+Shift+A on macOS)快捷键，然后搜索 `Registry`。打开之后找到 `compiler.automake.allow.when.app.running`，并启用它 (IntelliJ IDEA 15 and newer)。

> 来源于 <https://zeroturnaround.com/software/jrebel/quickstart/intellij/enable-automatic-compilation-in-intellij-idea/>