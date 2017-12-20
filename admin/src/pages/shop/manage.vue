<template>
  <div>
    <div class="form-group col-md-12 text-center">
      <div class="col-md-5 modify-form">
        <h4>店铺基本信息</h4>
        {{formData}}
        <div class="input-group">
          <label for="" style="margin-right: 20px;">店铺名称</label>{{mainData.name}}
        </div>
        <div class="input-group">
          <label for="" class="input-group-addon">起送价</label>
          <input type="text" class="form-control" v-model="formData.priceStart">
        </div>
        <div class="input-group">
          <label for="" class="input-group-addon">配送费</label>
          <input type="text" class="form-control" v-model="formData.deliverPrice">
        </div>
        <div class="input-group">
          <label for="" class="input-group-addon">人均</label>
          <input type="text" class="form-control" v-model="formData.personPrice">
        </div>
        <div class="input-group">
          <label for="" class="input-group-addon">评分</label>
          <input type="text" class="form-control" v-model="formData.score">
        </div>
        <div class="input-group">
          <label for="" class="input-group-addon">配送时间</label>
          <input type="text" class="form-control" v-model="formData.deliverTime">
        </div>
        <div class="input-group">
          <span style="margin: 0 100px;">满</span><span style="margin: 0 100px;">减</span>
        </div>
        <div class="input-group">
          <label for="" class="input-group-addon">优惠</label>
          <input type="text" class="form-control w40" v-model="formData.discount[0].priceStart">&nbsp;&nbsp;&nbsp;<input type="text" class="w40 form-control" v-model="formData.discount[0].discountPrice">
        </div>
        <a href="javascript:;" class="btn btn-primary" @click="submit()">提交</a>
      </div>
      <div class="col-md-5 modify-form">
        <h4>{{opType == 'add' ? '添加' : '修改'}}商品</h4>
        <div class="input-group">
          <label for="" class="input-group-addon">商品名称</label>
          <input type="text" class="form-control" v-model="goodsFormData.name">
        </div>
        <div class="input-group">
          <label for="" class="input-group-addon">商品图片</label>
          <upload :keyname="'goodsFormData.icon'" :img="goodsFormData.icon" btnid="goodsImg" ref="upload"></upload>
        </div>
        <div class="input-group">
          <label for="" class="input-group-addon">价格</label>
          <input type="text" class="form-control" v-model="goodsFormData.price">
        </div>
        {{goodsFormData}}
        <a href="javascript:;" class="btn btn-primary" :disabled="!checkFormEmpty(goodsFormData)" @click="submitGoods()">{{opType == 'add' ? '添加' : '修改'}}</a>
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
                    <span>{{item.name}}</span>
                  </td>
                  <td>
                    <img :src="item.icon" alt="" height="80">
                  </td>
                  <td>
                    <span>{{item.price}}</span>
                  </td>
                  <td>
                    <a href="javascript:;" @click="editGoods(item)">修改</a>
                    <a href="javascript:;">删除</a>
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
  h4{
    margin-bottom: 20px;
  }
  .modify-form{
    border: 1px solid #ddd;
    margin: 10px;
    padding: 10px;
  }
</style>
<script>
import { getShopManage, editShopManage, addGoods } from '../../service/getData'
import * as api from '@/service/getData'
export default{
  data() {
    return {
      mainData: {},
      formData:{},
      opType: 'add',
      goodsData: [],
      cacheGoodsData: {},
      itemGoods: {icon: '', name: '', price: '',isEdit: true},
      goodsFormData: {name: '', icon: '', price: ''}
    }
  },
  methods: {
    //店铺基本信息
    async submit(){
      let res = await editShopManage(this.formData);
      this.$Notice.success({title: '修改成功'});
      this.getList()
    },
    getList(){
      let that = this
      getShopManage({id: that.$route.query.id}).then( res => {
        that.mainData = res.data
        that.formData = that.littleCopy(res.data, ['priceStart', 'score', 'discount',"deliverTime", "_id", "personPrice", 'deliverPrice'])
        that.goodsData = res.data.goods
        if(!res.data.discount){
          that.formData.discount = [{priceStart: 0, dicountPrice: 0}]
        }
        console.log(that.formData)
      })
    },
    addGoods(){
      this.opType = 'add'
      this.goodsFormData = {name: '', icon: '', price: ''}
    },
    editGoods(item){
      this.opType = 'edit'
      this.goodsFormData = this.littleCopy(item, ['name', 'icon', 'price', 'goodsId'])
    },
    // addGoods(){
    //   let that = this
    //   if(that.cacheGoodsData.shopid){
    //     this.$Notice.success({title: '请先完成当前商品的编辑'});
    //   }
    //   else{
    //     that.goodsData.push(that.itemGoods)
    //     that.cacheGoodsData = {icon: "", name: '', price: '', shopid: that.$route.query.id}
    //   }
    // },
    async submitGoods(){
      this.goodsFormData._id = this.$route.query.id
      if(this.opType == 'add'){
        let res = await api.addGoods(this.goodsFormData);
      }else{
        let res = await api.editGoods(this.goodsFormData);
      }
      this.$Notice.success({title: '修改成功'});
      this.goodsFormData = {name: '', icon: '', price: ''}
      this.getList()
      this.$refs['upload'].clearimg()
    },
    cancel(){
      
    }
  },
  created: function(){
    this.getList()
  }
}
</script>