import axios from 'axios'
import fetch from '../config/fetch'

const baseUrl = 'http://localhost:3000/'//开发环境
				//'/'//生产环境

export const getList = params => fetch(baseUrl + 'api/getArticles', params);