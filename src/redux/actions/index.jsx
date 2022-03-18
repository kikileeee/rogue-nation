import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const presistConfig = {
    key:'main-root',
    storage
}
const reducerFn = (state = 0, action) => {
    if (action.type === 'INC') {
        return state + 1
    }
    else if (action.type === 'DESC') {
        if (state > 0) {
            return state - 1
        }
        else {
            return state = 0
        }
    }
    else if (action.type === 'RESET') {
        return state = 0
    }
    else {
        return state
    }
}

const store = createStore(reducerFn)
export default store