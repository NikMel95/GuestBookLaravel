import ApiService from '../common/api.service'
import { GET_GUESTBOOK, ADD_GUESTBOOK } from './actions.type'
import { SET_GUESTBOOK, ADD_NEW } from './mutations.type'

const state = {
  messages: [],
  total: 0,
  errors: []
}

const getters = {
  get_messages (state) {
    return state.messages
  },
  get_total (state) {
    return state.total
  }
}

const actions = {
  [GET_GUESTBOOK](context, page) {
    return new Promise(resolve => {
      ApiService.get('/guestbook/?page=' + page)
        .then(({ data }) => {
          context.commit(SET_GUESTBOOK, data)
          resolve(data)
        })
        .catch(({ response }) => {
          resolve(response)
        })
    })
  },
  [ADD_GUESTBOOK](context, args) {
    return new Promise(resolve => {
      ApiService.post('/guestbook', args)
        .then(({ data }) => {
          context.commit(ADD_NEW, data.data)
          resolve(data)
        })
        .catch(({ response }) => {
          resolve(response)
        })
    })
  },
}

const mutations = {
  [ADD_NEW] (state, data) {
    state.messages.unshift(data)
    state.total = state.total + 1
  }, 
  [SET_GUESTBOOK] (state, data) {
    if(data.total) {
      state.total = data.total  
    }
    for(var i = 0; i<data.data.length; i++) {
      state.messages.push(data.data[i])  
    }
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}