# 下载安装

## 环境要求

- JDK1.8以上。
- Maven3.x。
- 数据库
	- MySQL5.5以上
	- MariaDB
	- 或者直接使用H2Database，免安装。
- Git

> 需要注意的是：如果使用一键安装脚本（后面会讲到），那么你只需要安装数据库即可（如果使用MySQL或者MariaDB的话）。如果不使用MySQL或者MariaDB，那么你什么都不需要安装，直接执行脚本即可。

## 二进制安装（不推荐）

> 这种方式安装非常简单且快速（但是并不方便升级），你只需要下载安装包上传到服务器上解压运行即可，需要注意的是，运行之前别忘了参考下面的配置修改application.yaml文件。

### 配置文件详解

```yaml
server:
  port: 8080
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    # H2database 配置
    driver-class-name: org.h2.Driver
    url: jdbc:h2:file:~/halo/halo
    username: admin
    password: 123456

    # MySql配置
    #driver-class-name: com.mysql.jdbc.Driver
    #url: jdbc:mysql://127.0.0.1:3306/halodb?characterEncoding=utf8&useSSL=false
    #username: root
    #password: 123456

  h2:
    console:
      settings:
        web-allow-others: true
      path: /h2-console
      enabled: true
```

注意：默认使用的是H2Database，如需MySQL，将H2Database相关的配置注释或者删掉，再把MySql的相关配置取消注释即可。

详解：

- `server.port`: 运行程序的端口，默认8080。当然你要修改成6666也行，然后你访问的地址就是`localhost:6666`（使用halo-cli部署可以提示输入并修改）

- `spring.datasource.type`: 数据源类型，不需要修改。

- `spring.datasource.driver-class-name`: 数据库驱动程序，不需要修改。

- `spring.datasource.url`: 数据库物理文件路径，建议不要修改。默认是*~/halo/halo*。

- `spring.datasource.username`: 数据库用户名，一定要修改，这是可以自定义的（使用halo-cli部署可以提示输入并修改）。

- `spring.datasource.password`: 数据库密码，一定要修改，这也是可以自定义的（使用halo-cli部署可以提示输入并修改）。

- `spring.h2.console.settings.web-allow-others`: 是否启用h2数据库可视化后台。

- `spring.h2.console.path`: h2数据库可视化后台路径，可以自定义。

- `spring.h2.console.enabled:`: 是否启动H2控制台。

> 如果对h2数据库不熟悉，可以上网搜一下相关信息，非常好的一个嵌入式数据库。

### 如何运行Halo

1. 上传安装包到服务器。
2. 解压安装包。
3. 修改配置文件（数据库配置）。
4. 执行`sh halo.sh start`。

### 如何升级

1. 上传新的安装包到服务器。
2. 解压覆盖之前的文件。
3. 执行`sh halo.sh restart`。

### 其他命令

- 启动Halo : `sh halo.sh start`
- 停止Halo : `sh halo.sh stop`
- 重启Halo : `sh halo.sh restart`
- 查看状态 : `sh halo.sh status`

### 发布版本

版本号 | 发布日期 | 下载
------- | ------- | -------
0.0.7 | 2018/08/31 | [ZIP](http://static.ryanc.cc/halo/releases/halo-0.0.7.zip)
0.0.9 | 2018/10/14 | [ZIP](http://static.ryanc.cc/halo/releases/halo-0.0.9.zip) 

## 源码安装

### 一键安装脚本（方式一）

#### 注意事项

- 如果脚本出现错误，请使用**dos2unix**转换一下。
- 安装过程中会提示输入一些信息，如运行端口，数据库配置等信息，请知晓。
- 下载依赖过程中可能会比较久，通常在10-15分钟。

#### 执行自动安装脚本

```bash
yum install -y wget && wget -O halo-cli.sh https://git.io/fxHqp && bash halo-cli.sh -i
```

#### 如何运行

耐心等待安装完成之后，执行`systemctl start halo`或`service halo start`。

#### 如何更新

```bash
bash halo-cli.sh -u
systemctl restart halo 或者 service halo restart
```

#### 如何加入开机自启

```bash
systemctl enable halo
```

### 自动打包脚本（方式二）

> 这种安装方式适用于所有Linux发行版，其中，**deploy.sh**在项目根目录。

#### 注意事项

- 服务器为Linux。
- JDK1.8以上（需要自己配置）。
- Maven3.x（需要自己配置）。
- Git。

#### 拉取源码

```bash
git clone https://github.com/ruibaby/halo
#或者
git clone https://gitee.com/babyrui/halo
```

#### 如何运行

1. 进入到源码根目录。
2. 修改配置文件，`src/main/resources/application.yaml`，请参考上面的配置文件详解。
3. 执行`sh deploy.sh`。

#### 如何更新

1. 进入到源码根目录。
2. 执行`git pull`。
3. 执行`sh deploy.sh`。

## Docker 部署

```bash
# 拉取镜像
docker pull ruibaby/halo
# 运行
docker run -d --name halo -p 8090:8090 -v ~/halo:/root/halo ruibaby/halo
```
## Docker Compose 部署

```bash
# 下载 Nginx 配置文件模板
curl https://raw.githubusercontent.com/jwilder/nginx-proxy/master/nginx.tmpl > /etc/nginx/nginx.tmpl

# 获取 docker-compose.yaml 文件
yum install -y wget && wget -O docker-compose.yaml https://git.io/fpS8N

# 修改 docker-compose.yaml,修改VIRTUAL_HOST,LETSENCRYPT_HOST为自己的域名,修改LETSENCRYPT_EMAIL为自己的邮箱。
vim docker-compose.yaml

# 运行
docker-compose up -d
```

