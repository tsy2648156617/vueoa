<template>
    <router-view />
</template>

<script>
export default {
    created: function() {
    //全局监听，页面刷新的时候将store里state的值存到sessionStorage中，
    //然后从sessionStorage中获取，再赋值给store。然后再把session里面
    //存的删除即可，相当于中间件的作用。在页面加载时读取sessionStorage
    //里的状态信息
    //console.group("in main.js created............................begin")
    //console.log(sessionStorage.getItem("state"))
    if (sessionStorage.getItem("state")) {
      //替换 store 的根状态，状态合并
      //Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性
      //，复制到目标对象（target）。Object.assign(target, source1, source2);
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("state"))
        )
      )
    }
    //console.log("in main.js created............................end")
    //console.groupEnd()
  },
  mounted: function() {
    window.addEventListener('beforeunload', () => {
      //刷新前将目前登录的用户保存到sessionStorage中
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    })
  }

};
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>
