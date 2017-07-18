import axios from 'axios'

const state = {
    foodsList: []
}

const actions = {
    getFoodsList({ commit },params){
        axios.get('http://10.200.4.140:3000/mtwm/shop/manage/' + params.id).then( res => {
            commit('getFoodsListMutaion', { data: res.data })
        })
    }
}

const mutations = {
    getFoodsListMutaion: (state, { data }) => {
        state.foodsList = data.goods
        state.foodsList.forEach( item => {
            item.count = 0
        })
    }
}

const getters = {
    foodsList: state => {
        return state.foodsList
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
