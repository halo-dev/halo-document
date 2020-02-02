# 使用 Docker 部署 Halo

使用 [`Docker`](https://docs.docker.com/) 部署 `Halo` 的指南，假设你已经安装好了 [`Docker`](https://docs.docker.com/) 并了解它的基本使用。本篇教程以 `CentOS 7.x` 为例，其他系统大同小异。

## 写在前面

1. 具备一定的 Linux 基础。
2. 具备一定的 Docker 使用基础。
3. 如需域名绑定，请先保证已经正确解析 IP，以及确认服务器是否需要备案。
4. 如需使用 IP 访问，请先确保 Halo 的运行端口已经打开，除非你使用 80 端口运行 Halo。
5. 如 4 所述，如果你使用了类似 `宝塔面板` 之类的 Linux 管理面板，可能还需要在面板里设置端口。
6. 不要想当然，请严格按照文档的流程操作。

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

> 如果你已经安装过 [`Docker`](https://docs.docker.com/)，请略过此步骤。

这里推荐使用官方文档进行安装 [`Docker`](https://docs.docker.com/)。

> <https://docs.docker.com/install/linux/docker-ce/centos/>

同时我们也提供一个本土化的安装方法。

这里只做演示，个别系统的安装方式可能会不一样，仅供参考。

#### 安装必要依赖

```bash
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

#### 添加软件源信息

```bash
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

#### 更新 yum 缓存

```bash
sudo yum makecache fast
```

#### 安装 Docker

```bash
sudo yum install docker-ce docker-ce-cli containerd.io
```

#### 启动 Docker 后台服务

```bash
sudo systemctl start docker
```

#### 允许当前用户直接运行 `docker` 命令

需要将当前用户加入 `docker` 用户组。这样每次运行 `docker` 命令的时候，就不需要加 `sudo`。

```bash
sudo usermod -aG docker your_name
```

> 注意：设置成功之后需要重新登录才会生效。

#### 镜像加速

```bash
# 新建 daemon.json 文件
sudo vim /etc/docker/daemon.json
```

将下面的配置复制进去即可：

```json
{
  "registry-mirrors": ["http://hub-mirror.c.163.com"]
}
```

> 注意：修改完配置文件之后需要执行 `service docker restart` 才可生效。

<div>
  <AdSense-Doc
  ad-client="ca-pub-5271828906478846"
  ad-slot="2656935500"
  ad-style="display:block; text-align:center;"
  ad-format="fluid"
  ></AdSense-Doc>
</div>

## 安装 Halo

### 自定义配置文件

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

打开之后我们可以看到：

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

### 拉取最新 Halo 镜像

```bash
sudo docker pull ruibaby/halo
```

### 创建容器并运行

```bash
docker run --rm -it -d --name halo -p 8090:8090  -v ~/.halo:/root/.halo ruibaby/halo
```

1. --rm：停止之后自动删除容器。
2. --name：容器名。
3. -p：占用端口，前者为宿主机端口，后者为 Halo 的运行端口，可在 `application.yaml` 配置。
4. -v：目录映射，一般不要修改。

### 更新 Halo 版本

```bash
# 停止容器
sudo docker stop halo

# 拉取最新的 Halo 镜像
sudo docker pull ruibaby/halo

# 创建容器
docker run --rm -it -d --name halo -p 8090:8090  -v ~/.halo:/root/.halo ruibaby/halo
```

完成以上操作即可通过 `ip:端口` 访问了。不过在此之前，最好先完成后续操作，我们还需要让域名也可以访问到 Halo，请继续看 [配置域名访问](reverse-proxy.md)。

<div>
  <AdSense-Doc
  ad-client="ca-pub-5271828906478846"
  ad-slot="2656935500"
  ad-style="display:block; text-align:center;"
  ad-format="fluid"
  ></AdSense-Doc>
</div>