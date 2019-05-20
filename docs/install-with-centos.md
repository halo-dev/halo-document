# 在 CentOS 上安装 Halo

在 CentOS 7.x 上安装，配置并运行 Halo 的指南。

## 环境要求

为了在使用过程中不出现意外的事故，给出下列推荐的配置

- CentOS 7.x
- 1G RAM 的服务器
- Oracle JDK 1.8/Open JDK 1.8
- Nginx/Caddy

在开始之前，最好先到域名服务商解析域名，设置 A 记录并指向服务器的 IP 地址，并确保已经正确解析，你可以在本地使用 Ping 命令检查域名是否已经正确解析到了服务器的 IP 地址。以方便在安装过程中为域名配置 SSL 证书。

## 服务器配置

### 更新软件包

请确保服务器的软件包已经是最新的。

```bash
sudo yum update -y
```

### 安装 Java 运行环境

> 若已经存在 Java 运行环境的可略过这一步。

// TODO 重构 Java 运行环境的安装

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
curl -o halo-latest.jar --create-dirs https://github.com/halo-dev/halo/releases/download/v1.0.0-beta.6/halo-1.0.0-beta.6.jar

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
curl -o halo-latest.jar --create-dirs https://github.com/halo-dev/halo/releases/download/v1.0.0-beta.6/halo-1.0.0-beta.6.jar

# 运行 Halo
nohup java -jar halo-latest.jar &
```

### 进阶配置

上面我们已经完成了 Halo 的整个配置和安装过程，接下来我们对其进行更完善的配置，比如：`需要开机自启？`，`更简单的启动方式？`

实现以上功能我们只需要新增一个配置文件即可，也就是使用 `Systemd` 来完成这些工作。

```bash
# 下载 Halo 官方的 halo.service 模板
curl -o /etc/systemd/system/halo.service --create-dirs https://raw.githubusercontent.com/halo-dev/halo-common/master/halo.service
```

下载完成之后，我们还需要对其进行修改。

```bash
# 修改 halo.service
vim /etc/systemd/system/halo.service
```

打开之后我们可以看到

```bash
[Unit]
Description=halo
After=network.target
Wants=network.target

[Service]
Type=simple
ExecStart=java -server -jar jar-path
ExecStop=/bin/kill -s QUIT $MAINPID
Restart=always
StandOutput=syslog

StandError=inherit

[Install]
WantedBy=multi-user.target
```

我们只需要将 `ExecStart` 中的 `jar-path` 改为自己服务器上安装包的路径即可，例如 `/www/wwwroot/halo-1.0.0.jar`，之后保存即可。

```bash
# 修改 service 文件之后需要刷新 Systemd
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

##### 安装 Nginx

```bash
# 添加 Nginx 源
sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

# 安装 Nginx
sudo yum install -y nginx

# 启动 Nginx
sudo systemctl start nginx.service

# 设置开机自启 Nginx
sudo systemctl enable nginx.service
```

##### 配置反向代理

```bash
# 下载 Halo 官方的 Nginx 配置模板
curl -o /etc/nginx/sites-available/halo.conf --create-dirs https://raw.githubusercontent.com/halo-dev/halo-common/master/nginx.conf
```

下载完成之后，我们还需要对其进行修改

```bash
# 使用 vim 编辑 Caddyfile
vim /etc/nginx/sites-available/halo.conf
```

打开之后我们可以看到

```bash
server {
    listen 80;

    server_name example.com;

    location / {
        proxy_pass http://localhost:8090/;
    }
}
```

1. 请把 `example.com` 改为自己的域名。
2. `http://localhost:8090` 请修改为你服务器的 `ip` 以及 `Halo` 的运行端口。

修改完成之后

```bash
# 创建软连接激活配置
sudo ln -s /etc/nginx/sites-available/halo.conf /etc/nginx/sites-enabled/

# 检查配置是否有误
sudo nginx -t

# 重载 Nginx 配置
sudo nginx -s reload
```

##### 配置 SSL 证书

在这里我只演示如果自动申请证书，如果你自己准备了证书，请查阅相关教程。

```bash
# 安装 certbot
yum install certbot -y

# 执行配置，中途会询问你的邮箱，如实填写即可
certbot --nginx

# 自动续约
certbot renew --dry-run
```

到这里，关于 Nginx 的配置也就完成了，现在你可以访问一下自己的域名，并进行 Halo 的初始化了。

#### 或者使用 Caddy 进行反向代理

Caddy 是一款使用 Go 语言开发的 Web 服务器

##### 安装 Caddy

```bash
# 安装 Caddy 软件包
yum install caddy -y
```

##### 配置反向代理

```bash
# 下载 Halo 官方的 Caddy 配置模板
curl -o /etc/caddy/conf.d/Caddyfile --create-dirs https://raw.githubusercontent.com/halo-dev/halo-common/master/Caddyfile
```

下载完成之后，我们还需要对其进行修改。

```bash
# 使用 vim 编辑 Caddyfile
vim /etc/caddy/conf.d/Caddyfile
```

打开之后我们可以看到

```bash
https://www.simple.com {
 gzip
 tls xxxx@xxx.xx
 proxy / http://ip:port
}
```

1. 请把 `https://www.simple.com` 改为自己的域名。
2. `tls` 后面的 `xxxx@xxx.xx` 改为自己的邮箱地址，这是用于自动申请 SSL 证书用的。需要注意的是，不需要你自己配置 SSL 证书，而且会自动帮你续签。
3. `http://ip:port` 请修改为你服务器的 `ip` 以及 `Halo` 的运行端口。

修改完成之后启动 `Caddy` 服务即可。

```bash
# 开启自启 Caddy 服务
systemctl enable caddy

# 启动 Caddy
service caddy start

# 停止运行 Caddy
service caddy stop

# 重启 Caddy
service caddy restart
```

##### 进阶设置

多网址重定向到主网址，比如访问 `simple.com` 跳转到 `www.simple.com` 应该怎么做呢？

```bash
# 使用 vim 编辑 Caddyfile
vim /etc/caddy/conf.d/Caddyfile
```

打开之后我们在原有的基础上添加以下配置

```nginx
http://simple.com {
  redir https://www.simple.com{url}
}
```

将 `http://simple.com` 和 `https://www.simple.com{url}` 修改为自己需要的网址就行了，比如我要求访问 `ryanc.cc` 跳转到 `www.ryanc.cc`，完整的配置如下：

```nginx
http://ryanc.cc {
  redir https://www.ryanc.cc{url}
}

https://www.ryanc.cc {
  gzip
  tls i@ryanc.cc
  proxy / http://139.199.84.219:8090
}
```

最后我们重启 Caddy 即可。

到这里，关于 Caddy 反向代理的配置也就完成了，现在你可以访问一下自己的域名，并进行 Halo 的初始化了。

## 总结

下面我们开始 《食用 Halo》 的技术总结。

1. 开始之前，最好在心里默念 3 遍 Linus 万岁。
2. 部署前最好先完成域名对 IP 的解析，方便后面 SSL 证书的申请。
3. 推荐使用 H2 Database。
4. Nginx 和 Caddy 只能选择一个，不能全都要。
