<template lang="html">
  <div class="todos">
    <router-link to="/">home</router-link>
    <router-link to="todo">todo</router-link>
    <h1 class="todos-title">this is todos</h1>
    <el-input type="text" v-model="newtodo.text" @keydown.13.native="createTodo" clearable></el-input>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.text}}
        <span @click="delTodo(todo)">删除</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex"

export default {
  data() {
    return {
      newtodo:{
        text:""
      }
    }

  },
  computed:{
    ...mapGetters(["todos"])
  },
  methods:{
    ...mapActions(["addTodo","delTodo"]),
    createTodo(){
      this.addTodo({
        ...this.newtodo
      })
      this.newtodo.text=""

    }
  }
}
</script>

<style lang="less" scoped>
.todos {
  &-title {
    font-size: 28px;
    color:rebeccapurple;
  }
}
</style>
