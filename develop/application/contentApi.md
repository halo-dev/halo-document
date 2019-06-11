# Api 1.0

## 接口说明

> 利用Halo提供的接口，第三方开发者可以把Halo提供的前台博客浏览相关功能，接入到自己的应用中，并且可以根据数据接口，获取Halo提供的各种应用数据，以方便开发者更容易的进行应用的分发。比如小程序，客户端等

## 返回状态码说明

| Code | Description             |
| ---- | ----------------------- |
| 200  | *OK*, 请求成功          |
| 400  | *Bad request*           |
| 401  | *Unauthorized*          |
| 403  | *Forbidden*             |
| 404  | *Not found*             |
| 500  | *Internal server error* |



## 归档

### 根据月份归档

**简要描述：**

- 根据月份归档获取文章

**请求URL:**

- `/api/content/archives/months`

**请求方式：**

- `GET`

<details>
    <summary>返回示例</summary>

```json
[
  {
    "month": 0,
    "posts": [
      {
        "createTime": "2019-06-11T02:47:16.479Z",
        "editTime": "2019-06-11T02:47:16.479Z",
        "id": 0,
        "status": "PUBLISHED",
        "title": "string",
        "type": "POST",
        "updateTime": "2019-06-11T02:47:16.479Z",
        "url": "string"
      }
    ],
    "year": 0
  }
]
```
</details> 

### 根据年份归档

**简要描述：**

- 根据年份归档获取文章信息

**请求URL:**

- `/api/content/archives/years`

**请求方式：**

- `GET`

<details>
    <summary>返回示例</summary>

```json
[
  {
    "posts": [
      {
        "createTime": "2019-06-11T03:00:28.553Z",
        "editTime": "2019-06-11T03:00:28.553Z",
        "id": 0,
        "status": "PUBLISHED",
        "title": "string",
        "type": "POST",
        "updateTime": "2019-06-11T03:00:28.553Z",
        "url": "string"
      }
    ],
    "year": 0
  }
]
```

</details> 

## 日志

### 获取回复

**简要描述：**

- 根据`commentParentId`评论的`id`及`journalId`日志`id`获取回复

**请求URL:**

- `/api/content/archives/years`

**请求方式：**

- `GET`

**参数：**

| 参数名              | 必选 | 类型          | 说明                                   |
| ------------------- | ---- | ------------- | -------------------------------------- |
| **commentParentId** | 是   | Integer       | 评论的id                               |
| **journalId**       | 是   | Integer       | 日志的id                               |
| sort                | 否   | array[string] | 排序条件，默认根据`createTime`降序排列 |

<details>
    <summary>返回示例</summary>

```json
[
  {
    "author": "string",
    "authorUrl": "string",
    "content": "string",
    "createTime": "2019-06-11T03:01:09.298Z",
    "email": "string",
    "gavatarMd5": "string",
    "id": 0,
    "ipAddress": "string",
    "isAdmin": true,
    "parentId": 0,
    "status": "PUBLISHED",
    "userAgent": "string"
  }
]
```

</details> 

### 获取评论及回复列表

**简要描述：**

- 根据`journalId`日志`id`获取评论和回复列表

**请求URL:**

- `/api/content/journals/{journalId}/comments/list_view`

**请求方式：**

- `GET`

**参数：**

| 参数名        | 必选 | 类型          | 说明                                   |
| ------------- | ---- | ------------- | -------------------------------------- |
| **journalId** | 是   | Integer       | 日志的id                               |
| page          | 否   | Integer       | 分页条件，默认为0                      |
| sort          | 否   | array[string] | 排序条件，默认根据`createTime`降序排列 |

<details>
    <summary>返回示例</summary>

```json
{
  "content": [
    {
      "author": "string",
      "authorUrl": "string",
      "content": "string",
      "createTime": "2019-06-11T03:12:05.431Z",
      "email": "string",
      "gavatarMd5": "string",
      "id": 0,
      "ipAddress": "string",
      "isAdmin": true,
      "parentId": 0,
      "status": "PUBLISHED",
      "userAgent": "string"
    }
  ],
  "empty": true,
  "first": true,
  "last": true,
  "number": 0,
  "numberOfElements": 0,
  "pageable": {
    "page": 0,
    "size": 0,
    "sort": [
      "string"
    ]
  },
  "size": 0,
  "sort": {
    "sort": [
      "string"
    ]
  },
  "totalElements": 0,
  "totalPages": 0
}
```

</details> 

### 获取评论

**简要描述：**

- 根据`journalId`日志的`id`获取评论信息

**请求URL:**

- `/api/content/journals/{journalId}/comments/top_view`

**请求方式：**

- `GET`

**参数：**

| 参数名        | 必选 | 类型          | 说明                                   |
| ------------- | ---- | ------------- | -------------------------------------- |
| **journalId** | 是   | Integer       | 日志的id                               |
| page          | 否   | Integer       | 分页条件，默认为0                      |
| sort          | 否   | array[string] | 排序条件，默认根据`createTime`降序排列 |

<details>
    <summary>返回示例</summary>

```json
{
  "status": 200,
  "message": "OK",
  "devMessage": null,
  "data": {
    "content": [],
    "pages": 0,
    "total": 0,
    "page": 0,
    "rpp": 10,
    "hasNext": false,
    "hasPrevious": false,
    "isFirst": true,
    "isLast": true,
    "isEmpty": true,
    "hasContent": false
  }
}
```

</details> 

### 获取评论及回复树

**简要描述：**

- 根据`journalId`日志的`id`获取评论及回复树状视图数据

**请求URL:**

- `/api/content/journals/{journalId}/comments/tree_view`

**请求方式：**

- `GET`

**参数：**

| 参数名        | 必选 | 类型          | 说明                                   |
| ------------- | ---- | ------------- | -------------------------------------- |
| **journalId** | 是   | Integer       | 日志的id                               |
| page          | 否   | Integer       | 分页条件，默认为0                      |
| sort          | 否   | array[string] | 排序条件，默认根据`createTime`降序排列 |

<details>
    <summary>返回示例</summary>

```json
{
  "content": [
    {
      "author": "string",
      "authorUrl": "string",
      "children": [
        null
      ],
      "content": "string",
      "createTime": "2019-06-11T03:36:29.192Z",
      "email": "string",
      "gavatarMd5": "string",
      "id": 0,
      "ipAddress": "string",
      "isAdmin": true,
      "parentId": 0,
      "status": "PUBLISHED",
      "userAgent": "string"
    }
  ],
  "empty": true,
  "first": true,
  "last": true,
  "number": 0,
  "numberOfElements": 0,
  "pageable": {
    "page": 0,
    "size": 0,
    "sort": [
      "string"
    ]
  },
  "size": 0,
  "sort": {
    "sort": [
      "string"
    ]
  },
  "totalElements": 0,
  "totalPages": 0
}
```

</details> 

### 发布评论

**简要描述：**

- 对日志进行评论

**请求URL:**

- `/api/content/journals/{journalId}/comments/tree_view`

**请求方式：**

- `POST`

**参数：**

| 参数名                  | 必选 | 类型                | 说明             |
| ----------------------- | ---- | ------------------- | ---------------- |
| **journalCommentParam** | 是   | JournalCommentParam | 日志评论参数模型 |
模型对象属性

```json
{
  "author": "string",
  "authorUrl": "string",
  "content": "string",
  "email": "string",
  "parentId": 0,
  "postId": 0
}
```

**参数类型：**

- `application/json`

<details>
    <summary>返回示例</summary>

```json
{
  "author": "string",
  "authorUrl": "string",
  "content": "string",
  "createTime": "2019-06-11T03:37:49.729Z",
  "email": "string",
  "gavatarMd5": "string",
  "id": 0,
  "ipAddress": "string",
  "isAdmin": true,
  "parentId": 0,
  "status": "PUBLISHED",
  "userAgent": "string"
}
```

</details> 

## 友情链接

**简要描述：**

- 获取所有友情链接，按分组归类

**请求URL:**

- `/api/content/links/team_view`

**请求方式：**

- `GET`

**参数：**

| 参数名 | 必选 | 类型          | 说明     |
| ------ | ---- | ------------- | -------- |
| sort   | 否   | array[string] | 排序条件 |

<details>
    <summary>返回示例</summary>

```json
[
  {
    "links": [
      {
        "description": "string",
        "id": 0,
        "logo": "string",
        "name": "string",
        "team": "string",
        "url": "string"
      }
    ],
    "team": "string"
  }
]
```

</details> 

## 菜单

**简要描述：**

- 获取首页菜单列表

**请求URL:**

- `/api/content/menus`

**请求方式：**

- `GET`

**参数：**

| 参数名 | 必选 | 类型          | 说明     |
| ------ | ---- | ------------- | -------- |
| sort   | 否   | array[string] | 排序条件 |

<details>
    <summary>返回示例</summary>

```json
[
  {
    "icon": "string",
    "id": 0,
    "name": "string",
    "parentId": 0,
    "priority": 0,
    "target": "string",
    "url": "string"
  }
]
```

</details> 

## 网站设置参数项

### 评论设置项

**简要描述：**

- 获取评论的设置参数,如评论头像生成方式，占位符

**请求URL:**

- `/api/content/options/comment`

**请求方式：**

- `GET`

<details>
    <summary>返回示例</summary>

```json
{
  "status": 200,
  "message": "OK",
  "devMessage": null,
  "data": {
    "comment_gavatar_default": "mm"
  }
}
```

</details> 

### 获取设置值

**简要描述：**

- 通过键获取后台设置项的值

**请求URL:**

- `/api/content/options/keys/{key}`

**请求方式：**

- `GET`

**参数：**

| 参数名  | 必选 | 类型   | 说明         |
| ------- | ---- | ------ | ------------ |
| **key** | 是   | string | 设置项键名称 |

<details>
    <summary>返回示例</summary>

```json
{
  "data": {},
  "devMessage": "string",
  "message": "string",
  "status": 0
}
```

</details> 

### 获取设置选项列表

**简要描述：**

- 获取所有设置项列表,返回`list`形式的`k-v`键值对象

**请求URL:**

- `/api/content/options/list_view`

**请求方式：**

- `GET`


<details>
    <summary>返回示例</summary>

```json
[
  {
    "key": "string",
    "value": {}
  }
]
```

</details> 

### 获取设置选项map

**简要描述：**

- 传递多个`key`参数获取于`key`对应的设置项,返回一个`map`，不传递默认获取所有

**请求URL:**

- `/api/content/options/map_view`

**请求方式：**

- `GET`

**参数：**

| 参数名  | 必选 | 类型          | 说明   |
| ------- | ---- | ------------- | ------ |
| **key** | 否   | array[string] | 键集合 |

<details>
    <summary>返回示例</summary>

```json
[
  {
    "key": "string",
    "value": {}
  }
]
```

</details> 

## 文章

### 获取文章列表

**简要描述：**

- 获取文章列表信息

**请求URL:**

- `/api/content/posts`

**请求方式：**

- `GET`

**参数：**

| 参数名 | 必选 | 类型          | 说明                                     |
| ------ | ---- | ------------- | ---------------------------------------- |
| page   | 否   | integer       | 分页数                                   |
| size   | 否   | integer       | 每页显示数量                             |
| sort   | 否   | array[string] | 排序条件，默认根创建时间`createTime`排序 |

<details>
    <summary>返回示例</summary>

```json
{
  "content": [
    {
      "createFrom": "ADMIN",
      "createTime": "2019-06-11T08:30:30.762Z",
      "disallowComment": true,
      "editTime": "2019-06-11T08:30:30.762Z",
      "id": 0,
      "likes": 0,
      "status": "PUBLISHED",
      "summary": "string",
      "template": "string",
      "thumbnail": "string",
      "title": "string",
      "topPriority": 0,
      "type": "POST",
      "updateTime": "2019-06-11T08:30:30.762Z",
      "url": "string",
      "visits": 0
    }
  ],
  "empty": true,
  "first": true,
  "last": true,
  "number": 0,
  "numberOfElements": 0,
  "pageable": {
    "page": 0,
    "size": 0,
    "sort": [
      "string"
    ]
  },
  "size": 0,
  "sort": {
    "sort": [
      "string"
    ]
  },
  "totalElements": 0,
  "totalPages": 0
}
```

</details> 

### 获取单篇文章

**简要描述：**

- 根据文章`id`获取文章信息

**请求URL:**

- `/api/content/posts/{postId}`

**请求方式：**

- `GET`

**参数：**

| 参数名         | 必选 | 类型    | 说明                                           |
| -------------- | ---- | ------- | ---------------------------------------------- |
| **postId**     | 是   | integer | 文章id                                         |
| formatDisabled | 否   | boolean | 是否加载格式化为`html`的文章内容，默认为`true` |
| sourceDisabled | 否   | boolean | 是否加载原`markdown`格式文章内容，默认为`true  |

<details>
    <summary>返回示例</summary>

```json
{
  "createFrom": "ADMIN",
  "createTime": "2019-06-11T08:36:50.003Z",
  "disallowComment": true,
  "editTime": "2019-06-11T08:36:50.003Z",
  "formatContent": "string",
  "id": 0,
  "likes": 0,
  "originalContent": "string",
  "status": "PUBLISHED",
  "summary": "string",
  "template": "string",
  "thumbnail": "string",
  "title": "string",
  "topPriority": 0,
  "type": "POST",
  "updateTime": "2019-06-11T08:36:50.003Z",
  "url": "string",
  "visits": 0
}
```

</details> 

### 获取文章评论

**简要描述：**

- 根据文章`id`及评论的父`id`查询回复信息

**请求URL:**

- `/api/content/posts/{postId}/comments/{commentParentId}/children`

**请求方式：**

- `GET`

**参数：**

| 参数名              | 必选 | 类型          | 说明       |
| ------------------- | ---- | ------------- | ---------- |
| **commentParentId** | 是   | integer       | 评论的父id |
| **postId**          | 是   | integer       | 文章id     |
| sort                | 否   | array[string] | 排序条件   |

<details>
    <summary>返回示例</summary>

```json
[
  {
    "author": "string",
    "authorUrl": "string",
    "content": "string",
    "createTime": "2019-06-11T08:43:47.521Z",
    "email": "string",
    "gavatarMd5": "string",
    "id": 0,
    "ipAddress": "string",
    "isAdmin": true,
    "parentId": 0,
    "status": "PUBLISHED",
    "userAgent": "string"
  }
]
```

</details> 

### 获取文章评论列表

**简要描述：**

- 根据文章`id`获取文章评论列表

**请求URL:**

- `/api/content/posts/{postId}/comments/list_view`

**请求方式：**

- `GET`

**参数：**

| 参数名     | 必选 | 类型          | 说明                                   |
| ---------- | ---- | ------------- | -------------------------------------- |
| **postId** | 是   | integer       | 文章id                                 |
| page       | 否   | integer       | 分页条件,默认值为 0                    |
| sort       | 否   | array[string] | 排序条件，默认按照评论`createTime`排序 |

<details>
    <summary>返回示例</summary>

```json
{
  "content": [
    {
      "author": "string",
      "authorUrl": "string",
      "content": "string",
      "createTime": "2019-06-11T08:49:30.852Z",
      "email": "string",
      "gavatarMd5": "string",
      "id": 0,
      "ipAddress": "string",
      "isAdmin": true,
      "parentId": 0,
      "status": "PUBLISHED",
      "userAgent": "string"
    }
  ],
  "empty": true,
  "first": true,
  "last": true,
  "number": 0,
  "numberOfElements": 0,
  "pageable": {
    "page": 0,
    "size": 0,
    "sort": [
      "string"
    ]
  },
  "size": 0,
  "sort": {
    "sort": [
      "string"
    ]
  },
  "totalElements": 0,
  "totalPages": 0
}
```

</details> 

### 获取文章一级评论

**简要描述：**

- 根据文章`id`获取评论的一级视图，即只获取评论不获取回复信息

**请求URL:**

- `/api/content/posts/{postId}/comments/top_view`

**请求方式：**

- `GET`

**参数：**

| 参数名     | 必选 | 类型          | 说明                                   |
| ---------- | ---- | ------------- | -------------------------------------- |
| **postId** | 是   | integer       | 文章id                                 |
| page       | 否   | integer       | 分页条件                               |
| sort       | 否   | array[string] | 排序条件，默认按评论的`createTime`排序 |

<details>
    <summary>返回示例</summary>

```json
{
  "content": [
    {
      "author": "string",
      "authorUrl": "string",
      "content": "string",
      "createTime": "2019-06-11T08:52:58.731Z",
      "email": "string",
      "gavatarMd5": "string",
      "hasChildren": true,
      "id": 0,
      "ipAddress": "string",
      "isAdmin": true,
      "parentId": 0,
      "status": "PUBLISHED",
      "userAgent": "string"
    }
  ],
  "empty": true,
  "first": true,
  "last": true,
  "number": 0,
  "numberOfElements": 0,
  "pageable": {
    "page": 0,
    "size": 0,
    "sort": [
      "string"
    ]
  },
  "size": 0,
  "sort": {
    "sort": [
      "string"
    ]
  },
  "totalElements": 0,
  "totalPages": 0
}
```

</details> 

### 获取文章评论树

**简要描述：**

- 根据文章`id`获取文章评论树状视图数据

**请求URL:**

- `/api/content/posts/{postId}/comments/tree_view`

**请求方式：**

- `GET`

**参数：**

| 参数名     | 必选 | 类型          | 说明                                 |
| ---------- | ---- | ------------- | ------------------------------------ |
| **postId** | 是   | integer       | 文章id                               |
| page       | 否   | integer       | 分页条件                             |
| sort       | 否   | array[string] | 排序条件，默认按评论`createTime`排序 |

<details>
    <summary>返回示例</summary>

```json
{
  "content": [
    {
      "author": "string",
      "authorUrl": "string",
      "children": [
        null
      ],
      "content": "string",
      "createTime": "2019-06-11T08:54:52.457Z",
      "email": "string",
      "gavatarMd5": "string",
      "id": 0,
      "ipAddress": "string",
      "isAdmin": true,
      "parentId": 0,
      "status": "PUBLISHED",
      "userAgent": "string"
    }
  ],
  "empty": true,
  "first": true,
  "last": true,
  "number": 0,
  "numberOfElements": 0,
  "pageable": {
    "page": 0,
    "size": 0,
    "sort": [
      "string"
    ]
  },
  "size": 0,
  "sort": {
    "sort": [
      "string"
    ]
  },
  "totalElements": 0,
  "totalPages": 0
}
```

</details> 

### 点赞文章

**简要描述：**

- 给喜欢的文章点赞

**请求URL:**

- `/api/content/posts/{postId}/likes`

**请求方式：**

- `POST`

**参数：**

| 参数名     | 必选 | 类型    | 说明   |
| ---------- | ---- | ------- | ------ |
| **postId** | 是   | integer | 文章id |


### 评论文章

**简要描述：**

- 对文章进行评论

**请求URL:**

- `/api/content/posts/comments`

**请求方式：**

- `POST`

**参数：**

| 参数名               | 必选 | 类型             | 说明                 |
| -------------------- | ---- | ---------------- | -------------------- |
| **postCommentParam** | 是   | PostCommentParam | 文章评论参数模型对象 |
**对象属性：**

```json
{
  "author": "string",
  "authorUrl": "string",
  "content": "string",
  "email": "string",
  "parentId": 0,
  "postId": 0
}
```
**参数类型：**

- `application/json`

<details>
    <summary>返回示例</summary>

```json
{
  "author": "string",
  "authorUrl": "string",
  "content": "string",
  "createTime": "2019-06-11T09:03:13.189Z",
  "email": "string",
  "gavatarMd5": "string",
  "id": 0,
  "ipAddress": "string",
  "isAdmin": true,
  "parentId": 0,
  "status": "PUBLISHED",
  "userAgent": "string"
}
```

</details> 

## 自定义页面

### 获取自定义页面评论

**简要描述：**

- 根据自定义页面`id`,及评论`id`获取回复列表

**请求URL:**

- `/api/content/sheets/{sheetId}/comments/{commentParentId}/children`

**请求方式：**

- `GET`

**参数：**

| 参数名              | 必选 | 类型          | 说明                                   |
| ------------------- | ---- | ------------- | -------------------------------------- |
| **commentParentId** | 是   | integer       | 评论id                                 |
| **sheetId**         | 是   | integer       | 自定义页面id                           |
| sort                | 否   | array[string] | 排序条件，默认按照评论`createTime`排序 |
<details>
    <summary>返回示例</summary>

```json
[
  {
    "author": "string",
    "authorUrl": "string",
    "content": "string",
    "createTime": "2019-06-11T09:12:51.031Z",
    "email": "string",
    "gavatarMd5": "string",
    "id": 0,
    "ipAddress": "string",
    "isAdmin": true,
    "parentId": 0,
    "status": "PUBLISHED",
    "userAgent": "string"
  }
]
```

</details> 

### 获取评论列表

**简要描述：**

- 根据自定义页面`id`获取评论列表

**请求URL:**

- `/api/content/sheets/{sheetId}/comments/list_view`

**请求方式：**

- `GET`

**参数：**

| 参数名      | 必选 | 类型          | 说明                                   |
| ----------- | ---- | ------------- | -------------------------------------- |
| **sheetId** | 是   | integer       | 自定义页面id                           |
| page        | 否   | integer       | 分页条件                               |
| sort        | 否   | array[string] | 排序条件，默认按照评论`createTime`排序 |
<details>
    <summary>返回示例</summary>

```json
{
  "content": [
    {
      "author": "string",
      "authorUrl": "string",
      "content": "string",
      "createTime": "2019-06-11T09:16:28.369Z",
      "email": "string",
      "gavatarMd5": "string",
      "id": 0,
      "ipAddress": "string",
      "isAdmin": true,
      "parentId": 0,
      "status": "PUBLISHED",
      "userAgent": "string"
    }
  ],
  "empty": true,
  "first": true,
  "last": true,
  "number": 0,
  "numberOfElements": 0,
  "pageable": {
    "page": 0,
    "size": 0,
    "sort": [
      "string"
    ]
  },
  "size": 0,
  "sort": {
    "sort": [
      "string"
    ]
  },
  "totalElements": 0,
  "totalPages": 0
}
```

</details> 

### 获取一级评论

**简要描述：**

- 根据自定义页面`id`获取评论（不包含回复）

**请求URL:**

- `/api/content/sheets/{sheetId}/comments/top_view`

**请求方式：**

- `GET`

**参数：**

| 参数名      | 必选 | 类型          | 说明                                   |
| ----------- | ---- | ------------- | -------------------------------------- |
| **sheetId** | 是   | integer       | 自定义页面id                           |
| page        | 否   | integer       | 分页条件，默认值为0                    |
| sort        | 否   | array[string] | 排序条件，默认按照评论`createTime`排序 |
<details>
    <summary>返回示例</summary>

```json
{
  "content": [
    {
      "author": "string",
      "authorUrl": "string",
      "content": "string",
      "createTime": "2019-06-11T09:18:42.496Z",
      "email": "string",
      "gavatarMd5": "string",
      "hasChildren": true,
      "id": 0,
      "ipAddress": "string",
      "isAdmin": true,
      "parentId": 0,
      "status": "PUBLISHED",
      "userAgent": "string"
    }
  ],
  "empty": true,
  "first": true,
  "last": true,
  "number": 0,
  "numberOfElements": 0,
  "pageable": {
    "page": 0,
    "size": 0,
    "sort": [
      "string"
    ]
  },
  "size": 0,
  "sort": {
    "sort": [
      "string"
    ]
  },
  "totalElements": 0,
  "totalPages": 0
}
```

</details> 

### 获取评论树

**简要描述：**

- 根据自定义页面`id`获取评论树状数据视图

**请求URL:**

- `/api/content/sheets/{sheetId}/comments/tree_view`

**请求方式：**

- `GET`

**参数：**

| 参数名      | 必选 | 类型          | 说明                                   |
| ----------- | ---- | ------------- | -------------------------------------- |
| **sheetId** | 是   | integer       | 自定义页面id                           |
| page        | 否   | integer       | 分页条件，默认值为0                    |
| sort        | 否   | array[string] | 排序条件，默认按照评论`createTime`排序 |
<details>
    <summary>返回示例</summary>

```json
{
  "content": [
    {
      "author": "string",
      "authorUrl": "string",
      "children": [
        null
      ],
      "content": "string",
      "createTime": "2019-06-11T09:20:46.307Z",
      "email": "string",
      "gavatarMd5": "string",
      "id": 0,
      "ipAddress": "string",
      "isAdmin": true,
      "parentId": 0,
      "status": "PUBLISHED",
      "userAgent": "string"
    }
  ],
  "empty": true,
  "first": true,
  "last": true,
  "number": 0,
  "numberOfElements": 0,
  "pageable": {
    "page": 0,
    "size": 0,
    "sort": [
      "string"
    ]
  },
  "size": 0,
  "sort": {
    "sort": [
      "string"
    ]
  },
  "totalElements": 0,
  "totalPages": 0
}
```

</details> 

### 发起评论

**简要描述：**

- 评论自定义页面

**请求URL:**

- `/api/content/sheets/comments`

**请求方式：**

- `POST`

**参数：**

| 参数名                | 必选 | 类型               | 说明         |
| --------------------- | ---- | ------------------ | ------------ |
| **sheetCommentParam** | 是   | SSheetCommentParam | 评论参数模型 |
**参数属性：**

```json
{
  "author": "string",
  "authorUrl": "string",
  "content": "string",
  "email": "string",
  "parentId": 0,
  "postId": 0
}
```

**参数请求类型：**

- `application/json`

<details>
    <summary>返回示例</summary>

```json
{
  "author": "string",
  "authorUrl": "string",
  "content": "string",
  "createTime": "2019-06-11T09:25:50.004Z",
  "email": "string",
  "gavatarMd5": "string",
  "id": 0,
  "ipAddress": "string",
  "isAdmin": true,
  "parentId": 0,
  "status": "PUBLISHED",
  "userAgent": "string"
}
```

</details> 

## 标签

### 获取所有标签

**简要描述：**

- 获取所有标签

**请求URL:**

- `/api/content/tags`

**请求方式：**

- `GET`

**参数：**

| 参数名 | 必选 | 类型          | 说明                                                    |
| ------ | ---- | ------------- | ------------------------------------------------------- |
| more   | 否   | boolean       | 默认值为`false`,如果为`true`,则返回引用该标签的文章数量 |
| sort   | 否   | array[string] | 排序条件，默认标签的`createTime`排序                    |
<details>
    <summary>返回示例</summary>

```json
[
  {
    "createTime": "2019-06-11T09:27:16.617Z",
    "id": 0,
    "name": "string",
    "slugName": "string"
  }
]
```

</details> 

### 根据标签获取文章

**简要描述：**

- 根据标签的别名获取文章列表

**请求URL:**

- `/api/content/tags/{slugName}/posts`

**请求方式：**

- `GET`

**参数：**

| 参数名       | 必选 | 类型          | 说明                                 |
| ------------ | ---- | ------------- | ------------------------------------ |
| **slugName** | 是   | string        | 标签别名                             |
| page         | 否   | integer       | 分页条件。默认值为0                  |
| size         | 否   | integer       | 查询数量                             |
| sort         | 否   | array[string] | 排序条件，默认文章的`createTime`排序 |
<details>
    <summary>返回示例</summary>

```json
{
  "content": [
    {
      "createFrom": "ADMIN",
      "createTime": "2019-06-11T09:30:54.456Z",
      "disallowComment": true,
      "editTime": "2019-06-11T09:30:54.456Z",
      "id": 0,
      "likes": 0,
      "status": "PUBLISHED",
      "summary": "string",
      "template": "string",
      "thumbnail": "string",
      "title": "string",
      "topPriority": 0,
      "type": "POST",
      "updateTime": "2019-06-11T09:30:54.456Z",
      "url": "string",
      "visits": 0
    }
  ],
  "empty": true,
  "first": true,
  "last": true,
  "number": 0,
  "numberOfElements": 0,
  "pageable": {
    "page": 0,
    "size": 0,
    "sort": [
      "string"
    ]
  },
  "size": 0,
  "sort": {
    "sort": [
      "string"
    ]
  },
  "totalElements": 0,
  "totalPages": 0
}
```

</details> 

## 用户

### 获取个人信息

**简要描述：**

- 获取用户博客个人主页所显示的个人信息

**请求URL:**

- `/api/content/users/profile`

**请求方式：**

- `GET`

<details>
    <summary>返回示例</summary>

```json
{
  "avatar": "string",
  "createTime": "2019-06-11T09:36:11.127Z",
  "description": "string",
  "email": "string",
  "id": 0,
  "nickname": "string",
  "updateTime": "2019-06-11T09:36:11.127Z",
  "username": "string"
}
```

</details> 