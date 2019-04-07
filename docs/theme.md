# 主题制作文档

Halo的主题制作本身是很简单的，需要注意的是，Halo使用的模板引擎是Freemarker，所以部分语法请自行查看Freemarker的文档。

推荐使用下面的文件结构：

```bash
├── index.ftl
├── post.ftl
├── archives.ftl
├── links.ftl
├── tags.ftl
├── categories.ftl
├── screenshot.png
├── module
│   ├── comment.ftl
│   ├── macro.ftl
│   ├── options.ftl	
│   ├── post_entry.ftl
└── source
    ├── css
    ├── fonts
    ├── images
    └── js
```

其中，`index.ftl`,`post.ftl`,`comment.ftl`是必须要有的，至于`macro.ftl`宏模板是干嘛的，可以去看看Freemarker的文档。options.ftl是主题设置的页面，用于后台展示，必须位于module文件夹下面。注意：对于`archives.ftl`等页面，虽然可有可无，但是如果需要，请按照上面的的命名。



##资源路径

推荐使用如上文件结构，将css，js等文件放在source里面。

引用路径：/主题目录/source/资源文件，如：

```html
<link href="/material/source/css/index.css" rel="stylesheet">
<script src="/material/source/js/index.js"></script>
```



## 模板变量和自定义标签

### 公共模板变量

| 变量名                   | 说明                            |
| ------------------------ | ------------------------------- |
| user                     | 博主信息，属性参考[user](#user) |
| options.blog_title       | 博客名称                        |
| options.blog_url         | 博客地址                        |
| options.blog_logo        | Logo路径                        |
| options.blog_footer_info | 页脚信息                        |
| options.seo_keywords     | SEO关键字                       |
| options.seo_desc         | 博客描述                        |
| options.statistics_code  | 统计代码，如cnzz，百度          |

### 公共自定义标签

#### articleTag

| 变量名       | 说明                                                        |
| ------------ | ----------------------------------------------------------- |
| postsCount   | 文章总数，直接获取即可，`${postsCount}`                     |
| archives     | 归档信息，根据年份和月份归档，属性参考[archives](#archives) |
| archivesLess | 归档信息，根据年份归档，属性参考[archives](#archives)       |

#### commonTag

| 变量名     | 说明                                            |
| ---------- | ----------------------------------------------- |
| menus      | 菜单，属性参考[menus](#menus)                   |
| categories | 所有分类，属性参考[categories](#categories)     |
| links      | 所有友情链接，属性参考[links](#友情链接(links)) |
| tags       | 所有标签，属性参考[tags](#标签(tags))           |

标签使用方法：

```Html
<@标签名 method="变量名">
	//使用变量    
</@标签名>

如：获取菜单列表
<@commonTag method="menus">
    <#list menus?sort_by('menuSort') as menu>
        <li>
            <a href="${menu.menuUrl}">${menu.menuName} </a>
        </li>
    </#list>
</@commonTag>
```



### index.ftl

| 变量名 | 说明                                  |
| ------ | ------------------------------------- |
| posts  | 文章分页数据，属性参考[posts](#posts) |

### archives.ftl

| 变量名 | 说明                                  |
| ------ | ------------------------------------- |
| posts  | 文章分页数据，属性参考[posts](#posts) |

### links.ftl

| 变量名 | 说明                                  |
| ------ | ------------------------------------- |
| links  | 所有友情链接，属性参考[links](#links) |

### post.ftl

| 变量名     | 说明                                        |
| ---------- | ------------------------------------------- |
| post       | 文章数据，属性参考[post](#post)             |
| beforePost | 当前文章的上一篇文章，属性参考[post](#post) |
| afterPost  | 当前文章的下一篇文章，属性参考[post](#post) |
| comments   | 当前文章的评论                              |

### gallery.ftl

| 变量名    | 说明                                      |
| --------- | ----------------------------------------- |
| galleries | 图库数据，属性参考[galleries](#galleries) |

### tags.ftl

| 变量名 | 说明                            |
| ------ | ------------------------------- |
| tags   | 标签数据，属性参考[tags](#tags) |



## 模型列表

### 文章分页信息(posts)

| 属性名           | 类型             | 说明           | 备注                                          |
| ---------------- | ---------------- | -------------- | --------------------------------------------- |
| getContent       | List&lt;Post&gt; | 文章列表       | 实质是Post类的实体对象，属性参考[post](#post) |
| getTotalElements | Long             | 文章总条数     | 无                                            |
| getTotalPages    | int              | 总页数         | 无                                            |
| getNumber        | int              | 当前页码       | 无                                            |
| getSize          | int              | 每一页文章数   | 无                                            |
| hasNext          | boolean          | 是否有下一页   | 无                                            |
| hasPrevious      | boolean          | 是否有上一页   | 无                                            |
| isFirst          | boolean          | 是否为第一页   | 无                                            |
| isLast           | boolean          | 是否为最后一页 | 无                                            |

类型：Page&lt;Post&gt;

使用方法：

```html
//循环文章列表，其中的属性名为Post对象的属性
<#list posts.content as post>
	post.属性名    
</#list>

//获取分页信息属性，其中的属性名为Page<Post>的属性
${posts.属性名}
```



### 文章信息(post)

| 属性名        | 类型                 | 说明                   | 备注                              |
| ------------- | -------------------- | ---------------------- | --------------------------------- |
| postId        | Long                 | 文章编号               | 唯一                              |
| user          | User                 | 发表作者               | 无                                |
| postTitle     | String               | 文章标题               | 无                                |
| postType      | String               | 文章类型               | 文章(post)，页面(page)            |
| postContentMd | String               | 文章内容，Markdown格式 | 一般不在页面上显示                |
| postContent   | String               | 文章内容，html格式     | 无                                |
| postUrl       | String               | 文章路径名             | 唯一                              |
| postSummary   | String               | 文章摘要               | 无                                |
| categories    | List&lt;Category&gt; | 文章分类列表           | 属性参考[categories](#categories) |
| tags          | List&lt;Tag&gt;      | 文章标签列表           | 属性参考[tags](#tags)             |
| comments      | List&lt;Comment&gt;  | 文章评论列表           | 无                                |
| postDate      | Date                 | 文章发表时间           | 无                                |
| postUpdate    | Date                 | 文章最后更新时间       | 无                                |
| postStatus    | Integer              | 文章状态               | 0：已发表，1：草稿，2：回收站     |

类型：Post

可使用页面：post.ftl

使用方法：

```html
${post.属性名}
```



### 归档信息(archives)

| 属性名 | 类型             | 说明         | 备注                  |
| ------ | ---------------- | ------------ | --------------------- |
| year   | String           | 归档年份     | 无                    |
| month  | String           | 归档月份     | 无                    |
| count  | String           | 对应的文章数 | 无                    |
| posts  | List&lt;Post&gt; | 文章列表     | 属性参考[post](#post) |

类型：List&lt;Archive&gt;

使用方法：

```html
//循环文章列表，其中属性名为Post对象的属性
<#list archives as archive>
    <#list archive.posts as post>
        ${post.属性名}
    </#list>
</#list>

//获取归档信息，其中属性名为archives的属性名
${archives.属性名}

//显示所有文章归档示例
<#list archives as archive>
	${archive.year}年-${archive.month}月（${archive.count}）
    <#list archive.posts as post>
        ${post.属性名}
    </#list>
</#list>
```



### 友情链接(links)

| 属性名   | 类型   | 说明         | 备注 |
| -------- | ------ | ------------ | ---- |
| linkId   | Long   | 友情链接编号 | 唯一 |
| linkName | String | 友情链接名称 | 无   |
| linkUrl  | String | 友情链接地址 | 无   |
| linkPic  | String | 友情链接头像 | 无   |
| linkDesc | String | 友情链接描述 | 无   |

类型：List&lt;Link&gt;

使用方法：

```html
<#list links as link>
	${link.属性名}
</#list>
```



### 菜单(menus)

| 属性名   | 类型    | 说明     | 备注         |
| -------- | ------- | -------- | ------------ |
| menuId   | Long    | 菜单编号 | 唯一         |
| menuName | String  | 菜单名称 | 无           |
| menuUrl  | String  | 菜单路径 | 无           |
| menuSort | Integer | 排序     | 无           |
| menuIcon | String  | 菜单图标 | 需要主题支持 |

类型：List&lt;Menu&gt;

使用方法：

```html
//获取所有菜单
<#list menus as menu>
	${menu.属性名}
</#list>

//示例，按照menuSort排序
<#list menus?sort_by('menuSort') as menu>
    <li>
        <a href="${menu.menuUrl}">${menu.menuName} </a>
    </li>
</#list>
```



### 标签(tags)

| 属性名  | 类型             | 说明         | 备注                  |
| ------- | ---------------- | ------------ | --------------------- |
| tagId   | Long             | 标签编号     | 唯一                  |
| tagName | String           | 标签名       | 无                    |
| tagUrl  | String           | 标签路径     | 唯一                  |
| posts   | List&lt;Post&gt; | 标签下的文章 | 属性参考[post](#post) |

类型：List&lt;Tag&gt;

使用方法：

```html
//获取所有标签
<#list tags as tag>
	${tag.属性名}
</#list>

//获取所有标签以及对应的文章示例
<#list tags as tag>
	${tag.tagName}
	<#list tag.posts as post>
        ${post.postTitle}
    </#list>    
</#list>
```



### 分类目录(categories)

| 属性名   | 类型             | 说明                 | 备注                  |
| -------- | ---------------- | -------------------- | --------------------- |
| cateId   | Long             | 分类目录编号         | 唯一                  |
| cateName | String           | 分类目录名称         | 无                    |
| cateUrl  | String           | 分类目录路径         | 唯一                  |
| cateDesc | String           | 描述                 | 无                    |
| posts    | List&lt;Post&gt; | 分类目录所对应的文章 | 属性参考[post](#post) |

类型：List&lt;Category&gt;

使用方法：

```
//获取所有分类目录
<#list categories as cate>
	${cate.属性名}
</#list>

//获取所有分类目录以及对应的文章示例
<#list categories as cate>
	${cate.tagName}
	<#list cate.posts as post>
        ${post.postTitle}
    </#list>    
</#list>
```



### 图库(galleries)

| 属性名              | 类型   | 说明                 | 备注 |
| ------------------- | ------ | -------------------- | ---- |
| galleryId           | Long   | 图片编号             | 唯一 |
| galleryName         | String | 图片名称             | 无   |
| galleryDesc         | String | 图片描述             | 无   |
| galleryDate         | String | 图片日期（拍摄日期） | 无   |
| galleryLocation     | String | 拍摄地点             | 无   |
| galleryThumbnailUrl | String | 缩略图地址           | 无   |
| galleryUrl          | String | 图片地址             | 无   |

类型：List&lt;Gallery&gt;

使用方法：

```html
//展示所有图片
<#list galleries as gallery>
	${gallery.属性名}
</#list>
```



### 设置选项(options)

| 属性名      | 类型   | 说明     | 备注 |
| ----------- | ------ | -------- | ---- |
| optionName  | String | 选项名称 | 唯一 |
| optionValue | String | 选项值   | 无   |

类型：Map&lt;Options&gt;

使用方法：

```html
//获取某个设置的值(一般只用这个方法)
${options.选项名称}
```



### 博主信息(user)

| 属性名          | 类型   | 说明         | 备注         |
| --------------- | ------ | ------------ | ------------ |
| userId          | Long   | 用户编号     | 唯一         |
| userName        | String | 用户名       | 一般用于登录 |
| userDisplayName | String | 显示名称     | 显示于页面的 |
| userPass        | String | 密码         | 妈的5加密    |
| userEmail       | String | 邮箱         | 无           |
| userAvatar      | String | 博主头像地址 | 无           |
| userDesc        | String | 说明         | 无           |

类型：User

使用方法：

```html
//如：显示博主头像
<image src="${user.userAvatar}"></image>

//如：显示博主名称
<span>${user.userDisplayName}</span>
```



## 跳转路径

| 路径                     | 渲染页面     | 说明                                                |
| ------------------------ | ------------ | --------------------------------------------------- |
| /                        | index.ftl    | 首页                                                |
| /index                   | index.ftl    | 首页                                                |
| /page/{page}             | index.ftl    | 首页文章分页，{page}为页码                          |
| /archives                | archives.ftl | 文章归档页                                          |
| /archives/page/{page}    | archives.ftl | 文章归档分页，{page}为页码                          |
| /archives/{year}/{month} | archives.ftl | 文章归档，根据年份月份，{year}为年份，{month}为月份 |
| /archives/{postUrl}      | post.ftl     | 文章详情页，{postUrl}为文章路径                     |
| /gallery                 | gallery.ftl  | 图库页面                                            |
| /links                   | links.ftl    | 友情链接页面                                        |
| /p/{postUrl}             | post.ftl     | 自定义页面，{postUrl}为页面路径                     |
| /tags                    | tags.ftl     | 标签页面                                            |
| /feed                    | -            | rss页面                                             |
| /feed.xml                | -            | rss页面                                             |
| /atom                    | -            | rss页面                                             |
| /atom.xml                | -            | rss页面                                             |
| /sitemap.xml             | -            | 站点地图                                            |



##  设置选项

> 如果需要对主题提供设置选项，请在module文件夹内新建options.ftl文件（硬性要求），下面将提供模板标准，只需要对其进行添加或修改即可。

### 模板标准（options.ftl）

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="/static/plugins/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/static/plugins/toast/css/jquery.toast.min.css">
    <link rel="stylesheet" href="/static/css/AdminLTE.min.css">
    <style>
        .themeSetting,.themeImg{
            padding-top: 15px;
            padding-bottom: 15px;
        }
        .form-horizontal .control-label{
            text-align: left;
        }
    </style>
</head>
<body>
<div class="container-fluid">
    <div class="row">
        <!-- 这里为预览图，只需要将图片命名为screenshot.png放在主题更目录就可以啦 -->
        <div class="col-lg-6 themeImg">
            <img src="/${themeDir}/screenshot.png" style="width: 100%;">
        </div>
        <div class="col-md-6 themeSetting">
            <div class="nav-tabs-custom">
                <!-- tab标签，可以将一些设置分类 -->
                <ul class="nav nav-tabs">
                    <li class="active">
                        <a href="#test1" data-toggle="tab">测试1</a>
                    </li>
                    <li>
                        <a href="#test2" data-toggle="tab">测试2</a>
                    </li>
                    <li>
                        <a href="#about" data-toggle="tab">关于</a>
                    </li>
                </ul>
                <div class="tab-content">
                    
                    <!-- testOptions1 -->
                    <div class="tab-pane active" id="test1">
                        <form method="post" class="form-horizontal" id="testOptions1">
                            <div class="box-body">
                                
                                <!-- 测试选项testItem -->
                                <div class="form-group">
                                    <label for="testItem" class="col-sm-4 control-label">testItem：</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="testItem" name="test_item" value="${options.test_item?if_exists}" >
                                    </div>
                                </div>
                            </div>
                            <div class="box-footer">
                                <button type="button" class="btn btn-primary btn-sm pull-right" onclick="saveThemeOptions('testOptions1')">保存设置</button>
                            </div>
                        </form>
                    </div>
                    
                    <!--testOptions2-->
                    <div class="tab-pane" id="test2">
                        <form method="post" class="form-horizontal" id="testOptions2">
                            <div class="box-body">
                                <!-- 设置项 -->
                            </div>
                            <div class="box-footer">
                                <button type="button" class="btn btn-primary btn-sm pull-right" onclick="saveThemeOptions('testOptions2')">保存设置</button>
                            </div>
                        </form>
                    </div>
                    
                    <!-- 关于该主题，一些作者的信息 -->
                    <div class="tab-pane" id="about">
                        <div class="box box-widget widget-user-2">
                            <div class="widget-user-header bg-blue">
                                <div class="widget-user-image">
                                    <!-- 头像 -->
                                    <img class="img-circle" src="#" alt="User Avatar">
                                </div>
                                <h3 class="widget-user-username">作者名字</h3>
                                <h5 class="widget-user-desc">描述</h5>
                            </div>
                            <div class="box-footer no-padding">
                                <ul class="nav nav-stacked">
                                    <li><a target="_blank" href="#">作者主页</a></li>
                                    <li><a target="_blank" href="#">原主题地址</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
<script src="/static/plugins/jquery/jquery.min.js"></script>
<script src="/static/plugins/bootstrap/js/bootstrap.min.js"></script>
<script src="/static/plugins/toast/js/jquery.toast.min.js"></script>
<script src="/static/plugins/layer/layer.js"></script>
<script src="/static/js/app.js"></script>
<script>
    function saveThemeOptions(option) {
        var param = $('#'+option).serialize();
        $.ajax({
            type: 'post',
            url: '/admin/option/save',
            data: param,
            success: function (data) {
                showMsg("保存成功！","success",1000);
            }
        });
    }
    function openAttach(id) {
        layer.open({
            type: 2,
            title: '所有附件',
            shadeClose: true,
            shade: 0.5,
            area: ['90%', '90%'],
            content: '/admin/attachments/select?id='+id,
            scrollbar: false
        });
    }
</script>
</html>
```

### 表单组件

#### 文本框

```html
<div class="form-group">
    <label for="" class="col-sm-4 control-label">Test：</label>
    <div class="col-sm-8">
        <input type="text" class="form-control" id="" name="" value="" >
    </div>
</div>
```

#### 多行文本框

```html
<div class="form-group">
    <label for="materialOtherPostLicense" class="col-sm-4 control-label">Test：</label>
    <div class="col-sm-8">
        <textarea class="form-control" rows="3" id="" name="" style="resize: none"></textarea>
    </div>
</div>
```

#### 下拉框

```html
<div class="form-group">
    <label for="materialBackgroundBing" class="col-sm-4 control-label">Test：</label>
    <div class="col-sm-8">
        <select class="form-control" id="" name="">
            <option value="false">value1</option>
            <option value="true">value2</option>
        </select>
    </div>
</div>
```

#### 单选按钮

```html
<div class="form-group">
    <label for="" class="col-sm-4 control-label">Test：</label>
    <div class="col-sm-8">
        <label class="radio-inline">
            <input type="radio" name="theme_anatole_sns_rss" id="anatoleSnsRss" value="true"> value1
        </label>
        <label class="radio-inline">
            <input type="radio" name="theme_anatole_sns_rss" id="anatoleSnsRss" value="false"> value2
        </label>
    </div>
</div>
```

> 1. 不管是form表单的id还是表单元素的id或name，命名统一在前面加上主题名，如：`anatoleIndexCoverImg` `anatole_index_cover_img`
> 2. 设置选项使用方法：`${options.选项名}`，如：`${options.anatole_index_cover_img}`。
> 3. 如果是移植的别人的主题，请保证对原作者的尊重，必须注明作者和原主题地址。