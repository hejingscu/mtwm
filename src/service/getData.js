import axios from 'axios'
import fetch from '../config/fetch'

const baseUrl = 'http://10.200.4.140:3000/mtwm/'//开发环境
				//'/'//生产环境

export const getQiniuToken = params => axios.get('/house/qiniu/test');

export const getShop = params => axios.get(baseUrl + 'shop/list', params);

export const getBanner = params => axios.get(baseUrl + 'banner/list', params);

export const getCategory = params => axios.get(baseUrl + 'category/list', params);