import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  newmail:0,
  unreadMailNotification:0,
  unreadRefrenceNotification:0,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
