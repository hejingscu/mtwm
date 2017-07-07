import axios from 'axios'
import fetch from '../config/fetch'

const baseUrl = 'http://localhost:3000/mtwm/'//开发环境
				//'/'//生产环境
const adminUrl = 'http://localhost:3000/mtwm-admin/'

//获取七牛token

export const getQiniuToken = params => axios.get('/house/qiniu/test');

//店铺管理

export const getShop = params => axios.get(baseUrl + 'shop/list', params);

export const addShop = params => axios.post(adminUrl + 'shop/add', params);

export const editShop = params => axios.put(adminUrl + 'shop/edit', params);

export const deleteShop = params => axios.delete(adminUrl + 'shop/delete/' + params._id);

//配置商家信息

export const getShopManage = params => axios.get(adminUrl + 'shop/manage/' + params.id);

export const editShopManage = params => axios.put(adminUrl + 'shop/manage/edit', params);

//banner管理

export const getBanner = params => axios.get(baseUrl + 'banner/list', params);

export const addBanner = params => axios.post(adminUrl + 'banner/add', params);

export const editBanner = params => axios.put(adminUrl + 'banner/edit', params);

export const deleteBanner = params => axios.delete(adminUrl + 'banner/delete/' + params._id);

//类目管理

export const getCategory = params => axios.get(baseUrl + 'category/list', params);

export const addCategory = params => axios.post(adminUrl + 'category/add', params);

export const editCategory = params => axios.put(adminUrl + 'category/edit', params);

export const deleteCategory = params => axios.delete(adminUrl + 'category/delete/' + params._id);