# 使用 Docker-compose 部署 Halo

使用 [`Docker Compose`](https://docs.docker.com/compose/) 部署 `Halo` 的指南，假设你了解并使用过 [`Docker`](https://docs.docker.com/) 和 [`Docker Compose`](https://docs.docker.com/compose/)。本篇教程以 `CentOS 7.x` 为例，其他系统大同小异。

## 写在前面

1. 具备一定的 Linux 基础。
2. 具备一定的 Docker 使用基础。
3. 如需域名绑定，请先保证已经正确解析 IP，以及确认服务器是否需要备案。
4. 如需使用 IP 访问，请先确保 Halo 的运行端口已经打开，除非你使用 80 端口运行 Halo。
5. 如 4 所述，如果你使用了类似 `宝塔面板` 之类的 Linux 管理面板，可能还需要在面板里设置端口。
6. 不要想当然，请严格按照文档的流程操作。

::: tip 注意
不能使用旧版本的 `docker-compose.yaml` 文件，请按照下列教程下载新的 `docker-compose.yaml` 文件进行安装。
:::

## 环境要求

为了在使用过程中不出现意外的事故，给出下列推荐的配置

- CentOS 7.x
- 1G 以上内存

## 服务器配置

### 更新软件包

请确保服务器的软件包已经是最新的。

```bash
sudo yum update -y
```

### 配置 Docker 运行环境

请参考 [使用 Docker 部署 Halo](install-with-docker.md#服务器配置)

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
curl -o ~/.halo/application.yaml --create-dirs http://halo.ryanc.cc/config/application-template.yaml
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

### 下载 Docker Compose 配置文件

```bash
yum install -y wget && wget -O docker-compose.yaml http://halo.ryanc.cc/config/docker-compose.yaml
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
    - MAX_UPLOAD_SIZE=10m
    - JVM_XMS=256m
    - JVM_XMX=256m
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
    - MAX_UPLOAD_SIZE=10m
    - JVM_XMS=256m
    - JVM_XMX=256m
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