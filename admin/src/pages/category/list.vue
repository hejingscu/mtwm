<template>
	<div class="text-center">
		<div class="select-box">
			<div class="caption-box text-left"><span class="caption">筛选条件</span></div>
			<div class="filter-box row">
				<div class="col-md-4">
					<div class="input-group">
						<label for="" class="input-group-addon">开始时间</label>
						<date-picker field="startDate" placeholder="选择日期" v-model="filterOption.startDate" 
							format="yyyy-mm-dd" :backward="false" :no-today="false" :forward="false"></date-picker>
					</div>
				</div>
				<div class="col-md-4">
					<div class="input-group">
						<label for="" class="input-group-addon">结束时间</label>
						<date-picker field="endDate" placeholder="选择日期"  v-model="filterOption.endDate" format="yyyy-mm-dd" :backward="false" :no-today="false" :forward="false"></date-picker>
					</div>
				</div>
			</div>
		</div>

		<div class="panel-box">
			<div class="panel-title"><i class="icon-calendar"></i>数据列表<div style="float: right;">
                    <span class="btn-export" @click="toggleModal('add')"><i class="fa fa-plus"></i>添加类目</span>
                </div></div>
			<div class="panel-body">
				<table class="table table-striped table-bordered table-hover">
	                <thead>
		                <tr>
		                    <tr>
		                    	<td width="180">类目图标</td>
		                    	<td width="180">类目名称</td>
		                    	<td width="180">修改时间</td>
		                    	<td width="180">操作</td>
			                </tr>
		                </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="(item, index) in categoryData.data">
	                    	<td><img :src="item.icon" alt="" height="40"></td>
	                    	<td>{{item.name}}</td>
	                    	<td>{{item.updateTime | formatDate}}</td>
	                    	<td>
	                    		<a href="javascript:;" @click="toggleModal('modify', item)">修改</a>
	                    		<a href="javascript:;" @click="deleteItem('delete', item)">删除</a>
	                    	</td>
	                    </tr>
	                </tbody>
	            </table>
			</div>

		</div>

		<Modal v-model="showModalFlg" :mask-closable="false">
			<div class="ivu-modal-header"><div class="ivu-modal-header-inner">{{modalTitle}}类目</div></div>
	        <div style="font-size: 14px;margin-top: 20px;">
	        	<div class="col-md-12 form-group">
					<label for="" class="control-label col-md-3">类目名称<span class="required">*</span></label>
					<div class="fr col-md-9"><input type="text" class="form-control" v-model="modalData.name"></div>
				</div>
	        </div>
	        <div style="font-size: 14px;margin-top: 20px;">
	        	<div class="col-md-12 form-group">
					<label for="" class="control-label col-md-3">类目图标<span class="required">*</span></label>
					<div class="fr col-md-9">
						<upload :keyname="'modalData.icon'" :img="modalData.icon"></upload>
					</div>
				</div>
	        </div>
	        <div slot="footer">
	            <div class="btn btn-primary" @click="submit()">确定</div>
	            <div class="btn btn-default" @click="showModalFlg = false">取消</div>
	        </div>
	    </Modal>

	    <Modal v-model="showDeleteFlg" title="确认操作" :closable="false">
			您是否确定删除该店铺？
			<div slot="footer">
	            <div class="btn btn-primary" @click="submit()">确定</div>&nbsp;&nbsp;&nbsp;&nbsp;
	            <div class="btn btn-default" @click="showDeleteFlg = false">取消</div>
	        </div>
	    </Modal>

	</div>
</template>
<style>
	td{
		line-height: 40px !important;
		height: 40px;
	}
</style>
<script>
import pagination from '@/components/pagination.vue'
import upload from '@/components/upload.vue'
import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue';
import { getCategory,addCategory,editCategory,deleteCategory } from '@/service/getData'
export default{
	data() {
		return {
			categoryData: [],
			filterOption: {
				startDate: '',
				endDate: ''
			},
			modalData: {icon: '', name: ''},
			opType: 'add',//弹窗 添加or修改or删除
			showModalFlg: false,
			showDeleteFlg: false
		}
    },
    methods:{
    	//添加*修改数据
	    toggleModal(type,item){
	    	this.opType = type
	    	if(type=='modify'){
	    		this.modalTitle = '修改'
	    		this.modalData = this.littleCopy(item, ['_id', 'icon', 'name'])
	    		console.log(this.$children)
	    	}
	    	else{
	    		this.modalTitle = '添加'
	    		this.modalData = {icon: '', name: ''}
	    	}
	    	this.showModalFlg = !this.showModalFlg
	    },
	    //删除确认
	    deleteItem(type,item){
	    	this.opType = type
	    	this.showDeleteFlg = !this.showDeleteFlg
	    	this.modalData = this.littleCopy(item, ['_id'])
	    },
	    //提交数据
	    async submit(){
	    	if(this.opType == 'modify'){
	    		let res = await editCategory(this.modalData);
	    		this.showModalFlg = !this.showModalFlg
	    		this.getList()
	    	}else if(this.opType == 'add'){
	    		let res = await addCategory(this.modalData);
	    		this.showModalFlg = !this.showModalFlg
	    		this.getList()
	    	}else{
	    		let res = await deleteCategory(this.modalData);
	    		this.showDeleteFlg = !this.showDeleteFlg
	    		this.getList()
	    	}
	    },
	    getList(){
	    	getCategory().then( res => {
	    		this.categoryData = res
	    	})
	    }
	},
    components:{
        'date-picker': myDatepicker,
        'pagination': pagination,
        'upload': upload
    },
    created: function(){
    	this.getList()
    }
}
</script>