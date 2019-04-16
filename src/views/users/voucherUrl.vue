<template>
  <div>
    <img :src="url">
  </div>
</template>
<script>
export default {
  data() {
    return {
      url:this.$route.query.url
    };
  },
  mounted() {
    
  },
  methods: {
    
  },
  watch: {},
  components: {}
};
</script>

 <style lang='less'>
@import "../users/index.css";
</style>