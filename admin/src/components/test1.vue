<template>
  <div>
    <test2 v-for="i in loop" :key="i"></test2>
  </div>
</template>
<script>

  import test2 from "./test2.vue";
  export default {
    components: {
      test2
    },
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
    created(){
      console.log("test1 created");
    },
    mounted(){
      console.log("test1 mounted");
    },
    data () {
      return {

        loop: [1, 2, 3, 4, 5]
      }
    }
  }
</script>