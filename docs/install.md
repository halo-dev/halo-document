# 下载安装

## 环境要求

- JDK1.8
- 数据库
	- MySQL5.5 以上
	- 或者 MariaDB
	- 或者直接使用H2 Database，免安装。

## FatJar + Nginx

### 下载配置模板
> 如果需要自定义运行端口或者配置数据库信息，这一步将非常重要。

```bash
curl -o ~/.halo/application.yaml --create-dirs https://raw.githubusercontent.com/halo-dev/halo-common/master/application-template.yaml
```

### 修改配置文件
> 请按照配置文件中的注释并结合自己的实际情况修改，修改完成之后保存即可。

```bash
sudo vim ~/.halo/application-template.yaml
```

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

### 准备安装包

```
curl -o halo-latest.jar --create-dirs https://github.com/halo-dev/halo/releases/download/v0.1.1/halo-0.1.1.zip
```

当然，你也可以自己下载安装包，然后上传到服务器。

### 启动

```
# cd 到jar包的存放目录
cd jar包目录

# 启动
nohup java -jar halo-latest.jar &
```

## Docker 部署

### 下载配置模板
> 如果需要自定义运行端口或者配置数据库信息，这一步将非常重要。

```bash
curl -o ~/.halo/application.yaml --create-dirs https://raw.githubusercontent.com/halo-dev/halo-common/master/application-template.yaml
```

### 修改配置文件
> 请按照配置文件中的注释并结合自己的实际情况修改，修改完成之后保存即可。

```bash
sudo vim ~/.halo/application-template.yaml
```

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

### 启动

```bash
# 拉取镜像
docker pull ruibaby/halo
# 运行
docker run -d --name halo -p 8090:8090 -v ~/.halo:/root/halo ruibaby/halo
```

