# 常见问题

## Q1. Halo 是什么？
> 使用 Java 开发的博客系统。

## Q2. 为什么要做 Halo ，明明有那么多可以选择？
> 觉得其他的博客系统不爽，自己撸。

## Q3. 导入项目到 IDEA 或者 Eclipse 后大量报错。
> 请检查是否安装了 `Lombok` 插件。

## Q4. 使用 IDEA 或者 Eclipse 运行之后无法获取端口，如：`localhost:null`。
> 请将 resources 标识为 `Resources` 。具体解决方法：右击 `resources` 文件夹 -> `Mark Directory as` -> `Resources root` -> 重新运行。

## Q5. 服务器使用一键安装脚本报错。
> 出现诸如\n\r这种报错，一般解决办法如下：
```bash
# 安装dos2unix
$ yum install dos2unix -y
# 使用dos2unix格式化halo-cli.sh脚本
$ dos2unix halo-cli.sh
# 执行安装程序
$ sh halo-cli.sh -i
```

## Q6. 部署到服务器之后访问不了。
> 请检查Halo的运行端口（默认是8090），并打开服务器的对应端口，如果安装了宝塔面板，还需要在宝塔面板的安全里把对应端口打开。

## Q7. 为什么默认的数据库是使用的H2，而不是MySQL。
> 虽然Halo支持MySQL，但是我并不建议使用MySQL，因为一个博客而已，完全没必要单独跑一个MySQL服务，并且H2也挺不错的:)。

## Q8. 为什么打包之后，targer目录下的jar运行不了？
> 因为target目录下的jar包只包含了编译好的class文件，并没有依赖和`resources`。打包好的东西应该在`target/dist/halo`里面，有 `halo-latest.jar` `lib` `resources`，这三者缺一不可，如果你要自己打包上传的话，请把halo文件夹下的东西都传上去。

## Q9. 为什么不直接打包成一个jar文件，方便很多，你是不是脑子瓦特了？
> 我脑子没有坏掉，因为主题是上传到 `resources` 目录下的，所以把 `resources` 独立出来更好。又因为lib实在太大，如果你要自己打包上传的话，lib几乎是没必要每次都更新的。当然，如果你用源码部署，这些问题都不会存在。

## Q10. 为什么项目里面没有 `SQL` 脚本，难道要我自己建表吗？
> 没有提供 `SQL` 脚本，当然不用自己建表，程序启动的时候就已经自动建好表了。另外，不想再有人问我为什么没有提供 `SQL` 脚本。

## Q11. 为什么主题管理下没有任何主题，且上传也无用？
> 不支持高版本 JDK ，请安装 JDK8。暂不清楚是 JDK 的问题还是哪儿的问题。

未完待续...