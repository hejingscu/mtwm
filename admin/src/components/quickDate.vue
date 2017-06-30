<template>
	<div class="select-date row">
		<div class="btn" :class="[index === -1 ? 'btn-danger' : 'btn-info']" @click="quickDate(-1)">全部</div>
		<div class="btn" :class="[index === 1 ? 'btn-danger' : 'btn-info']" @click="quickDate(1)">昨日</div>
		<div class="btn" :class="[index === 7 ? 'btn-danger' : 'btn-info']" @click="quickDate(7)">最近7日</div>
		<div class="btn" :class="[index === 30 ? 'btn-danger' : 'btn-info']" @click="quickDate(30)">最近30日</div>
	</div>
</template>

<script>
export default {
  data(){
    return {
      index: -1
    }
  },
  props: {
    tab: {
      type: Number,
      default: -1
    },
    callback: {
      default() {
        return function callback(a) {
          // todo
          
        }
      }
    }
  },
  computed: {
    
  },
  methods: {
    quickDate(index) {
      this.index = index
      this.$emit('increment',index)
    }
  },
  created: function(){
    this.index = this.tab
  }
}
</script>