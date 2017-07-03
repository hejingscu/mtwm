import axios from 'axios'

const state = {
    parentBarNode: {}
}

const actions = {
    changeParentBarNode({commit}, data){
        commit('changeParentBarNodeMutation', {data: data})
    },
    clearParentBarNode({commit}){
        commit('clearParentBarNodeMutation')
    }
}

const mutations = {
    clearParentBarNodeMutation: (state) => {
        state.parentBarNode = {}
    },
    changeParentBarNodeMutation: (state, { data }) => {
        state.parentBarNode = data
    }
}

const getters = {
    getParentBarNode: state => {
        return state.parentBarNode
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
