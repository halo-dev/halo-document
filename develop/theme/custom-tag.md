# 自定义标签

> 自定义标签可以在页面的任意地方调用。

## postTag（文章）

### 获取最新文章

#### 入参

| 参数   | 值                     | 说明 |
| ------ | ---------------------- | ---- |
| method | latest                 | 无   |
| top    | 需要获取的条数，如：10 | 无   |

#### 返回参数

| 参数  | 类型         | 说明                                                         |
| ----- | ------------ | ------------------------------------------------------------ |
| posts | List\<post\> | 详细字段参考 [Post](/develop/theme/model-variable.html#post) |

#### 语法格式

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

### 获取所有文章条数

#### 入参

| 参数   | 值                     | 说明 |
| ------ | ---------------------- | ---- |
| method | count                 | 无   |

#### 返回参数

| 参数  | 类型         | 说明                                                         |
| ----- | ------------ | ------------------------------------------------------------ |
| count | long | 无 |

#### 语法格式

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

### 根据年份归档

#### 入参

| 参数   | 值                     | 说明 |
| ------ | ---------------------- | ---- |
| method | archiveYear                 | 无   |

#### 返回参数

| 参数  | 类型         | 说明                                                         |
| ----- | ------------ | ------------------------------------------------------------ |
| archives | List\<ArchiveYearVO\> | 无 |

#### 语法格式

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

### 根据年月归档

#### 入参

| 参数   | 值                     | 说明 |
| ------ | ---------------------- | ---- |
| method | archiveMonth                 | 无   |

#### 返回参数

| 参数  | 类型         | 说明                                                         |
| ----- | ------------ | ------------------------------------------------------------ |
| archives | List\<ArchiveMonthVO\> | 无 |

#### 语法格式

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

### 根据分类 id 查询文章

#### 入参

| 参数   | 值                     | 说明 |
| ------ | ---------------------- | ---- |
| method | listByCategoryId                 | 无   |
| categoryId | 分类 id                 | 无   |

#### 返回参数

| 参数  | 类型         | 说明                                                         |
| ----- | ------------ | ------------------------------------------------------------ |
| posts | List\<Post\> | 无 |

#### 语法格式

```html
<@postTag method="listByCategoryId" categoryId="分类 id">
// 返回参数：posts
</@postTag>
```

### 根据标签 id 查询文章

#### 入参

| 参数   | 值                     | 说明 |
| ------ | ---------------------- | ---- |
| method | listByTagId                 | 无   |
| tagId | 标签 id                 | 无   |

#### 返回参数

| 参数  | 类型         | 说明                                                         |
| ----- | ------------ | ------------------------------------------------------------ |
| posts | List\<Post\> | 无 |

#### 语法格式

```html
<@postTag method="listByTagId" tagId="标签 id">
// 返回参数：posts
</@postTag>
```

## commentTag（评论）

### 获取最新评论

#### 入参

| 参数   | 值                     | 说明 |
| ------ | ---------------------- | ---- |
| method | latest                 | 无   |
| top | 想要获取的条数，如：10                 | 无   |

#### 返回参数

| 参数  | 类型         | 说明                                                         |
| ----- | ------------ | ------------------------------------------------------------ |
| comments | List\<Comment\> | 无 |

#### 语法格式

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

### 获取所有评论条数

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

## menuTag（菜单）

### 获取所有菜单

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

### 获取多级菜单列表

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

## categoryTag（分类）

### 获取所有分类

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

### 根据文章 id 获取分类

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

### 获取所有分类条数

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

## tagTag（标签）

### 获取所有标签

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

### 根据文章 id 获取标签

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

### 获取所有标签条数

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

## photoTag（图库）

### 获取所有图片

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

### 获取图片组

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

### 根据分组获取图片

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

### 获取所有图片条数

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

## linkTag（友情链接）

### 获取所有友情链接

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

### 获取友情链接组

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

### 获取所有友情链接条数

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
