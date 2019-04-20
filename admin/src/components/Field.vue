<template>
  <v-flex xs12="xs12">
    <v-select
      v-if="['select', 'select2'].includes(field.type)"
      :items="options"
      v-model="model"
      v-bind="field"
    ></v-select>
    <template v-else-if="['radios', 'checkboxes'].includes(field.type)">
      <p>{{$t(field.label)}}</p>
      <v-layout
        row="row"
        wrap="wrap"
      >
        <v-flex
          v-bind="{[field.width]: true}"
          xs12="xs12"
          v-for="option in options"
          :key="field.value"
        >
          <component
            v-model="model"
            hide-details="hide-details"
            color="blue"
            :is="field.type == 'radios' ? 'v-radio' : 'v-checkbox'"
            :key="option.value"
            :value="option.value"
            :label="option.text"
          ></component>
        </v-flex>
      </v-layout>
    </template>
    <template v-else-if="['date', 'datetime', 'time'].includes(field.type)">
      <v-menu>
        <v-text-field
          slot="activator"
          v-model="model"
          :label="$t(field.label)"
        ></v-text-field>
        <v-date-picker
          v-model="model"
          no-title="no-title"
          scrollable="scrollable"
          actions="actions"
        ></v-date-picker>
      </v-menu>
    </template>
    <template v-else-if="['switch'].includes(field.type)">
      <v-switch
        :label="$t(field.label)"
        v-model="model"
        color="blue"
      ></v-switch>
    </template>
    <div
      :class="inputGroupClass"
      v-else-if="field.type == 'html'"
    >
      <label>{{$t(field.label)}}</label>
      <div class="pt-2">
        <quill-editor v-model="model"></quill-editor>
      </div>
    </div>
    <!--todo dropzone-->

    <div
      :class="inputGroupClass"
      v-else-if="['file', 'image', 'video'].includes(field.type)"
    >
      <label>{{$t(field.label)}}</label>
      <div class="pt-2">

        <dropzone
          :id="'dropzone_' + name"
          :name="'upload_' + name"
          ref="mydropzone"
          :options="uploadOptions"
          v-on:vdropzone-success="fileSuccess"
          v-on:vdropzone-queue-complete="queueComplete"
          v-on:vdropzone-removed-file="removedFile"
        >
          <v-text-field
            type="hidden"
            :name="name"
            v-model="model"
            :refs="name"
          />
        </dropzone>

      </div>
    </div>

    <v-text-field
      v-else-if="['password'].includes(field.type)"
      v-model="model"
      v-bind="field"
      :label="$t(field.label)"
      :placeholder="$t(field.placeholder)"
      :type="showpsw ? 'text' : 'password'"
    ></v-text-field>
    <!-- @click:append="showpsw = !showpsw"  :append-icon="showpsw ? 'visibility' : 'visibility_off'"-->
    <v-text-field
      v-else
      v-model="model"
      v-bind="field"
      :label="$t(field.label)"
      :placeholder="$t(field.placeholder)"
      type="text"
      :multiLine="field.type == 'textarea'"
    ></v-text-field>
  </v-flex>
</template>

<script>
import UUID from "uuid/v4";

export default {
  props: {
    field: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    value: {
      required: false
    }
  },
  data() {
    return {
      inputGroupClass: "input-group input-group--dirty input-group--text-field",
      uploadOptions: {
        paramName: "upload_file",
        url: config.ajaxUploadUrl,
        thumbnailWidth: 150,
        addRemoveLinks: true,
        dictRemoveFile: "删除",
        dictCancelUpload: "取消",
        dictDefaultMessage: "点击上传",
        renameFile: function(file) {
          var uuid = UUID();
          var filename = file.name;
          var nameArray = filename.split(".");
          var type = nameArray[nameArray.length - 1];
          var name = "";
          for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
          }
          var date = new Date();
          var time = "_" + uuid.split("-").join("");
          return name + time + "." + type;
        },
        init: function() {
          this.on("sending", function(file, xhr, data) {
            data.append("size", file.size);
            data.append("type", file.type);
          });
        }
      },
      uploadData: [],
      options: [], //如果是ajax的数值用这个变量替换
      showpsw: false
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },

  created() {
    if (this.field.ajax) {
      this.$http[this.field.ajax.method || "post"](
        `/${this.field.ajax.dbNumber}/getOptions`,
        {}
      ).then(res => {
        this.options = res.data.data;
      });
    } else {
      this.options = this.field.options;
    }
  },

  mounted() {
    //console.log("field mounted");
    this.initImageLoad();
  },

  methods: {
    renameUploadFile(file, uuid) {},
    // 全部完成
    queueComplete() {
      this.model = JSON.stringify(this.uploadData);
    },

    //单个完成
    fileSuccess(file, xhr) {
      this.uploadData.push(xhr);
    },

    removedFile(file, error, xhr) {
      //console.log("uploadData" , this.uploadData);
      //console.log("file" , file);

      for (var i = 0; i < this.uploadData.length; i++) {
        if (this.uploadData[i].name == file.name) {
          this.uploadData.splice(i, 1);
          break;
        }
      }
      this.model = JSON.stringify(this.uploadData);
    },

    initImageLoad() {
      if (
        this.field.type &&
        ["file", "image", "video"].includes(this.field.type)
      ) {
        //console.log('value',this.value);
        if (!this.value) {
          return;
        }
        this.model = this.value;
        let mydropzone = this.$refs.mydropzone;
        let imageData = JSON.parse(this.value);
        this.uploadData = imageData;
        imageData.map((item, index) => {
          var url = `${config.url}${item.url}`;
          var mockFile = {
            name: `${item.name}`, //需要显示给用户的图片名
            size: `${item.size}`, //图片尺寸
            type: `${item.type}` //图片文件类型,
          };
          mydropzone.manuallyAddFile(mockFile, url);
        });
      }
    }
  }
};
</script>
