---
icon: bianjiwenjian
date: 2024-01-04
category:
  - C#
tag:
  - FileStream
order: 1
excerpt: <p>三类的区别对比和使用方法</p>
editLink: false
---
# C#读写文件 - File、FileStream和StreamReader区别

### 对比

File：对整个文件进行操作，包括创建、拷贝、移动、删除、打开和读写文件等静态方法。

FileStream：对文件内容进行操作，操作字节，可以用于任何类型文件，更适合大文件。

StreamReader：对文件内容进行操作，操作字符，只能操作文本文件，更适合小文件。

### File使用

[File 类 (System.IO) | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/api/system.io.file?view=net-8.0)

```csharp
//判断不存在后创建一个新文件
path = Application.persistentDataPath + @"\test.txt";
if (!File.Exists(path))
{
string createText = "0";
File.WriteAllText(path, createText, Encoding.UTF8);
}
```

### FileStream使用

[FileStream 类 (System.IO) | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/api/system.io.filestream?view=net-8.0)

### StreamReader使用

[StreamReader Class (System.IO) | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/api/system.io.streamreader?view=net-8.0)

```csharp
//写入
string myPosition = myTransform.localPosition.ToString("F6");
using (StreamWriter writer = new StreamWriter(path))
{
    writer.WriteLine(myPosition);
}

//读取
using (StreamReader reader = new StreamReader(path))
{
    string myPosition = reader.ReadLine();
}
```
