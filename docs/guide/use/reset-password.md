# 如何重置后台登录密码

## 优雅的方式

第一步，访问后台登录页面，如果你没有自定义后台地址，那么登陆页面为 `/admin`。

第二步，按住键盘的 `shift+alt+h` 即可调出 `找回密码` 的按钮。

第三步，输入用户名以及用户邮箱，点击 `获取` 按钮获取重置密码的验证码。

第四步，收到验证码之后，输入验证码到验证码的输入框。

第五步，填写新密码以及确认密码，点击 `重置密码` 即可。

Q&A：

Q：用户名或者邮箱怎么错误了？

A：这你都忘了的话，请看下面的 `粗暴的方式`。

Q：提示说没有配置发信怎么办？

A：那是因为你没有在博客设置中配置 SMTP 发信，所以无法发送验证码。解决方式：登录到服务器，打开 `~/.halo/logs/spring.log`，搜索 `Get reset password code:` 即可找到验证码。 

## 粗暴的方式

> 此方法需要手动修改数据库，因此十分不建议使用此方法修改密码。在非特殊情况下，请不要随意修改数据库内容。

### 如果你使用的是默认的数据库（`h2`）

那么请保证 `~/.halo/application.yml` 有如下配置：（如有修改，需要重启 Halo）

```yml
spring:
  h2:
    console:
      settings:
        web-allow-others: true
      path: /h2-console
      enabled: true
```

假设你的博客地址为 `http://your_blog.me/`，
那么请直接你可以直接通过 `http://your_blog.me/h2-console` 访问到 `h2` 数据库。

`h2` 登录示例：

```property
JDBC url：jdbc:h2:file:~/.halo/db/halo
username: admin
password: 123456
```

进去之后查询 `users` 表：

```sql
SELECT * FROM USERS USERS 
```

最后修改 `password` 字段的值为： `$2a$10$XWHHcjqR8Cx5DnisoRA7fehC1Pi0Kc9QRQOTlhoDdRwXYZzn0Xhfa`。

以上 `Bcrypt` 密文对应的明文是 `openhalo`。

### `MySQL` 数据库

```sql
SELECT * FROM USERS USERS 
```

最后修改 `password` 字段的值为： `$2a$10$XWHHcjqR8Cx5DnisoRA7fehC1Pi0Kc9QRQOTlhoDdRwXYZzn0Xhfa`。

以上 `Bcrypt` 密文对应的明文是 `openhalo`。

### 最后

使用 `openhalo` 这个密码登录到后台，在个人资料中重新设置密码即可。

