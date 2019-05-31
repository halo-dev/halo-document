# 配置域名访问

## 使用 Nginx 进行反向代理

### 安装 Nginx

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

### 配置 Nginx

```bash
# 下载 Halo 官方的 Nginx 配置模板
curl -o /etc/nginx/conf.d/halo.conf --create-dirs https://raw.githubusercontent.com/halo-dev/halo-common/master/nginx.conf
```

下载完成之后，我们还需要对其进行修改

```bash
# 使用 vim 编辑 halo.conf
vim /etc/nginx/conf.d/halo.conf
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

# 检查配置是否有误
sudo nginx -t

# 重载 Nginx 配置
sudo nginx -s reload
```

### 配置 SSL 证书

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

## 或者使用 Caddy 进行反向代理

Caddy 是一款使用 Go 语言开发的 Web 服务器。其配置更为简洁，并可以自动申请及配置 SSL 证书，推荐。 

### 安装 Caddy

```bash
# 安装 Caddy 软件包
yum install caddy -y
```

### 配置 Caddy

```bash
# 下载 Halo 官方的 Caddy 配置模板
curl -o /etc/caddy/conf.d/Caddyfile.conf --create-dirs https://raw.githubusercontent.com/halo-dev/halo-common/master/Caddyfile
```

下载完成之后，我们还需要对其进行修改。

```bash
# 使用 vim 编辑 Caddyfile
vim /etc/caddy/conf.d/Caddyfile.conf
```

打开之后我们可以看到

```bash
https://www.simple.com {
 gzip
 tls xxxx@xxx.xx
 proxy / localhost:port {
  transparent
 }
}
```

1. 请把 `https://www.simple.com` 改为自己的域名。
2. `tls` 后面的 `xxxx@xxx.xx` 改为自己的邮箱地址，这是用于自动申请 SSL 证书用的。需要注意的是，不需要你自己配置 SSL 证书，而且会自动帮你续签。
3. `localhost:port` 请将 `port` 修改为 Halo 的运行端口，默认为 8090。

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

### 进阶设置

多网址重定向到主网址，比如访问 `simple.com` 跳转到 `www.simple.com` 应该怎么做呢？

```bash
# 使用 vim 编辑 Caddyfile
vim /etc/caddy/conf.d/Caddyfile.conf
```

打开之后我们在原有的基础上添加以下配置

```nginx
https://simple.com {
  redir https://www.simple.com{url}
}
```

将 `https://simple.com` 和 `https://www.simple.com{url}` 修改为自己需要的网址就行了，比如我要求访问 `ryanc.cc` 跳转到 `www.ryanc.cc`，完整的配置如下：

```nginx
http://ryanc.cc {
  redir https://www.ryanc.cc{url}
}

https://www.ryanc.cc {
  gzip
  tls i@ryanc.cc
  proxy / localhost:8090 {
    transparent
  }
}
```

最后我们重启 Caddy 即可。

到这里，关于 Caddy 反向代理的配置也就完成了，现在你可以访问一下自己的域名，并进行 Halo 的初始化了。
