<template>
<!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>
             <!-- 在定义组件的模板中用slot标签来接受传入的模板内容 -->
             <!-- 希望自己的元素被哪个插槽使用 传入就用slot='插槽名'的方式配置 -->
             <slot name="title"></slot>
         </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
