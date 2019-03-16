<template>
    <div class="addMechanism">
    <h5 class="mg1">您当前做的业务是： <span>currentContentNName</span></h5>
    </div>
</template>

<script>
export default {
  name: 'addMechanism',
  data() {
    return {
      currentContentNName: '添加机构' // 通过路由传参数实现
    }
  }
}
</script>

<style scoped>
.mg1{
     margin-top:0px!important;
 }
</style>