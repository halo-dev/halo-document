# 在 Linux 服务器部署 Halo

本教程以 `CentOS 7.x` 为例，配置并运行 `Halo`，其他 Linux 发行版大同小异。

## 写在前面

1. 具备一定的 Linux 基础。
2. 如需域名绑定，请先保证已经正确解析 IP，以及确认服务器是否需要备案。
3. 如需使用 IP 访问，请先确保 Halo 的运行端口已经打开，除非你使用 80 端口运行 Halo。
4. 如 3 所述，如果你使用了类似 `宝塔面板` 之类的 Linux 管理面板，可能还需要在面板里设置端口。
5. 不要想当然，请严格按照文档的流程操作。

## 环境要求

为了在使用过程中不出现意外的事故，给出下列推荐的配置

- CentOS 7.x
- 512 MB 以上内存

## 服务器配置

### 更新软件包

请确保服务器的软件包已经是最新的。

```bash
sudo yum update -y
```

### 安装 Java 运行环境

> 若已经存在 Java 运行环境的可略过这一步。

```bash
# 安装 OpenJRE
sudo yum install java-1.8.0-openjdk -y

# 检测是否安装成功
java -version
```

当然，这只是其中一种比较简单的安装方式，你也可以用其他方式，并不是强制要求使用这种方式安装。

<div>
  <AdSense-Doc
  ad-client="ca-pub-5271828906478846"
  ad-slot="2656935500"
  ad-style="display:block; text-align:center;"
  ad-format="fluid"
  ></AdSense-Doc>
</div>

## 安装 Halo

### 下载配置文件

考虑到部分用户的需要，可能需要自定义比如端口等设置项，我们提供了公共的配置文件，并且该配置文件是完全独立于安装包的。当然，你也可以使用安装包内的默认配置文件，但是安装包内的配置文件是不可修改的。请注意：配置文件的路径为 `~/.halo/application.yaml`。

```bash
# 下载配置文件到 ~/.halo 目录
curl -o ~/.halo/application.yaml --create-dirs http://halo.ryanc.cc/config/application-template.yaml
```

### 修改配置文件

完成上一步操作，我们就可以自己配置 `Halo` 的运行端口，以及数据库相关的配置了。

```bash
# 使用 Vim 工具修改配置文件
vim ~/.halo/application.yaml
```

打开之后我们可以看到

```yaml
server:
  port: 8090

  # Response data gzip.
  compression:
    enabled: false
spring:
  datasource:

    # H2 database configuration.
    driver-class-name: org.h2.Driver
    url: jdbc:h2:file:~/.halo/db/halo
    username: admin
    password: 123456

    # MySQL database configuration.
#    driver-class-name: com.mysql.cj.jdbc.Driver
#    url: jdbc:mysql://127.0.0.1:3306/halodb?characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true
#    username: root
#    password: 123456

  # H2 database console configuration.
  h2:
    console:
      settings:
        web-allow-others: false
      path: /h2-console
      enabled: false

halo:

  # Your admin client path is https://your-domain/{admin-path}
  admin-path: admin

  # memory or level
  cache: memory
```

1. 如果需要自定义端口，修改 `server` 节点下的 `port` 即可。
2. 默认使用的是 `H2 Database` 数据库，这是一种嵌入式的数据库，使用起来非常方便。需要注意的是，默认的用户名和密码为 `admin` 和 `123456`，这个是自定义的，最好将其修改，并妥善保存。
3. 如果需要使用 `MySQL` 数据库，需要将 `H2 Database` 的所有相关配置都注释掉，并取消 `MySQL` 的相关配置。另外，`MySQL` 的默认数据库名为 `halodb`，请自行配置 `MySQL` 并创建数据库，以及修改配置文件中的用户名和密码。
4. `h2` 节点为 `H2 Database` 的控制台配置，默认是关闭的，如需使用请将 `h2.console.settings.web-allow-others` 和 `h2.console.enabled` 设置为 `true`。控制台地址即为 `域名/h2-console`。注意：非紧急情况，不建议开启该配置。
5. `server.compression.enabled` 为 `Gzip` 功能配置，如有需要请设置为 `true`，需要注意的是，如果你使用 `Nginx` 或者 `Caddy` 进行反向代理的话，默认是有开启 `Gzip` 的，所以这里可以保持默认。
6. `halo.admin-path` 为后台管理的根路径，默认为 `admin`，如果你害怕别人猜出来默认的 `admin`（就算猜出来，对方什么都做不了），请自行设置。仅支持一级，且前后不带 `/`。
7. `halo.cache` 为系统缓存形式的配置，可选 `memory` 和 `level`，默认为 `memory`，将数据缓存到内存，使用该方式的话，重启应用会导致缓存清空。如果选择 `level`，则会将数据缓存到磁盘，重启不会清空缓存。如不知道如何选择，建议默认。

::: tip 注意
使用 MySQL 之前，必须要先新建一个 `halodb` 数据库，MySQL 版本需 5.7 以上。

```sql
create database halodb character set utf8mb4 collate utf8mb4_bin;
```

:::

### 运行 Halo

Halo 的整个应用程序只有一个 Jar 包，且不包含用户的任何配置，它放在任何目录都是可行的。需要注意的是，Halo 的整个额外文件全部存放在 `~/.halo` 目录下，包括 `application.yaml（用户配置文件）`，`template/themes（主题目录）`，`upload（附件上传目录）`，`halo.db.mv（数据库文件）`。一定要保证 `~/.halo` 的存在，你博客的所有资料可都存在里面。所以你完全不需要担心安装包的安危，它仅仅是个服务而已。

最新版本：<a href="https://github.com/halo-dev/halo/releases"><img alt="GitHub release" src="https://img.shields.io/github/release/halo-dev/halo.svg?style=flat-square"/></a>

```bash
# 下载最新的 Halo 安装包，{{version}} 为版本号，不带 v
wget http://halo.ryanc.cc/release/halo-{{version}}.jar -O halo-latest.jar

# 或者
wget http://halo.ryanc.cc/release/halo-latest.jar -O halo-latest.jar

# 或者，{{version}} 为版本号，不带 v
wget https://halo.nova.moe/release/halo-{{version}}.jar -O halo-latest.jar

# 备用地址（建议海外服务器使用）
wget https://github.com/halo-dev/halo/releases/download/v1.2.0/halo-1.2.0.jar -O halo-latest.jar

# 启动测试
java -jar halo-latest.jar
```

如看到以下日志输出，则代表启动成功.

```bash
run.halo.app.listener.StartedListener    : Halo started at         http://127.0.0.1:8090
run.halo.app.listener.StartedListener    : Halo admin started at   http://127.0.0.1:8090/admin
```

::: tip 提示
以上的启动仅仅为测试 Halo 是否可以正常运行，如果我们关闭 ssh 连接，Halo 也将被关闭。要想一直处于运行状态，请继续看下面的教程。
:::

### 进阶配置

上面我们已经完成了 Halo 的整个配置和安装过程，接下来我们对其进行更完善的配置，比如：`需要开机自启？`，`更简单的启动方式？`

实现以上功能我们只需要新增一个配置文件即可，也就是使用 `Systemd` 来完成这些工作。

```bash
# 下载 Halo 官方的 halo.service 模板
sudo curl -o /etc/systemd/system/halo.service --create-dirs http://halo.ryanc.cc/config/halo.service
```

下载完成之后，我们还需要对其进行修改。

```bash
# 修改 halo.service
sudo vim /etc/systemd/system/halo.service
```

打开之后我们可以看到

```conf
[Unit]
Description=Halo Service
Documentation=https://halo.run
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/usr/bin/java -server -Xms256m -Xmx256m -jar YOUR_JAR_PATH
ExecStop=/bin/kill -s QUIT $MAINPID
Restart=always
StandOutput=syslog

StandError=inherit

[Install]
WantedBy=multi-user.target
```

参数：

- -Xms256m：为 JVM 启动时分配的内存，请按照服务器的内存做适当调整，512 M 内存的服务器推荐设置为 128，1G 内存的服务器推荐设置为 256，默认为 256。
- -Xmx256m：为 JVM 运行过程中分配的最大内存，配置同上。
- YOUR_JAR_PATH：Halo 安装包的绝对路径，例如 `/www/wwwroot/halo-latest.jar`。

::: tip 注意
1. 如果你不是按照上面的方法安装的 JDK，请确保 `/usr/bin/java` 是正确无误的。
2. systemd 中的所有路径均要写为绝对路径，另外，`~` 在 systemd 中也是无法被识别的，所以你不能写成类似 `~/halo-latest.jar` 这种路径。
3. 如何检验是否修改正确：把 ExecStart 中的命令拿出来执行一遍。
:::

```bash
# 修改 service 文件之后需要刷新 Systemd
sudo systemctl daemon-reload

# 使 Halo 开机自启
sudo systemctl enable halo

# 启动 Halo
sudo service halo start

# 重启 Halo
sudo service halo restart

# 停止 Halo
sudo service halo stop

# 查看 Halo 的运行状态
sudo service halo status
```

### 更新 Halo

最新版本：<a href="https://github.com/halo-dev/halo/releases"><img alt="GitHub release" src="https://img.shields.io/github/release/halo-dev/halo.svg?style=flat-square"/></a>

```bash
# 停止运行
sudo service halo stop

# 下载最新的 Halo 安装包替换旧的包，{{version}} 为版本号，不带 v
wget http://halo.ryanc.cc/release/halo-{{version}}.jar -O halo-latest.jar

# 或者
wget http://halo.ryanc.cc/release/halo-latest.jar -O halo-latest.jar

# 或者，{{version}} 为版本号，不带 v
wget https://halo.nova.moe/release/halo-{{version}}.jar -O halo-latest.jar

# 备用地址（建议海外服务器使用）
wget https://github.com/halo-dev/halo/releases/download/v1.2.0/halo-1.2.0.jar -O halo-latest.jar

# 启动
service halo start
```

完成以上操作即可通过 `IP:端口` 访问了。不过在此之前，最好先完成后续操作，我们还需要让域名也可以访问到 Halo，请继续看 [配置域名访问](reverse-proxy.md)。

<div>
  <AdSense-Doc
  ad-client="ca-pub-5271828906478846"
  ad-slot="2656935500"
  ad-style="display:block; text-align:center;"
  ad-format="fluid"
  ></AdSense-Doc>
</div>
