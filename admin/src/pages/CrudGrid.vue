<template>
  <div>
    <v-layout>
      <v-flex md4="md4"></v-flex>
      <v-flex md8="md8">
        <v-form class="row jr" :inline="true" v-model="filters.model" v-if="filters.fields" :fields="filters.fields" @submit="doSearch" submitButtonText="Search" submitButtonIcon="search"></v-form>
      </v-flex>
    </v-layout>
    <v-card>
      <v-card-title>
      <div>
        <v-btn class="green" router="router" fab="fab" absolute="absolute" top="top" right="right" dark="dark" :to="{name: 'create', params: {resource}}" v-if="options.create !== false">
          <v-icon>add</v-icon>
        </v-btn>
      </div>

      <!-- :headers  标题
       headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ]

      :items 内容
      items: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        }
        key 对应 header 的value


        :hide-actions 是否隐藏操作   Boolean
        true 会显示所有item

        :total-items 设置项目总数
      ]
       -->

      </v-card-title>
      <v-data-table :headers="columns" :items="items" :total-items="pagination.totalItems" :hide-actions="true" :pagination.sync="pagination" :loading="loading" :search="search">

        <template slot="no-data">
          <v-alert color="error" icon="warning">
            无数据
          </v-alert>
        </template>


        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td :class="column.left? '': 'text-xs-left'" data-attr="column" v-for="column in columns" v-html="getColumnData(props.item, column)"></td>
            <td v-if="actions !== false" width="160">
              <template v-for="(value, action) in actions">

                <v-btn v-if="['edit', 'delete'].indexOf(action) &lt; 0" router="router" primary="primary" fab="fab" small="small" dark="dark" :to="{name: action, params: {resource,id:props.item._id}}">

                  <v-icon>{{action.icon ? action.icon : action}}</v-icon>
                </v-btn>
              </template>
              <v-btn v-if="options.edit !== false" dark="dark" primary="primary" fab="fab" small="small" :to="{name: 'edit', params: {resource,id:props.item._id}}">
                <v-icon>edit</v-icon>
              </v-btn>
              <!-- also you can try this: inline edit-->
              <v-btn v-if="options.edit !== false" dark="dark" fab="fab" success="success" small="small" @click.native.stop="showEdit(props.item)">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn v-if="options.delete !== false" fab="fab" small="small" @click="removeConfirm(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-card-text>Peek-a-boo!</v-card-text>
          </v-card>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          您搜索的 "{{ search }}" 没有找到.
        </v-alert>
      </v-data-table>
      <div class="jc">
        <v-pagination class="ma-3" v-model="pagination.page" :length="totalPages" circle="circle"></v-pagination>
      </div>
    </v-card>

    <v-dialog v-model="isShowEdit" width="70%">
      <v-card>
        <v-card-title>编辑</v-card-title>
        <v-card-text>
          <v-form v-model="form.model" v-bind="form" method="post" :action="'/modify/'+currentItem._id" @success="onSaveEdit"></v-form>
        </v-card-text>
        <v-card-actions actions="actions">
          <v-btn flat="flat" primary="primary" @click.native="isShowEdit = false">{{$t('Close')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="isShowConfirm"
      max-width="290">
      <v-card>
        <v-card-title class="headline">注意</v-card-title>
        <v-card-text>
         确定要删除
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="isShowConfirm = false">取消</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="remove()">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import schema from "../../config/model.schema.json";
  import file from "@/images/file.png";
const getDefaultData = () => {
  return {
    form: {
      model: {},
      fields: {},
      rules: {},
      messages: {}
    },
    filters: {
      model: {},
      fields: null
    },
    loading: false,
    columns: [], // fetch grid setup params from server if `columns` is empty
    actions: {},
    dataParams:{},
    options: {
      sort: 'id',
      create: false,
      update: true,
      delete: false
    },
    pagination: {
      page: 1,
      rowsPerPage: 10,
      sortBy: 'id',
      descending: true,
      totalItems: 0
    },
    isShowEdit: false,
    currentItem: false,
    items: [],
    search:'',
    isShowConfirm:false
  }
}
export default {

  data: getDefaultData,

  watch: {
    '$i18n.locale' (val) {
      this.fetchDb().then((res)=>{this.fetchGrid(res)})
    },
    'pagination.page' (val) {
      this.fetchDb().then((res)=>{this.fetchData(res)})

    },
    'pagination.sortBy' (val) {
      this.dataParams = Object.assign(this.dataParams, {sortBy: (val||'')})
      this.fetchDb().then((res)=>{this.fetchData(res)})
    },
    'pagination.descending' (val) {
      let descendval = val==null?'':val;
      this.dataParams = Object.assign(this.dataParams, {descending: descendval})
      this.fetchDb().then((res)=>{this.fetchData(res)})
    },
    '$route.params'(val){
      console.log('params', val);
    }
    //'$route.params': 'refresh'
    // '$route.query': 'updateRoute'
  },
  methods: {
    fetchForm (item) {
      this.$http.get(`/${this.collectionNumber}/getListSingle`, {
        params: {id: item._id, collection:this.collectionNumber}
      }).then(data => {

        this.form.model = data.data.data;
        this.form.fields = {
          'name': {
            'label': '姓名',
            'required': true
          },
          'tel':{
            'label': '电话',
            'required': true
          },
          'score':{
            'label': '分数'
          }
        }
      })
    },
    onSaveEdit (res) {
      if (res.succeed && res.errorCode=='0000000') {
        this.isShowEdit = false
        this.fetchDb().then((res)=>{this.fetchData(res)})
      }
    },
    // 显示修改编辑框
    showEdit (item) {
      this.currentItem = item
      this.fetchForm(item)
      this.isShowEdit = true
    },
    preFetch () {
      let sort = this.pagination.sortBy
      if (this.pagination.descending) {
        sort = '-' + sort
      }
      this.$route.query.query = JSON.stringify(this.filters.model)
      this.$route.query.sort = sort
      this.$route.query.perPage = this.pagination.rowsPerPage
      this.$route.query.page = this.pagination.page
    },
    updateRoute () {
      this.$route.query.keepLayout = true
      this.$router.go({
        path: this.$route.path,
        params: this.$route.params,
        query: this.$route.query
      })
    },
    doSearch () {
      this.pagination.page = 1
      this.fetchDb().then((res)=>{this.fetchData(res)})
    },
    filter (val, search) {
      return true
      // this.search = search
      // this.fetchData()
      },
      refresh () {
        Object.assign(this.$data, getDefaultData())
        this.fetchDb().then((res)=>{
          this.fetchGrid(res)
          this.fetchData(res)
        })
      },
      fetch () {
        if (this.columns.length <= 0) {
        // fetch grid params from server: e.g. /crud/users/grid
          this.fetchDb().then((res)=>{this.fetchGrid(res)})
      } else {
        // or define grid params manually
          this.fetchDb().then((res)=>{this.fetchData(res)})
      }
    },
    // field 是标题   row 是内容
    getColumnData (row, field) {
      // process fields like `type.name`

      let [l1, l2] = field.value.split('.')

      let value = row[l1]
      let tag = null
      let imgArray = [];
      if (l2) {
        value = row[l1] ? row[l1][l2] : null
      }


      if (field.type == 'image') {
        if(!value){
          return
        }
        tag = "img"

        imgArray = JSON.parse(value);
      }
      if (tag) {
        value = "";
        imgArray.map((item, index) =>{
          var suffix = item.url.split(".")[1].toLowerCase();
          if(suffix == "jpg" || suffix == "png" || suffix == "jpeg" || suffix == "gif") {
            value += `<${tag} src="${config.url}${item.url}" class="crud-grid-thumb" controls /><br />`
          }
          else{
            value += `<${tag} src="${file}"  class="crud-grid-thumb" controls height="45" /><br />`
          }
        })
      }
     // this.refresh();
      return value
    },

    fetchDb (){
      let listDataParams = Object.assign({}, this.dataParams, {
        curPageNo: this.pagination.page,
        pageSize: this.pagination.rowsPerPage,
        show: this.showList
      });
      return this.$http.get(`/${this.collectionNumber}/getList`, {params:listDataParams})
    },

    fetchGrid (res) {
         var data = {
            columns:res.data.data.desc
          }
          for (let k in data.columns) {
            data.columns[k].text = this.$t(data.columns[k].text)
          }
          this.columns = data.columns || {}     //标题
          this.actions = data.actions || {}
          this.filters = data.filters || {}
          this.options = data.options || {}

          if (this.options && this.options.sort) {
            let sortData = this.options.sort.split('-')
            let desc = sortData.length > 1
            let sortField = sortData.pop()
            this.pagination.sort = sortField
            this.pagination.descending = desc
          }
    },
    // 获取数据
    fetchData (res) {
      this.preFetch();
        this.items = res.data.data.list;

        this.pagination.totalItems = res.data.data.pageInfo.recordCount;

    },
    removeConfirm (item){
      this.currentItem = item;
      this.isShowConfirm = true;
    },
    remove () {
      let item = this.currentItem;
      this.isShowConfirm = false;
      this.$http.post(`/${this.collectionNumber}/remove`, {id:item._id}).then(data  => {
          if(data.data.succeed && data.data.errorCode=='0000000'){
            this.fetchDb().then((res)=>{this.fetchData(res)})
          }
          else{

          }
      })
    },
    next () {
      this.pagination.page++
    }
  },
  computed: {
    resource () {
      return this.$route.params.resource
    },
    totalPages () {
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    collectionNumber (){
      return schema.collection.indexOf(this.$route.params.resource)
    },
    showList (){
      return schema.showList[this.collectionNumber].length>0?schema.showList[this.collectionNumber].join(","):"";
    }
  },

  mounted () {
  },
  created () {
    this.$store.commit('setPageTitle', global.helper.i.titleize(global.helper.i.pluralize(this.resource)))
    this.fetchDb().then((res)=>{
      this.fetchGrid(res)
      this.fetchData(res)
    })
    // this.fetch()
  }

}
</script>
