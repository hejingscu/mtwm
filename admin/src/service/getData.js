import axios from 'axios'
import fetch from '../config/fetch'

const baseUrl = 'http://localhost:3000/mtwm/'//开发环境
				//'/'//生产环境
const adminUrl = 'http://localhost:3000/mtwm-admin/'

export const getShop = params => axios.get(baseUrl + 'shop/list', params);

export const addShop = params => axios.post(adminUrl + 'shop/add', params);

export const editShop = params => axios.put(adminUrl + 'shop/edit', params);

export const deleteShop = params => axios.delete(adminUrl + 'shop/delete/' + params._id);