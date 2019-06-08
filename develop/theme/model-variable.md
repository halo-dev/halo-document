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