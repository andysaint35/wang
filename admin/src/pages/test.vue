<template>
  <div class="text-center">

    <test1></test1>
  </div>
</template>

<script>
  import test1 from '../components/test1.vue';
  export default {

    components:{
      test1:test1
    },
    data () {
      return {
        background: ''
      }
    },
    created(){
      console.log("test created");
    },
    mounted(){
      console.log("test mounted");
    },
  }
</script>
