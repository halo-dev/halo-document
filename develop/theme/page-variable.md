# 页面变量

## index.ftl

> 该模板渲染博客首页页面。

**访问路径：**/

**可用变量：**

| 变量     | 类型               | 说明               |
| -------- | ------------------ | ------------------ |
| is_index | Boolean            | 是否为博客首页     |
| posts    | Page\<PostListVO\> | 文章列表及分页信息 |
| rainbow  | int[]              | 彩虹分页页码       |

## post.ftl

> 该模板渲染文章详情页面。

**访问路径：**/archives/{url}

**可用变量：**

| 变量       | 类型             | 说明           |
| ---------- | ---------------- | -------------- |
| is_post    | Boolean          | 是否为文章页面 |
| post       | Post             | 无             |
| categories | List\<Category\> | 文章的分类     |
| tags       | List\<Tag\>      | 文章的标签     |
| nextPost   | Post             | 下一篇文章     |
| prePost    | Post             | 上一篇文章     |

## archives.ftl

> 该模板渲染文章归档页面。

**访问路径：**/archives

**分页路径：**/archives/page/{page}

**可用变量：**

| 变量        | 类型               | 说明               |
| ----------- | ------------------ | ------------------ |
| is_archives | Boolean            | 是否为归档页面     |
| posts       | Page\<PostListVO\> | 文章列表及分页信息 |
| pageRainbow | int[]              | 彩虹分页页码       |

## sheet.ftl

> 该模板渲染自定义页面。

**访问路径：**/s/{url}

**可用变量：**

| 变量     | 类型    | 说明             |
| -------- | ------- | ---------------- |
| is_sheet | Boolean | 是否为自定义页面 |
| sheet    | Sheet   | 无               |

## photos.ftl

> 该模板渲染图库页面，用于展示用户在后台图库添加的图片。

**访问路径：**/photos

**页面变量：**

::: tip 注意
和图库相关的其他数据，可以直接使用 [photoTag](/develop/theme/custom-tag.html#phototag（图库）)。
:::

## links.ftl

> 该模板渲染友情链接页面，用于展示用户在后台添加的友情链接。

**访问路径：**/links

**页面变量：**

::: tip 注意
和友情链接相关的其他数据，可以直接使用 [linkTag](/develop/theme/custom-tag.html#linktag（友情链接）)。
:::

## journals.ftl

> 该模板渲染日志页面，用于展示用户在后台所添加的日志。

**访问路径：**/journals

**分页路径：**/journals/page/{page}

**页面变量：**

| 变量       | 类型            | 说明               |
| ---------- | --------------- | ------------------ |
| is_journal | Boolean         | 是否为日志页面     |
| journals   | Page\<Journal\> | 日志列表及分页数据 |
| rainbow    | int []          | 彩虹分页页码       |

## categories.ftl

> 该模板渲染分类列表页面，用于展示用户在后台添加的所有分类目录。

**访问路径：**/categories

**页面变量：**

| 变量        | 类型    | 说明           |
| ----------- | ------- | -------------- |
| is_category | Boolean | 是否为分类页面 |

::: tip 注意
和分类相关的其他数据，可以直接使用 [categoryTag](/develop/theme/custom-tag.html#categorytag（分类）)。
:::

## category.ftl

> 该模板渲染单个分类的所有文章页面。

**访问路径：**/categories/{slugName}

**分页路径：**/categories/{slugName}/page/{page}

**可用变量：**

| 变量        | 类型               | 说明               |
| ----------- | ------------------ | ------------------ |
| is_category | Boolean            | 是否为单个分类页面 |
| posts       | Page\<PostListVO\> | 分类下的文章列表   |
| rainbow     | int []             | 彩虹分页页码       |
| category    | Category           | 分类信息           |

## tags.ftl

> 该模板渲染标签列表（标签云）页面，用于展示用户在后台添加的所有标签。

**访问路径：**/tags

**可用变量：**

| 变量    | 类型    | 说明           |
| ------- | ------- | -------------- |
| is_tags | Boolean | 是否为标签页面 |

::: tip 注意
和标签相关的其他数据，可以直接使用 [tagTag](/develop/theme/custom-tag.html#tagtag（标签）)。
:::

## tag.ftl

> 该模板渲染单个标签的所有文章页面。

**访问路径：**/tags/{slugName}

**分页路径：**/tags/{slugName}/page/{page}

**页面变量：**

| 变量    | 类型               | 说明               |
| ------- | ------------------ | ------------------ |
| is_tag  | Boolean            | 是否为单个标签页面 |
| posts   | Page\<PostListVO\> | 文章列表及分页信息 |
| rainbow | int []             | 彩虹分页页码       |
| tag     | Tag                | 标签信息           |

## search.ftl

> 该模板渲染查询文章后的结果页面，展示用户查询到的文章。

**访问路径：**/search

**分页路径：**/search/page/{page}

**页面变量：**

| 变量      | 类型               | 说明               |
| --------- | ------------------ | ------------------ |
| is_search | Boolean            | 是否为搜索页面     |
| keyword   | String             | 搜索关键词         |
| posts     | Page\<PostListVO\> | 文章列表及分页信息 |
| rainbow   | int []             | 彩虹分页页码       |
