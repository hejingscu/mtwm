import axios from 'axios'
import fetch from '../config/fetch'

const baseUrl = 'http://10.200.4.140:3000/mtwm/'//开发环境
				//'/'//生产环境

export const getQiniuToken = params => axios.get('/house/qiniu/test');

export const getShop = params => axios.get(baseUrl + 'shop', {params: params});

export const getBanner = params => axios.get(baseUrl + 'banner', params);

export const getCategory = params => axios.get(baseUrl + 'category', params);

//获取店铺信息
export const getShopManage = params => axios.get(baseUrl + 'shop/manage/' + params.id);