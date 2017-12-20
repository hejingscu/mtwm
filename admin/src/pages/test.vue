<template>
	<div class="text-center">
		<table>
			<thead>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
			</thead>
			<tbody>
				<tr v-for="item in typeIist">
					<td>{{item}}</td>
					<td>{{typePrice[item+'1']}}</td>
					<td>{{typePrice[item]}}</td>
					<td>{{typePrice[item+'2']}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<style>
	td{
		line-height: 40px !important;
		height: 40px;
	}
</style>
<script>
import axios from 'axios'
export default{
	data() {
		return {
			url: 'http://api.zb.com/data/v1/ticker?market=',
			typeIist: ['btc','ltc','eth','etc','bts','hsr','eos','xrp','bcd','tv'],
			typePrice: {
				'btc': 0,'btc1': 17780,
				'ltc': 0,'ltc1': 347.95,
				'eth': 0,'eth1': 821.9,
				'etc': 0,'etc1': 39.1,
				'bts': 0,'bts1': 0.47,
				'hsr': 0,'hsr1': 35.8,
				'eos': 0,'eos1': 11.71,
				'xrp': 0,'xrp1': 0.7261,
				'bcd': 0,'bcd1': 57.3,
				'tv': 0,'tv1': 0.453
			}
		}
    },
    methods: {
    	getData(){
    		let that = this
    		this.typeIist.map((item,i)=>{
    			axios.get(this.url+item+'_usdt').then(res=>{
    				console.log(res.data.ticker.last)
	    			that.typePrice[item] = res.data.ticker.last
	    			that.typePrice[item+'2'] = (that.typePrice[item]-that.typePrice[item+'1'])/that.typePrice[item+'1']*100+'%'
	    		})
    		})
    		
    	},

    },
    created: function(){
    	let that = this
    	this.getData()
    	setInterval(()=>{
    		that.getData()
    	},10000)
    }
}
</script>