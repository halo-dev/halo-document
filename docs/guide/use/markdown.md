# Markdown 语法

## 基础语法
Halo 是用的 `Markdown` 解析器为 [flexmark-java](https://github.com/vsch/flexmark-java)，基于 [CommonMark (spec 0.28)](https://spec.commonmark.org/0.28/) 标准开发，语法参考：[https://spec.commonmark.org/0.28/](https://spec.commonmark.org/0.28/)。

## 代码块

````markdown
```language
    代码块
```
````

其中，language 为必填，如果不填写，很可能主题的代码高亮插件无法识别代码的语言，导致样式异常。举几个例子：

````markdown
```java
public static void main(String[] args){
    System.out.println("Hello World!");
}
```
````

````markdown
```javascript
console.log("Hello World!")
```
````

## 自动链接
支持自动将一个链接解析为可点击的格式，如下：

```markdown
https://halo.run
```
将被解析为：
```html
<a href="https://halo.run">https://halo.run</a>
```

## Emoji
支持将 Emoji 的文字形式转化为图片形式，如下：

```markdown
:100:
```
将被解析为：
```html
💯
```

更多 Emoji 表情可访问：[https://emoji.svend.cc](https://emoji.svend.cc)

## 短连接
Halo 内置一些短连接以更好地支持一些 HTML 语法，但是编辑器目前并不能解析，只能发布之后才可以看到效果，如下：

### 网易云音乐

```markdown
[music:id]
```
示例：
```markdown
[music:32507038]
```
将被解析为：
```html
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=32507038&auto=1&height=66"></iframe>
```

### 哔哩哔哩动画
```markdown
[bilibili:aid,width,height]
```
示例：
```markdown
[bilibili:65898131,256,256]
```
将被解析为：
```html
<iframe height="256" width="256" src="//player.bilibili.com/player.html?aid=65898131" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
```