function createStore(reducer = () => ({}), initialState = {}, middlewareApplier) {
  if (middlewareApplier) {
    return middlewareApplier(createStore)(reducer, initialState)
  }

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

function compose(...funcs) {
  if (funcs.length === 0) { return arg => arg }

  if (funcs.length === 1) { return funcs[0] }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function applyMiddlewares(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    const dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}

module.exports = {
  createStore,
  applyMiddlewares
}
