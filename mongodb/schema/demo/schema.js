module.exports = {
  "model":{
    "name" : { "type":"string" },
    "logo" : { "type":"string" },
    "date" : { "type": "Mixed"},
    "type" : { "type": "Mixed"},
    "status" : { "type": "Mixed"},
    "switch" : { "type": "Boolean"},
    "tags" : { "type": "Mixed"},
    "tags1" : { "type": "Mixed"},
    "tags2" : { "type": "Mixed"},
    "description" : { "type": "Mixed"},
    "intro" : { "type": "Mixed"},
    "isShow" : {"type": "Boolean", default:true}
  },
  "desc":[
    {"value": "name", 'text':"姓名", "align": 'left',
      "sortable": true,},
    {'value': 'logo', 'text':"图片", "align": 'left',
      "sortable": true, "type": "image"},
    {'value': 'date', 'text':"日期", "align": 'left',
      "sortable": true },
    {'value': 'type', 'text':'类型', "align": 'left',
      "sortable": true  },
    {'value': 'status', 'text':'状态', "align": 'left',
      "sortable": true  },
    {'value': 'switch', 'text':'开关' },
    {'value': 'tags', 'text':'标签' },
    {'value': 'tags1', 'text':'标签1' },
    {'value': 'tags2', 'text':'标签2' },
    {'value': 'description', 'text':'描述' },
    {'value': 'intro', 'text':'介绍' }
    ]
}