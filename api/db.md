*** 关于数据库使用

api/db.schema.json
存放数据库的列表

/mongodb
schema 中以文件夹的形式存放对应collection的model 数据类型

数据库列表页 所以collection默认添加isShow逻辑删除字段，如果在数据库操作数据为了展示别忘记手动添加该字段

后台如果要显示对应的列表以及详情 需要在后台formSchema中配置相关信息 文件夹名字以数据库为准
