<template>
	<div class="text-center">

	</div>
</template>
<script>
import pagination from '@/components/pagination.vue'
//import holdnoUpload from '@/components/holdnoUpload.vue'
import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue';
import { getShop,addShop } from '@/service/getData'

export default{
	data() {
		return {
			
		}
    },
    methods:{
    	
	},
    components:{
        //'holdno-upload': holdnoUpload,
        'date-picker': myDatepicker,
        'pagination': pagination
        
    },
    created: function(){
                        
    }
}
</script>