<template>
<div>
  <label>{{label}}</label>
  <div class="pt-2">

    <dropzone :id="'dropzone_' + name"  :name="'upload_' + name" ref="mydropzone" :options="uploadOptions" v-on:vdropzone-success="fileSuccess" v-on:vdropzone-queue-complete="queueComplete" v-on:vdropzone-removed-file="removedFile">
      <v-text-field type="hidden" :name="name" v-model="model" :refs="name" />
    </dropzone>

  </div>
</div>

</template>

<script>


export default {

  props: {
    uploadfile:String,
    label:String,
    name:String
  },
  data () {
    return {
      uploadData:[],
      model:"",
      uploadOptions: {
        paramName: "upload_file",
        url:config.ajaxUploadUrl,
        thumbnailWidth: 150,
        addRemoveLinks:true,
        dictRemoveFile : "删除",
        dictCancelUpload: "取消",
        dictDefaultMessage: "点击上传",
        createImageThumbnails: true,
        renameFile: function(file){
          var uuid = UUID();
          var filename = file.name;
          var nameArray = filename.split('.');
          var type = nameArray[nameArray.length - 1];
          var name = '';
          for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
          }
          var date = new Date();
          var time = '_' + uuid.split("-").join("");
          return name + time + '.' + type;
        },
        init: function(){
          this.on("sending", function(file, xhr, data) {
            data.append("size", file.size);
            data.append("type", file.type);

          });
        }
      }
    }
  },
  watch: {
    'value' (val) {
      console.log(val);
    },
  },
  computed: {

  },

  created(){
    console.log("uploadfile created");
  },

  mounted() {
    console.log("uploadfile mounted");
    this.initImageLoad();
  },

  methods: {

    renameUploadFile(file, uuid){

    },
    // 全部完成
    queueComplete(){
      this.model = JSON.stringify(this.uploadData);
    },

    //单个完成
    fileSuccess(file, xhr){
      this.uploadData.push(xhr);
    },

    removedFile(file, error, xhr){

      for(var i=0;i<this.uploadData.length; i++){
        if(this.uploadData[i].name == file.upload.filename){
          this.uploadData.splice(i,1);
          break;
        }
      }
      this.model = JSON.stringify(this.uploadData);
    },

    initImageLoad(){
        if(!this.value){
          return;
        }
        this.model = this.value;
        let imageData = JSON.parse(this.value);
        this.uploadData = imageData;
        imageData.map((item, index)=>{
          var url = `${config.url}${item.url}`;
          var mockFile = {
            name: `${item.name}`, //需要显示给用户的图片名
            size: `${item.size}`, //图片尺寸
            type: `${item.type}`//图片文件类型,
          };
          mydropzone.manuallyAddFile(mockFile, url);
        })
      }
  }
}
</script>
