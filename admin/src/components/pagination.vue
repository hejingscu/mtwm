<template lang="html">
  <div class="pagination-bar">
    <div class="pagesize">
      每页显示
      <select class="form-control" v-model="pageSize" style="display: inline-block; width: 70px;margin: 0 6px;" name="" id="">
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
        <option :value="200">200</option>
      </select>
       条/共<span style="margin: 0 6px;">{{total}}</span>条
    </div>
    
    <ul>
    <li v-if="cur!=1"><a v-on:click="firstPage()">首页</a><a v-on:click="prevPage()">上一页</a></li>
    <li v-if="cur===1"><a>首页</a><a>上一页</a></li>
    <li v-for="index in indexs"  v-bind:class="{ active: cur == index}">
        <a v-on:click="btnClick(index)">{{ index }}</a>
        </li>
        <li v-if="cur!=all"><a v-on:click="nextPage()">下一页</a><a v-on:click="lastPage()">末页</a></li>
        <li v-if="cur===all"><a>下一页</a><a>末页</a></li>
        <li><a>共<i>{{all}}</i>页</a></li>
    </ul>
  </div>
</template>

<script>
export default {
    data(){
      return {
         pageSize: 10
      }
    },
    props: {
      cur: {
        type: [String, Number],
        required: true
      },
      all: {
        type: [String, Number],
        required: true
      },
      total: {},
      callback: {
        default() {
          return function callback(a) {
            // todo
          }
        }
      }
    },
    computed: {
      indexs() {
        var left = 1
        var right = this.all
        var ar = [] 
        if (this.all >= 11) {
          if (this.cur > 5 && this.cur < this.all - 4) {
            left = this.cur - 5
            right = this.cur + 4
          } else {
            if (this.cur <= 5) {
              left = 1
              right = 10
            } else {
              right = this.all
              left = this.all -9
            }
          }
        }
        while (left <= right) {
          ar.push(left)
          left ++
        }   
        return ar
      }
    },
    methods: {
      btnClick(page) {
        if (page != this.cur) {
          this.callback(page)
        }
      },
      firstPage(){
        this.callback(1)
      },
      prevPage() {
        let page = this.cur
        this.callback(--page)
      },
      nextPage() {
        let page = this.cur
        this.callback(++page)
      },
      lastPage(){
        let totalPag = this.all
        this.callback(totalPag)
      }
    },
    watch: {
      pageSize: function(){
        this.$emit("pagechange", this.cur,this.pageSize)
      }
    }
}
</script>

<style lang="css">
ul,li {
  margin: 0px;
  padding: 0px;
}
.pagination-bar li {
  list-style: none;
  display: inline-block;
}
.pagination-bar li:first-child>a {
  margin-left: 0px
}
.pagination-bar .pagesize{
    float: left;
    line-height: 40px;
    padding-left: 20px;
    margin-right: -10%;
}
.pagination-bar a {
  border: 1px solid #ddd;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #337ab7;
  cursor: pointer
}
.pagination-bar a:hover {
    background-color: #eee;
    text-decoration: none;
}
.pagination-bar .active a {
  color: #fff;
  cursor: default;
  background-color: #337ab7;
  border-color: #337ab7;
}
.pagination-bar i {
  font-style:normal;
  margin: 0px 4px;
  font-size: 12px;
}
</style>