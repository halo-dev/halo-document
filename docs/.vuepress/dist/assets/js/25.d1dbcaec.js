(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{278:function(a,t,s){"use strict";s.r(t);var e=s(9),n=Object(e.a)({},function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"使用-centos-部署-halo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用-centos-部署-halo","aria-hidden":"true"}},[a._v("#")]),a._v(" 使用 CentOS 部署 Halo")]),a._v(" "),s("p",[a._v("在 "),s("code",[a._v("CentOS 7.x")]),a._v(" 上安装，配置并运行 "),s("code",[a._v("Halo")]),a._v(" 的指南。")]),a._v(" "),s("h2",{attrs:{id:"环境要求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#环境要求","aria-hidden":"true"}},[a._v("#")]),a._v(" 环境要求")]),a._v(" "),s("p",[a._v("为了在使用过程中不出现意外的事故，给出下列推荐的配置")]),a._v(" "),s("ul",[s("li",[a._v("CentOS 7.x")]),a._v(" "),s("li",[a._v("1G RAM 的服务器")]),a._v(" "),s("li",[a._v("Oracle JRE 1.8 / Open JRE 1.8")]),a._v(" "),s("li",[a._v("Nginx/Caddy")])]),a._v(" "),s("p",[a._v("在开始之前，最好先到域名服务商解析域名，设置 A 记录并指向服务器的 IP 地址，并确保已经正确解析以及没有被工信部拦截（国内服务器需备案），你可以在本地使用 Ping 命令检查域名是否已经正确解析到了服务器的 IP 地址。以方便在安装过程中为域名配置 SSL 证书。")]),a._v(" "),s("h2",{attrs:{id:"服务器配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#服务器配置","aria-hidden":"true"}},[a._v("#")]),a._v(" 服务器配置")]),a._v(" "),s("h3",{attrs:{id:"更新软件包"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#更新软件包","aria-hidden":"true"}},[a._v("#")]),a._v(" 更新软件包")]),a._v(" "),s("p",[a._v("请确保服务器的软件包已经是最新的。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" yum update -y\n")])])]),s("h3",{attrs:{id:"安装-java-运行环境"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-java-运行环境","aria-hidden":"true"}},[a._v("#")]),a._v(" 安装 Java 运行环境")]),a._v(" "),s("blockquote",[s("p",[a._v("若已经存在 Java 运行环境的可略过这一步。")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 安装 OpenJDK 软件包")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" yum "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" java-1.8.0-openjdk\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 检测是否安装成功")]),a._v("\njava -version\n")])])]),s("p",[a._v("当然，这只是其中一种比较简单的安装方式，你也可以用其他方式，并不是强制要求使用这种方式安装。")]),a._v(" "),s("div",[s("AdSense-Doc",{attrs:{"ad-client":"ca-pub-5271828906478846","ad-slot":"2656935500","ad-style":"display:block; text-align:center;","ad-format":"fluid"}})],1),a._v(" "),s("h2",{attrs:{id:"安装-halo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-halo","aria-hidden":"true"}},[a._v("#")]),a._v(" 安装 Halo")]),a._v(" "),s("h3",{attrs:{id:"下载配置文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#下载配置文件","aria-hidden":"true"}},[a._v("#")]),a._v(" 下载配置文件")]),a._v(" "),s("p",[a._v("考虑到部分用户的需要，可能需要自定义比如端口等设置项，我们提供了公共的配置文件，并且该配置文件是完全独立于安装包的。当然，你也可以使用安装包内的默认配置文件，但是安装包内的配置文件是不可修改的。请注意：配置文件的路径为 "),s("code",[a._v("~/.halo/application.yaml")]),a._v("。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 下载配置文件到 ~/.halo 目录")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -o ~/.halo/application.yaml --create-dirs https://raw.githubusercontent.com/halo-dev/halo-common/master/application-template.yaml\n")])])]),s("h3",{attrs:{id:"修改配置文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#修改配置文件","aria-hidden":"true"}},[a._v("#")]),a._v(" 修改配置文件")]),a._v(" "),s("p",[a._v("完成上一步操作，我们就可以自己配置 "),s("code",[a._v("Halo")]),a._v(" 的运行端口，以及数据库相关的配置了。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 使用 Vim 工具修改配置文件")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vim")]),a._v(" ~/.halo/application.yaml\n")])])]),s("p",[a._v("打开之后我们可以看到")]),a._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("server")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("port")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("8090")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("spring")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("datasource")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("type")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" com.zaxxer.hikari.HikariDataSource\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# H2 Database 配置，如果你需要使用 MySQL，请注释掉该配置并取消注释 MySQL 的配置。")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("driver-class-name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" org.h2.Driver\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("url")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" jdbc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("h2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("file"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("~/halo/db/halo\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("username")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" admin\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("password")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# MySQL 配置，如果你需要使用 H2Database，请注释掉该配置并取消注释上方 H2Database 的配置。")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#    driver-class-name: com.mysql.cj.jdbc.Driver")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#    url: jdbc:mysql://127.0.0.1:3306/halodb?characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#    username: root")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#    password: 123456")]),a._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# H2 Database 的控制台相关配置，如果你使用的是 MySQL ，请注释掉下方内容。")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("h2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("console")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("settings")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("web-allow-others")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token boolean important"}},[a._v("false")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("path")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" /h2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("console\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("enabled")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token boolean important"}},[a._v("false")]),a._v("\n")])])]),s("ol",[s("li",[a._v("如果需要自定义端口，修改 "),s("code",[a._v("server")]),a._v(" 节点下的 "),s("code",[a._v("port")]),a._v(" 即可。")]),a._v(" "),s("li",[a._v("默认使用的是 "),s("code",[a._v("H2 Database")]),a._v(" 数据库，这是一种嵌入式的数据库，使用起来非常方便。需要注意的是，默认的用户名和密码为 "),s("code",[a._v("admin")]),a._v(" 和 "),s("code",[a._v("123456")]),a._v("，这个是自定义的，最好将其修改，并妥善保存。")]),a._v(" "),s("li",[a._v("如果需要使用 "),s("code",[a._v("MySQL")]),a._v(" 数据库，需要将 "),s("code",[a._v("H2 Database")]),a._v(" 的所有相关配置都注释掉，并取消 "),s("code",[a._v("MySQL")]),a._v(" 的相关配置。另外，"),s("code",[a._v("MySQL")]),a._v(" 的默认数据库名为 "),s("code",[a._v("halodb")]),a._v("，请自行配置 "),s("code",[a._v("MySQL")]),a._v(" 并创建数据库，以及修改配置文件中的用户名和密码。")]),a._v(" "),s("li",[s("code",[a._v("h2")]),a._v(" 节点为 "),s("code",[a._v("H2 Database")]),a._v(" 的控制台配置，默认是关闭的，如需使用请将 "),s("code",[a._v("h2.console.settings.web-allow-others")]),a._v(" 和 "),s("code",[a._v("h2.console.enabled")]),a._v(" 设置为 "),s("code",[a._v("true")]),a._v("。控制台地址即为 "),s("code",[a._v("域名/h2-console")]),a._v("。注意：非紧急情况，不建议开启该配置。")])]),a._v(" "),s("div",{staticClass:"tip custom-block"},[s("p",{staticClass:"custom-block-title"},[a._v("注意")]),a._v(" "),s("p",[a._v("使用 MySQL 之前，必须要先新建一个 "),s("code",[a._v("halodb")]),a._v(" 数据库。")]),a._v(" "),s("div",{staticClass:"language-sql extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sql"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("create")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("database")]),a._v(" halodb "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("character")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("set")]),a._v(" utf8mb4 "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("collate")]),a._v(" utf8mb4_bin"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])])]),a._v(" "),s("h3",{attrs:{id:"运行-halo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运行-halo","aria-hidden":"true"}},[a._v("#")]),a._v(" 运行 Halo")]),a._v(" "),s("p",[a._v("Halo 的整个应用程序只有一个 Jar 包，且不包含用户的任何配置，它放在任何目录都是可行的。需要注意的是，Halo 的整个额外文件全部存放在 "),s("code",[a._v("~/.halo")]),a._v(" 目录下，包括 "),s("code",[a._v("application.yaml（用户配置文件）")]),a._v("，"),s("code",[a._v("template/themes（主题目录）")]),a._v("，"),s("code",[a._v("upload（附件上传目录）")]),a._v("，"),s("code",[a._v("halo.db.mv（数据库文件）")]),a._v("。一定要保证 "),s("code",[a._v("~/.halo")]),a._v(" 的存在，你博客的所有资料可都存在里面。所以你完全不需要担心安装包的安危，它仅仅是个服务而已。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 下载最新的 Halo 安装包")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("wget")]),a._v(" https://github.com/halo-dev/halo/releases/download/v1.0.2/halo-1.0.2.jar -O halo-latest.jar\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 启动 Halo")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("nohup")]),a._v(" java -jar halo-latest.jar "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("/dev/null 2"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&")]),a._v("1"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&")]),a._v("\n")])])]),s("div",{staticClass:"tip custom-block"},[s("p",{staticClass:"custom-block-title"},[a._v("注意")]),a._v(" "),s("p",[a._v("如果下载速度非常缓慢的话，可尝试关闭之后重新下载。")])]),a._v(" "),s("h3",{attrs:{id:"更新-halo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#更新-halo","aria-hidden":"true"}},[a._v("#")]),a._v(" 更新 Halo")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 下载最新的 Halo 安装包")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("wget")]),a._v(" https://github.com/halo-dev/halo/releases/download/v1.0.2/halo-1.0.2.jar -O halo-latest.jar\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查询 Halo 占用的pid")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ps")]),a._v(" -ef "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("grep")]),a._v(" halo\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 停止 Halo 进程")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("kill")]),a._v(" -9 pid\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 运行 Halo")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("nohup")]),a._v(" java -jar halo-latest.jar "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("/dev/null 2"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&")]),a._v("1"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&")]),a._v("\n")])])]),s("h3",{attrs:{id:"进阶配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#进阶配置","aria-hidden":"true"}},[a._v("#")]),a._v(" 进阶配置")]),a._v(" "),s("p",[a._v("上面我们已经完成了 Halo 的整个配置和安装过程，接下来我们对其进行更完善的配置，比如："),s("code",[a._v("需要开机自启？")]),a._v("，"),s("code",[a._v("更简单的启动方式？")])]),a._v(" "),s("p",[a._v("实现以上功能我们只需要新增一个配置文件即可，也就是使用 "),s("code",[a._v("Systemd")]),a._v(" 来完成这些工作。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 下载 Halo 官方的 halo.service 模板")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -o /etc/systemd/system/halo.service --create-dirs https://raw.githubusercontent.com/halo-dev/halo-common/master/halo.service\n")])])]),s("p",[a._v("下载完成之后，我们还需要对其进行修改。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 修改 halo.service")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vim")]),a._v(" /etc/systemd/system/halo.service\n")])])]),s("p",[a._v("打开之后我们可以看到")]),a._v(" "),s("div",{staticClass:"language-conf extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("[Unit]\nDescription=Halo Service\nDocumentation=https://halo.run\nAfter=network-online.target\nWants=network-online.target\n\n[Service]\nType=simple\nExecStart=/usr/bin/java -server -jar jar-path\nExecStop=/bin/kill -s QUIT $MAINPID\nRestart=always\nStandOutput=syslog\n\nStandError=inherit\n\n[Install]\nWantedBy=multi-user.target\n")])])]),s("p",[a._v("我们只需要将 "),s("code",[a._v("ExecStart")]),a._v(" 中的 "),s("code",[a._v("jar-path")]),a._v(" 改为自己服务器上安装包的路径即可，例如 "),s("code",[a._v("/www/wwwroot/halo-1.0.2.jar")]),a._v("，之后保存即可。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 修改 service 文件之后需要刷新 Systemd")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" systemctl daemon-reload\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 使 Halo 开机自启")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" systemctl "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("enable")]),a._v(" halo\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 启动 Halo")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" systemctl start halo 或者 "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("service")]),a._v(" halo start\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 重启 Halo")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" systemctl restart halo 或者 "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("service")]),a._v(" halo restart\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 停止 Halo")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" systemctl stop halo 或者 "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("service")]),a._v(" halo stop\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查看 Halo 的运行状态")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" systemctl status halo 或者 "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("service")]),a._v(" halo status\n")])])]),s("p",[a._v("完成以上操作即可通过 "),s("code",[a._v("IP:端口")]),a._v(" 访问了。不过在此之前，最好先完成后续操作，我们还需要让域名也可以访问到 Halo，请继续看 "),s("router-link",{attrs:{to:"/guide/reverse-proxy.html"}},[a._v("配置域名访问")]),a._v("。")],1),a._v(" "),s("div",[s("AdSense-Doc",{attrs:{"ad-client":"ca-pub-5271828906478846","ad-slot":"2656935500","ad-style":"display:block; text-align:center;","ad-format":"fluid"}})],1)])},[],!1,null,null,null);t.default=n.exports}}]);