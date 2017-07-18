<template>
  <div>
    <div class="form-group col-md-12 text-center">
      <div class="col-md-6">
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
    <div class="col-md-12">
      <h3>商品区</h3>
      <div class="panel-box">
        <div class="panel-title"><i class="icon-calendar"></i>数据列表<div style="float: right;">
            <span class="btn-export" @click="addGoods()"><i class="fa fa-plus"></i>添加商品</span>
        </div></div>
        <div class="panel-body">
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                  <tr>
                    <td width="180">商品名称</td>
                    <td width="180">商品图标</td>
                    <td width="180">商品价格</td>
                    <td width="180">操作</td>
                </tr>
              </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in goodsData">
                  <td>
                    <span v-if="!item.isEdit">{{item.name}}</span>
                    <input v-else type="text" v-model="cacheGoodsData.name">
                  </td>
                  <td>
                    <img v-if="!item.isEdit" :src="item.icon" alt="" height="80">
                    <upload v-else :keyname="'cacheGoodsData.icon'" :img="cacheGoodsData.icon"></upload>
                  </td>
                  <td>
                    <span v-if="!item.isEdit" >{{item.price}}</span>
                    <input v-else type="text" v-model="cacheGoodsData.price">
                  </td>
                  <td>
                    <a href="javascript:;" v-if="!item.isEdit">修改</a>
                    <a href="javascript:;" v-if="!item.isEdit">删除</a>
                    <a href="javascript:;" @click="submitGoods()" v-if="item.isEdit">确定</a>
                    <a href="javascript:;" @click="cancel()" v-if="item.isEdit">取消</a>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- <upload class="col-md-12" :keyname="'imgData'" :mode="'multi'"></upload> -->
  </div>
</template>
<style lang="scss" scoped>
  .input-group{
    margin-bottom: 10px;
  }
</style>
<script>
import { getShopManage, editShopManage, addGoods } from '../../service/getData'
export default{
  data() {
    return {
      formData:{},
      //imgData: []
      goodsData: [],
      cacheGoodsData: {},
      itemGoods: {icon: '', name: '', price: '', isEdit: true}
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
        that.formData = that.littleCopy(res.data, ['priceStart', 'score', 'discount'])
        that.goodsData = res.data.goods
      })
    },
    addGoods(){
      let that = this
      if(that.cacheGoodsData.shopid){
        this.$Notice.success({title: '请先完成当前商品的编辑'});
      }
      else{
        that.goodsData.push(that.itemGoods)
        that.cacheGoodsData = {icon: "", name: '', price: '', shopid: that.$route.query.id}
      }
    },
    submitGoods(){
      addGoods(this.cacheGoodsData)
    },
    cancel(){
      
    }
  },
  created: function(){
    this.getList()
  }
}
</script>