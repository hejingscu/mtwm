仿美团外卖学习项目，自用vue学习作品

数据库由本地mongodb支持，nodejs在本地提供服务，vue实现view（用户端、管理端）

先自行安装mongodb 之后 启动数据库（cms进入到d:\mongodb\bin下执行 mongod --dbpath=D:\mongodb\db）

cnpm install  安装依赖

mongod --dbpath=D:\mongodb\db  启动本地数据库

cnpm run start  启动node（提供api服务）
cnpm run dev  开发模式

cnpm run build  线上打包

### 项目结构

admin/ 管理端
server/  node服务端
src/   用户端(暂不维护)

### 另外
本项目用户端 用react也同样进行了实现，功能和此版本完全一样，仅用作react学习
https://github.com/hejingscu/mtwm-react

### 命令
```bash
npm run dev                 # 开发模式
npm run build               # 打包编译
```

### 待解决问题
```bash
2..node服务端订单提交后将购物车中的数据删除
```

### 已解决问题
```bash
1.node服务端通过jwt给用户添加识别token
2.node服务端通过co控制异步操作
3.服务端存储购物车数据
```

# 项目布局

```
.
├── admin                                       // 后台管理系统（vue）
├── build                                       // webpack配置文件
├── config                                      // 环境参数配置
├── dist                                        // 打包文件输出目录
├── server                                      // Node.js提供数据接口
│   ├── db.js                                   // 数据模型
│   ├── api.js                                  // 业务逻辑
│   ├── index.js                                // 入口文件
├── src                                         // 项目主体
│   ├── components                              // 通用组件
│   ├── img                                     // 图片
│   ├── pages                                   // 所有页面
│   ├── router                                  // 路由配置
│   ├── service                                 // api接口
│   ├── utils                                   // 工具类
│   ├── vuex                                    // vuex
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── index.html                                  // 入口html文件

```

