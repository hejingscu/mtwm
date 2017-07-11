<template>
  <div>
    <div class="form-group col-md-6 text-center">
      <div class="input-group">
        <label for="" class="input-group-addon">起送价</label>
        <input type="text" class="form-control" v-model="formData.priceStart">
      </div>
      <div class="input-group">
        <label for="" class="input-group-addon">评分</label>
        <input type="text" class="form-control" v-model="formData.score">
      </div>
      <div class="input-group">
        <label for="" class="input-group-addon">优惠</label>
        <input type="text" class="form-control" v-model="formData.discount">
      </div>
      <a href="javascript:;" class="btn btn-primary" @click="submit()">提交</a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .input-group{
    margin-bottom: 10px;
  }
</style>
<script>
import { getShopManage, editShopManage } from '../../service/getData'
export default{
  data() {
    return {
      formData:{}
    }
  },
  methods: {
    async submit(){
      let res = await editShopManage(this.formData);
      this.$Notice.success({title: '修改成功'});
      this.getList()
    },
    getList(){
      let that = this
      getShopManage({id: that.$route.query.id}).then( res => {
        that.formData = res.data
      })
    }
  },
  created: function(){
    this.getList()
  }
}
</script>