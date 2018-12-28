<template>

  <v-layout>
    <v-flex xs8="xs8">
      <v-form v-model="model" v-if="dataReady" v-bind="$data" :method="method" :action="action" @success="onSuccess">

        <v-alert class="py-3" error="error"  :value="hasError.show" type="error">
          {{hasError.value}}
        </v-alert>
        <div class="my-4" slot="buttons">
          <v-btn class="grey" dark="dark" @click.native="$root.back()">
            <v-icon dark="dark" left="left">chevron_left</v-icon><span>{{$t('Back')}}</span>
          </v-btn>
          <v-btn primary="primary" dark="dark" type="submit">{{$t('Submit')}}
            <v-icon right="right" dark="dark">send</v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import schema from "../../config/model.schema.json";
export default {

  data () {
    return {
      model: {},
      fields: {},
      rules: {"name": 'required'},
      messages: {},
      hasError: {show:false, value:""},
      dataReady: false,
      urlResource: this.$route.params.resource
    }
  },
  computed: {
    method () {
      return 'post'
    },
    action () {
      if (this.isEdit) {
        return `/${this.collectionNumber}/modify/${this.id}`
      } else {
        return `/${this.collectionNumber}/add`
      }
    },
    isEdit () {
      return !!this.id
    },
    resource () {
      return this.$route.params.resource
    },
    id () {
      return this.$route.params.id
    },
    collectionNumber (){
      return schema.collection.indexOf(this.$route.params.resource)
    },
    showList (){
      return schema.showList[this.collectionNumber].length>0?schema.showList[this.collectionNumber].join(","):"";
    }
  },
  watch: {
    '$route': 'fetch'
  //  'model': 'updateFields'
  },
  methods: {
    getFieldError (fieldName) {
      for (let k in this.errors) {
        let error = this.errors[k]
        if (error.field === fieldName) {
          return error.message
        }
      }
    },

    fetch () {
      let schema = require(`../formSchema/${this.resource}/schema.json`);
      let newModel = {};

      if(this.isEdit){
        this.$http.get(`/${this.collectionNumber}/getListSingle`, {
          params: {id: this.id}
        }).then(res => {

              this.model = res.data.data;

              this.dataReady = true;

        })
      }
      else{
        this.dataReady = true;
        this.model = newModel;
      }

      // this.fields = data.data.fields  //根据不同要求自定义
      this.fields = schema

    },
    onSubmit () {

    },
    onSuccess (data) {
      if(data.succeed && data.errorCode =='0000000'){
        this.$router.push({name: 'grid', params: {resource: this.resource}})
      }
      else{
        this.hasError = { show: true, value:data.errorMsg}
      }
    }
  },
  created () {
    //console.log("grudform created");
    this.fetch();
    let pageTitle = (this.isEdit ? 'Update' : 'Create') + ' ' + global.helper.i.titleize(global.helper.i.singularize(this.resource))
    //console.log(pageTitle);
    this.$store.commit('setPageTitle', pageTitle)
  },
  mounted () {
    //console.log("grudform mounted");
  }
}
</script>
