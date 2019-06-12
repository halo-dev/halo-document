# 使用 Docker-compose 部署 Halo

使用 [`Docker Compose`](https://docs.docker.com/compose/) 部署 `Halo` 的指南，假设你了解并使用过 [`Docker`](https://docs.docker.com/) 和 [`Docker Compose`](https://docs.docker.com/compose/)。本篇教程以 `CentOS 7.x` 为例，其他系统大同小异。

## 环境要求

为了在使用过程中不出现意外的事故，给出下列推荐的配置

- 1G RAM 的服务器

在开始之前，最好先到域名服务商解析域名，设置 A 记录并指向服务器的 IP 地址，并确保已经正确解析，你可以在本地使用 Ping 命令检查域名是否已经正确解析到了服务器的 IP 地址。以方便在安装过程中为域名配置 SSL 证书。

## 服务器配置

### 更新软件包

请确保服务器的软件包已经是最新的。

```bash
sudo yum update -y
```

### 配置 Docker 运行环境

请参考[使用 Docker 部署 Halo](/docs/install-with-docker.html#服务器配置)

### 配置 Docker Compose

请参考 [Docker Compose | Docker Documentation](http://docs.docker.com/compose/)

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
curl -o ~/.halo/application.yaml --create-dirs https://raw.githubusercontent.com/halo-dev/halo-common/master/application-template.yaml
```

### 修改配置文件

完成上一步操作，我们就可以自己配置 Halo 的运行端口，以及数据库相关的配置了。

```bash
# 使用 Vim 工具修改配置文件
vim ~/.halo/application.yaml
```

打开之后我们可以看到

- H2 配置如下：

```yml
server:
  port: 8090
spring:
  datasource:
    type: com.zaxxer.hikari.HikariDataSource

    # H2 Database 配置
    driver-class-name: org.h2.Driver
    url: jdbc:h2:file:~/halo/db/halo
    username: admin
    password: openadmin
  h2:
    console:
      settings:
        web-allow-others: false
      path: /h2-console
      enabled: false
```

- MySQL 配置如下：

```yml
server:
  port: 8090
spring:
  datasource:
    # MySQL 配置
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/halodb?characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: openroot
```

1. 如果需要自定义端口，修改 `server` 节点下的 `port` 即可。
2. 默认使用的是 `H2 Database` 数据库，这是一种嵌入式的数据库，使用起来非常方便。需要注意的是，默认的用户名和密码为 `admin` 和 `123456`，这个是自定义的，最好将其修改，并妥善保存。
3. 如果需要使用 `MySQL` 数据库，需要将 `H2 Database` 的所有相关配置都注释掉，并取消 `MySQL` 的相关配置。另外，`MySQL` 的默认数据库名为 `halodb`，请自行配置 `MySQL` 并创建数据库，以及修改配置文件中的用户名和密码。
4. `h2` 节点为 `H2 Database` 的控制台配置，默认是关闭的，如需使用请将 `h2.console.settings.web-allow-others` 和 `h2.console.enabled` 设置为 `true`。控制台地址即为 `域名/h2-console`。注意：非紧急情况，不建议开启该配置。

### 下载 Docker Compose 配置文件

```bash
yum install -y wget && wget -O docker-compose.yaml https://raw.githubusercontent.com/halo-dev/halo-common/master/docker-compose.yaml
```

### 修改 Docker Compose 文件

假设你现在已经下载好了 docker-compose.yaml 文件，那么在部署之前需要做的就是简单修改以下这个文件。因为我们需要绑定域名以申请 SSL 证书，所以你需要在 docker-compose.yaml 文件中修改以下配置：

```yml
halo:
  restart: always
  image: ruibaby/halo
  container_name: halo
  ports:
    - 8090:8090
  environment:
    - VIRTUAL_PORT=8090
    - VIRTUAL_HOST=localhost  # 监听的地址（务必修改）
    - LETSENCRYPT_HOST=localhost # 证书的域名 （务必修改）
    - LETSENCRYPT_EMAIL=i@example.com # 证书所有者的邮箱，快过期时会提醒（务必修改）
  volumes:
    - ~/.halo:/root/.halo
```

参考配置：

```yml
halo:
  restart: always
  image: ruibaby/halo
  container_name: halo
  ports:
    - 8090:8090
  environment:
    - VIRTUAL_PORT=8090
    - VIRTUAL_HOST=blog.ryanc.cc
    - LETSENCRYPT_HOST=blog.ryanc.cc
    - LETSENCRYPT_EMAIL=i@ryanc.cc
  volumes:
    - ~/.halo:/root/.halo
```

如上配置，我们需要修改 `VIRTUAL_HOST` , `LETSENCRYPT_HOST` 为自己的域名，**注意注意注意！**，在部署之前最好先将外网 IP 解析到域名，因为申请 SSL 证书需要域名可以正常访问。另外，`LETSENCRYPT_EMAIL` 这个节点是证书申请者的邮箱，当证书要过期的时候，会提醒你续签。

### 下载配置文件模板

因为要涉及到 Nginx 反向代理，所以我们需要使用模板生成一个 Nginx 的配置文件，以配置好需要代理的地址以及后面 SSL 证书的配置。这个模板人家已经写好了，所以我们直接下载下来即可，下载下来我们就不需要管了。

```bash
cd /etc && mkdir nginx

curl https://raw.githubusercontent.com/jwilder/nginx-proxy/master/nginx.tmpl > /etc/nginx/nginx.tmpl
```

### 运行

如果你顺利进行了上面所述步骤，那么已经离成功不远了，现在我们只需要执行一条命令即可完成 Halo 的部署。

```bash
docker-compose up -d
```

### 版本更新

```bash
# 拉取最新的 Halo 镜像
docker-compose pull

# 重新构建容器
docker-compose up -d
```

### 常用命令

```bash
# 停止容器运行
docker-compose stop

# 启动容器
docker-compose start

# 重启容器
docker-compose restart
```

### 注意事项

1. 最好提前解析好 IP，绑定域名。
2. 运行完成之后可能得等几分钟，HTTPS 才会配置好，如果不能访问属正常现象，等待几分钟就可以看到 Halo 安装的界面了。
3. Docker 镜像使用的是 H2 数据库，所以不需要你自己安装，服务启动就可以自动创建了。

<div>
  <AdSense-Doc
  ad-client="ca-pub-5271828906478846"
  ad-slot="2656935500"
  ad-style="display:block; text-align:center;"
  ad-format="fluid"
  ></AdSense-Doc>
</div>