function createStore(reducer = () => ({}), initialState = {}, middleware = []) {
  let state = initialState
  let subscriptions = []

  return {
    getState: () => state,
    subscribe: (fn) => { subscriptions.push(fn) },
    dispatch: (action) => {
      state = reducer(state, action)
      subscriptions.forEach(subscription => subscription())
    }
  }
}

module.exports = {
  createStore
}
