<template>
<div class="text-center">
  <v-card>
    wangyang producted
  </v-card>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {

//    this.$http.get('/api/admin/db', {}).then(res => {
//      alert(111)
//      console.log(res)
//    })
  },
  mounted () {
    this.$http.get(`http://127.0.0.1:3000/api/admin/db`, {
    }).then(res => {
      console.log(res)
    })
//    this.$http.get('/api/admin/db').then(res => {
//      console.log(res)
//    })
  }
}
</script>
