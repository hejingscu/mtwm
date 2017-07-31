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
server/  node服务提供数据
src/  用户端

### 另外
本项目用户端 用react也同样进行了实现，功能和此版本完全一样，仅用作react学习
https://github.com/hejingscu/react-demo/tree/master/myApp