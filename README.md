仿美团外卖学习项目，自用学习作品
数据库由本地mongodb支持，无线上服务

先自行安装mongodb 之后 启动数据库（cms进入到d:\mongodb\bin下执行 mongod --dbpath=D:\mongodb\db）

cnpm install  安装依赖

mongod --dbpath=D:\mongodb\db  启动本地数据库

cnpm run start  启动node（提供api服务）
cnpm run dev  开发模式

cnpm run build  线上打包
