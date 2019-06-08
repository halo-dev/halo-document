# 配置文件

> Halo 的主题模块使用 yaml 来对主题进行配置，`theme.yaml` 里面主要描述主题的名称，开发者的信息，开源地址等等。`settings.yaml` 包含了主题所有的配置选项，需要注意的是，这些选项仅仅是用于构建配置表单，并不起到对主题的配置作用。

## theme.yaml

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

## settings.yaml

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

## settings.yaml#items

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