---
layout: post
title: Java Socket实现客户端和服务端通信
tags: [Socket, 客户端, 服务端]
categories: [Socket, 客户端, 服务端]
---





## 1.问题描述：
> 使用Java语言的`Socket套接字`实现客户端和服务端通信时，程序卡死不动（通信阻塞）。


## 2.原因分析：
在使用Java Socket套接字实现客户端和服务端通信时，我们一般会用到两个Java类:`BufferedReader`(字符读取流)和`BufferedWriter`(字符输出流)。
当使用了BufferedWriter类输出字符串，但没有使用`newLine()`方法添加换行符和`flush()`方法将缓冲区字符输出的时候，此时再调用`BufferedReader的readLine()`方法读取一行字符串，
由于读取不到一行的结束标记(回车换行符)，程序会一直等待直到读取到结束标记，因此呈现出程序卡死不动（阻塞）的现象。


## 3.解决方法
在BufferedWriter调用write()方法后,继续调用它的`newLine()`方法和 `flush()`方法.


## 4.实例

### (1)服务端代码

``` java
package com.laurel.mydemo.biz.socket;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * User: laurel
 * Date: 16/1/27
 * Time: 下午3:02
 */
public class SimpleServer {

    public static void main(String[] args) {
        ServerSocket serverSocket;
        try {
            serverSocket = new ServerSocket(9000);
            System.out.println("Server started...");
            while (true) {
                try {
                    Socket socket = serverSocket.accept();
                    //
                    new HandleClientThread(socket).start();
                } catch (IOException e) {
                    e.printStackTrace();
                    break;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * client handle thread
     */
    private static class HandleClientThread extends Thread {
        private Socket socket;

        public HandleClientThread(Socket socket) {
            this.socket = socket;
        }

        public void run() {
            try {
                InputStream is = socket.getInputStream();
                OutputStream os = socket.getOutputStream();

                // get words from client socket
                BufferedReader clientReader = new BufferedReader(new InputStreamReader(is));
                // write replay to client
                BufferedWriter clientWriter = new BufferedWriter(new OutputStreamWriter(os));

                String line;
                while ((line = clientReader.readLine()) != null) {
                    System.out.println("Client message from "
                                            + socket.getInetAddress().getHostName() + ": " + line);
                    // write a reply to client
                    clientWriter.write("Received, message <" + line + ">");
                    clientWriter.newLine();
                    clientWriter.flush();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### (2)客户端代码

``` java
package com.laurel.mydemo.biz.socket;

import java.io.*;
import java.net.Socket;

/**
 * User: laurel
 * Date: 16/1/27
 * Time: 下午3:04
 */
public class SimpleClient {

    public static void main(String[] args) {
        Socket socket;
        try {
            socket = new Socket("127.0.0.1", 9000);
            System.out.println("A client started...");

            OutputStream os = socket.getOutputStream();
            InputStream is = socket.getInputStream();

            // get words from client console
            BufferedReader consoleReader = new BufferedReader(new InputStreamReader(System.in));
            // write something to server
            BufferedWriter serverWriter = new BufferedWriter(new OutputStreamWriter(os));
            // get reply from server
            BufferedReader serverReader = new BufferedReader(new InputStreamReader(is));

            /**
             * replace write("\n) with newLine(), newLine() is compatible for all operating systems.
             * serverWriter.write("\n");  -->  serverWriter.newLine();
             */
            // say hello to server
            serverWriter.write("Hello, server.");
            serverWriter.newLine();
            serverWriter.flush();


            int i = 0; // counter
            int talkLimit = 10; // talk times limit

            // get server's reply
            String reply;
            while ((reply = serverReader.readLine()) != null) {
                System.out.println("Server: " + reply);
                System.out.print("Client: ");

                // suspend and wait for user's input
                String msg;
                if ((msg = consoleReader.readLine()) != null) {
                    if ("88".equals(msg) || i++ == talkLimit) {
                        break;
                    }
                    serverWriter.write(msg);
                    serverWriter.newLine();
                    serverWriter.flush();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### (3)实现效果

首先启动服务端，然后启动客户端，就可以达到下面的效果。

<div style="text-align: center;">
	<image src="{{ post.url }}/static/images/java/socket.gif"></image>
</div>

上面的实例中，我们实现了一个服务端可以与多个客户端建立连接。每个客户端可以在自己的控制台输入字符串作为消息发送给服务端，服务端接受到消息后，发送成功消息给客户端。
这个实例是个简单的例程，只是实现了单向通信，即客户端可以在控制台发消息给服务端，而服务端不能在控制台发消息给客户端。
读者有兴趣的话，可以自行实现双向通信，即服务端也可以在控制台发消息给所有与其连接的客户端。
