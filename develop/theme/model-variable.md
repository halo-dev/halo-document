# 模型变量

## BaseEntity

> BaseEntity 包含所有模型都共有的字段。

| 字段       | 类型 | 说明     |
| ---------- | ---- | -------- |
| createTime | Date | 创建时间 |
| updateTime | Date | 更新时间 |

## Post

| 字段            | 类型    | 说明              |
| --------------- | ------- | ----------------- |
| id              | Integer | id                |
| title           | String  | 文章标题          |
| url             | String  | 文章路径          |
| originalContent | String  | markdown 格式内容 |
| formatContent   | String  | html 格式内容     |
| summary         | String  | 摘要              |
| thumbnail       | String  | 缩略图            |
| visits          | Long    | 浏览量            |
| disallowComment | Boolean | 是否禁用评论      |
| template        | String  | 自定义模板        |
| topPriority     | Integer | 排序              |
| likes           | Long    | 点赞量            |
| editTime        | Date    | 最后编辑时间      |

## PostListVo

| 字段            | 类型                | 说明              |
| --------------- | ------------------- | ----------------- |
| id              | Integer             | id                |
| title           | String              | 文章标题          |
| status          | PostStatus          | 文章状态          |
| url             | String              | 文章路径          |
| originalContent | String              | markdown 格式内容 |
| formatContent   | String              | html 格式内容     |
| summary         | String              | 摘要              |
| thumbnail       | String              | 缩略图            |
| visits          | Long                | 浏览量            |
| disallowComment | Boolean             | 是否禁用评论      |
| template        | String              | 自定义模板        |
| topPriority     | Integer             | 排序              |
| likes           | Long                | 点赞量            |
| editTime        | Date                | 最后编辑时间      |
| commentCount    | Long                | 评论数量          |
| tags            | List\<TagDTO\>      | 标签              |
| categories      | List\<CategoryDTO\> | 分类              |

## Category

| 字段        | 类型    | 说明      |
| ----------- | ------- | --------- |
| id          | Integer | id        |
| name        | String  | 名称      |
| slugName    | String  | 别名      |
| description | String  | 描述      |
| parentId    | Integer | 父分类 id |

## Tag

| 字段     | 类型    | 说明 |
| -------- | ------- | ---- |
| id       | Integer | id   |
| name     | String  | 名称 |
| slugName | String  | 别名 |

## Links

> 友情链接

| 字段        | 类型    | 说明                         |
| ----------- | ------- | ---------------------------- |
| id          | Integer | id                           |
| name        | String  | 名称                         |
| url         | String  | 网站地址（需要加上 http://） |
| logo        | String  | 友情链接网站 logo            |
| description | String  | 网站描述                     |
| team        | String  | 分组名称（非必填）           |

## photos

> 图库/画廊

| 字段        | 类型    | 说明                 |
| ----------- | ------- | -------------------- |
| id          | Integer | id                   |
| name        | String  | 图片名称             |
| description | String  | 图片描述信息         |
| takeTime    | Date    | 图片上传日期         |
| location    | String  | 图片存储位置         |
| thumbnail   | String  | 图片缩略图地址       |
| url         | String  | 图片链接（访问地址） |
| team        | String  | 图片分组名称         |

## Journal

> 日志，类似于朋友圈或者空间的说说或者微博

| 字段    | 类型    | 说明                 |
| ------- | ------- | -------------------- |
| id      | Integer | id                   |
| content | String  | 日志内容             |
| likes   | Long    | 喜欢人数（点赞数量） |

## Menu

> 菜单

| 字段     | 类型    | 说明                                                                                          |
| -------- | ------- | --------------------------------------------------------------------------------------------- |
| id       | Integer | id                                                                                            |
| name     | String  | 菜单名称                                                                                      |
| url      | String  | 菜单访问地址                                                                                  |
| priority | Integer | 菜单排序优先级，默认值为 0                                                                    |
| target   | String  | 菜单打开方式，默认值`_self`，可选`_blank`,`_parent`,`_top`,含义参考`HTML`标签的 `target` 属性 |

## ThemeSetting

> 主题设置

| 字段    | 类型    | 说明           |
| ------- | ------- | -------------- |
| id      | Integer | id             |
| key     | String  | 主题设置项的键 |
| value   | String  | 主题设置项的值 |
| themeId | String  | 主题 id        |

## User

> 用户

| 字段        | 类型    | 说明                     |
| ----------- | ------- | ------------------------ |
| id          | Integer | id                       |
| username    | String  | 用户名，用于在页面上显示 |
| nickname    | String  | 昵称                     |
| password    | String  | 密码                     |
| email       | String  | 邮箱地址                 |
| avatar      | String  | 用户头像（地址)          |
| description | String  | 个性签名                 |
| expireTime  | Date    | 用户登录 token 过期时间  |
