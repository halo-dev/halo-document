---
sidebar: auto
---

# 开发文档

## 系统结构详解

Halo 的整个系统分为三个部分：

- halo：提供整个系统的服务，使用 Spring Boot 开发，打包之后只有一个 Jar 包。
- halo-admin：负责后台管理的渲染，使用 Vue 开发，构建之后的文件是放在 halo 项目中的 `resources/admin` 下面的，启动 halo 之后，访问 `/admin` 即可。
- halo-comment：评论插件，使用 Vue 开发，在主题中只需要引入构建好的 JS 文件即可。

我们实现了将程序包（jar）与配置文件，主题，附件等相分离，所有与用户相关的东西全部放在系统用户目录的 `.halo` 下，也就是 `~/.halo`。`.halo` 下的文件结构如下：

```bash
├── application.yaml    // 用户配置文件
├── db                  // H2 Database 物理文件目录
│   ├── halo.mv.db 
├── logs                // 日志目录
│   ├── spring.log 
├── templates       
│   └── themes          // 主题目录
│       ├── anatole
└── upload              // 上传的附件目录
```

::: tip 注意
当我们指定了 Spring 的 profile 后，`.halo` 是不一样的，比如在运行 Halo 时指定 `--spring.profiles.active=dev` ，那么当前存放配置文件，数据库，主题等的目录则为 `halo-dev`。
:::

## 系统开发
待完善

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

### 自定义标签
待完善
### 页面模型
待完善