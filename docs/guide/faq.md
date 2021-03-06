# 常见问题

## Q1. Halo 是什么？

`Halo` 是一款现代化的个人独立博客系统，给习惯写博客的同学一个更好的选择。

## Q2. 为什么默认的数据库是使用的 H2，而不是 MySQL？

虽然 `Halo` 支持 `MySQL`，但是作者并不建议使用 `MySQL`，因为一个博客而已，完全没必要单独跑一个 `MySQL` 服务。

### 使用 H2 的优劣：

优点：

- 能更快的完成 Halo 的搭建。
- 无需单独安装 `H2`，数据库随着 Halo 的启动而创建。
- 比 MySQL 更节省资源占用，尤其是你的服务器配置不佳的情况下。
- 性能方面与 MySQL 基本无异（对于这种小型应用），实测 1000 篇文章的情况下，毫无压力。
- 不会因为某个配置不对而导致 Halo 无法正常使用，没有乱七八糟的问题。
- 更符合 Halo 数据架构的特点，所有数据（数据库物理文件，主题文件，上传的附件，日志等）均放在 `~/.halo` 文件夹内，所以备份迁移极其方便。
- 如上所述，目前所有备份相关的功能均针对 H2。MySQL 的备份暂无计划。
- 一个误解：很多人认为 H2 通常仅作为开发环境测试所用，生产环境并不适用。错误的说法！请针对实际情况做选择。Halo 甚至可以支持 Oracle，但是有必要吗？作者已经使用两年，所以放心使用。

缺点：

- 管理不方便，虽然有在线的控制台，但是并不好用。

### 使用 MySQL 的优劣：

优点：

- 管理方便，你可以开启远程连接，在自己电脑即可管理数据库。不过目前我们已经做了一些 `开发者功能`，似乎也没必要怎么管理。

缺点（仅针对于 Halo）：

- 部署麻烦，还需要单独跑一个 MySQL，不能做到 Halo 开箱即用。
- 占用内存，尤其是你服务器内存不够的情况下，宛如雪上加霜。当然，服务器强壮的话可无视。
- 版本太多，当你安装了一个 Halo 不支持的版本（目前支持 5.7+）的时候，可能会无法正常使用，甚至无法正常启动。
- 配置繁琐，你可能需要配置如字符集这样的东西，对新手来说极不友好。（字符集 utf8mb4 collate utf8mb4_bin）
- 备份迁移麻烦，你不但需要备份 `~/.halo`，还需要导出数据库脚本。
- 目前暂不支持后台备份 MySQL 数据。

## Q3. 为什么项目里面没有 `SQL` 脚本，难道要我自己建表吗？

没有提供 `SQL` 脚本，当然不用自己建表，不管你是用的 `H2` 还是 `MySQL`，程序启动的时候就已经自动建好表了。另外，不想再有人问我为什么没有提供 `SQL` 脚本。

## Q4. 为什么上传主题或者附件会失败？（413 Request Entity Too Large）

这可能是由于 `Nginx` 的上传大小限制所导致的。可以在 `Nginx` 的配置文件下的 server 节点加入 `client_max_body_size 1024m;` 即可解决，如果 `1024m` 还不够，请自行断定，详细配置参考如下：

```nginx
server {
    listen       80;
    server_name  localhost;
    client_max_body_size 1024m;
}
```

> 如果想要禁用 `client_max_body_size`，请将值设置为 `0`。

## Q5. 为什么有些页面访问 404？

这可能是由于主题没有对应的模板导致的，假如我们需要访问所有分类目录的页面（`/categories`），但是你使用的主题下面并没有 `categories.ftl` 这个模板，就会导致 404。再比如我们需要访问相册页面（`/photos`），但是当前使用的主题下面并没有 `photos.ftl` 这个模板，所以也是无法访问的，页面能否访问的前提条件是有没有对应模板。总之，看主题支持情况，就目前来说，绝大部分已有主题是支持 `/（首页）`，`/archives（归档）`，`/links（友情链接）`，`/tags（标签列表）`，`/archives/{url}（文章页面）` 等页面的渲染的。另外，对于没有的模板，可以自行拓展哦。

## Q6. 为什么不支持 war 包部署？

理论上 `Spring Boot` 是提供 `war` 包的打包方式的，但是我们不提供 `war` 包。并且我们并没有使用 `war` 包进行测试，如果你非要使用，请自行打包并承担所有未知的问题。总之，别问我。

## Q7. 安装完成之后前台页面无样式。

请前往后台的博客设置，检查博客地址设置项是否正确，注意 `http` 和 `https` 的区分。

## Q8. 找不到主题上传的地方？

后台 -> 外观 -> 主题，右下角有个蓝色背景的浮动的白色的加号。然后点击一下，会出现安装主题的选项。

未完待续...

<div>
  <AdSense-Doc
  ad-client="ca-pub-5271828906478846"
  ad-slot="2656935500"
  ad-style="display:block; text-align:center;"
  ad-format="fluid"
  ></AdSense-Doc>
</div>
