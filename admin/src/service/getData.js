import axios from 'axios'
import fetch from '../config/fetch'

const baseUrl = 'http://localhost:3000/mtwm/'//开发环境
				//'/'//生产环境
const adminUrl = 'http://localhost:3000/mtwm-admin/'

export const getList = params => fetch(baseUrl + 'shop/list', params);