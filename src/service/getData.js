import axios from 'axios'
import fetch from '../config/fetch'

const baseUrl = '/mtwm-api/'
				//'http://10.200.4.140:3000/mtwm/'//开发环境
				//'/'//生产环境

/*注册*/
export const register = params => axios.post(baseUrl + 'user/register', params);

/*登录*/
export const login = params => axios.post(baseUrl + 'user/login', params);

/*七牛*/
export const getQiniuToken = params => axios.get('/house/qiniu/test');

/*店铺列表*/
export const getShop = params => axios.get(baseUrl + 'shop', {params: params});

/*获取banner*/
export const getBanner = params => axios.get(baseUrl + 'banner', params);

/*获取主页类目*/
export const getCategory = params => axios.get(baseUrl + 'category', params);

//获取店铺信息
export const getShopManage = params => axios.get(baseUrl + 'shop/manage/' + params.id);