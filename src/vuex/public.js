import axios from 'axios'

const state = {
    position: 0
}

const actions = {
    SAVE_POSITION({ commit },params){
        console.log(2)
        commit('savePositionMutation', { data: params })
    }
}

const mutations = {
    savePositionMutation: (state, { data }) => {
        state.position = data
    }
}

const getters = {
    
}

export default {
    state,
    actions,
    mutations,
    getters
}
