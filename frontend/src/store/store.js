import rootReducer from '../reducers/index';

const store = createStore(rootReducer);

console.log('store from rootReducer',store);