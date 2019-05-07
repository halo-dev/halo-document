# 在 CentOS 上安装 Halo
在 CentOS 7.x 上安装，配置并运行 Halo 的指南。

## 环境要求
为了在使用过程中不出现意外的事故，给出下列推荐的配置
- CentOS 7.x
- 1G RAM的服务器
- Oracle JDK 1.8/Open JDK 1.8
- Nginx/Caddy

在开始之前，最好先到域名服务商解析域名，设置A记录并指向服务器的 IP 地址，并确保已经正确解析，你可以在本地使用 Ping 命令检查域名是否已经正确解析到了服务器的 IP 地址。以方便在安装过程中为域名配置 SSL 证书。

## 服务器配置

### 更新软件包
请确保服务器的软件包已经是最新的。

```bash
sudo yum update -y
```

### 配置 Java 运行环境
```bash

# 下载 JDK 软件包
wget -c --header "Cookie: oraclelicense=accept-securebackup-cookie" https://download.oracle.com/otn/java/jdk/8u211-b12/478a62b7d4e34b78b671c754eaaf38ab/jdk-8u211-linux-x64.rpm

# 安装 JDK 软件包
sudo yum localinstall -y jdk-8u131-linux-x64.rpm

# 检测是否安装成功
java -version
```

当然，这只是其中一种比较简单的安装方式，你也可以用其他方式，并不是强制要求使用这种方式安装。

## 安装 Halo

### 下载配置文件
考虑到部分用户的需要，可能需要自定义比如端口等设置项，我们提供了公共的配置文件，并且该配置文件是完全独立于安装包的。当然，你也可以使用安装包内的默认配置文件，但是安装包内的配置文件是不可修改的。请注意：配置文件的路径为 `~/.halo/application.yaml`。

```bash
# 下载配置文件到 ~/.halo 目录
curl -o ~/.halo/application.yaml --create-dirs https://raw.githubusercontent.com/halo-dev/halo-common/master/application-template.yaml
```

### 修改配置文件
完成上一步操作，我们就可以自己配置 Halo 的运行端口，以及数据库相关的配置了。

```bash
# 使用 Vim 工具修改配置文件
vim ~/.halo/application.yaml
```

打开之后我们可以看到

```yaml
server:
  port: 8090
spring:
  datasource:
    type: com.zaxxer.hikari.HikariDataSource

    # H2 Database 配置，如果你需要使用 MySQL，请注释掉该配置并取消注释 MySQL 的配置。
    driver-class-name: org.h2.Driver
    url: jdbc:h2:file:~/halo/db/halo
    username: admin
    password: 123456

    # MySQL 配置，如果你需要使用 H2Database，请注释掉该配置并取消注释上方 H2Database 的配置。
#    driver-class-name: com.mysql.cj.jdbc.Driver
#    url: jdbc:mysql://127.0.0.1:3306/halodb?characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
#    username: root
#    password: 123456

  # H2 Database 的控制台相关配置，如果你使用的是 MySQL ，请注释掉下方内容。
  h2:
    console:
      settings:
        web-allow-others: false
      path: /h2-console
      enabled: false
```

1. 如果需要自定义端口，修改 `server` 节点下的 `port` 即可。
2. 默认使用的是 `H2 Database` 数据库，这是一种嵌入式的数据库，使用起来非常方便。需要注意的是，默认的用户名和密码为 `admin` 和 `123456`，这个是自定义的，最好将其修改，并妥善保存。
3. 如果需要使用 `MySQL` 数据库，需要将 `H2 Database` 的所有相关配置都注释掉，并取消 `MySQL` 的相关配置。另外，`MySQL` 的默认数据库名为 `halodb`，请自行配置 `MySQL` 并创建数据库，以及修改配置文件中的用户名和密码。
4. `h2` 节点为 `H2 Database` 的控制台配置，默认是关闭的，如需使用请将 `h2.console.settings.web-allow-others` 和 `h2.console.enabled` 设置为 `true`。控制台地址即为 `域名/h2-console`。注意：非紧急情况，不建议开启该配置。

### 运行 Halo
Halo 的整个应用程序只有一个 Jar 包，且不包含用户的任何配置，它放在任何目录都是可行的。需要注意的是，Halo 的整个额外文件全部存放在 `~/.halo` 目录下，包括 `application.yaml（用户配置文件）`，`template/themes（主题目录）`，`upload（附件上传目录）`，`halo.db.mv（数据库文件）`。一定要保证 `~/.halo` 的存在，你博客的所有资料可都存在里面。所以你完全不需要担心安装包的安危，它仅仅是个服务而已。

```
# 下载 Halo 安装包
curl -o halo-latest.jar --create-dirs https://github.com/halo-dev/halo/releases/download/v0.1.1/halo-0.1.1.zip

# 启动 Halo
nohup java -jar halo-latest.jar &
```

### 更新 Halo
```bash
# 查询 Halo 占用的pid
ps -ef | grep halo

# 停止 Halo 进程
kill -9 pid

# 下载最新的 Halo 安装包
curl -o halo-latest.jar --create-dirs https://github.com/halo-dev/halo/releases/download/v0.1.1/halo-0.1.1.zip

# 运行 Halo
nohup java -jar halo-latest.jar &
```

### 进阶配置
上面我们已经完成了 Halo 的整个配置和安装过程，接下来我们对其进行更完善的配置，比如：`需要开机自启？`，`更简单的启动方式？`

实现以上功能我们只需要新增一个配置文件即可，也就是使用 `Systemd` 来完成这些工作。

```bash
# 下载 halo.service 模板
curl -o /etc/systemd/system/halo.service --create-dirs https://github.com/halo-dev/halo/releases/download/v0.1.1/halo-0.1.1.zip

# 修改 halo.service
vim /etc/systemd/system/halo.service

# 刷新 Systemd
systemctl daemon-reload

# 使 Halo 开机自启
systemctl enable halo

# 启动 Halo
systemctl start halo 或者 service halo start

# 重启 Halo
systemctl restart halo 或者 service halo restart

# 停止 Halo
systemctl stop halo 或者 service halo stop

# 查看 Halo 的运行状态
systemctl status halo 或者 service halo status
```

完成以上操作即可访问 Halo 啦。不过在此之前，最好先完成后续操作，我们还需要让域名也可以访问到 Halo，请接着往下看。

### 配置域名访问

#### 使用 Nginx 进行反向代理

#### 使用 Caddy 进行反向代理
