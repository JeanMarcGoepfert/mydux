const sinonChai = require('sinon-chai')
const sinon = require('sinon')
const chai = require('chai')
const { createStore } = require('./myDux.js')

chai.use(sinonChai);
const { expect } = chai

describe('createStore', () => {
  it('should return an object with correct methods', () => {
    const store = createStore()

    expect(store.getState).to.be.a('function')
    expect(store.dispatch).to.be.a('function')
  })

  describe('#getState', () => {
    it('should return state', () => {
      const reducer = () => ({})
      const state = { foo: '1'}
      const store = createStore(reducer, state)

      expect(store.getState()).to.deep.equal(state)
    })
  })

  describe('#dispatch', () => {
    it('should set state to result of passing action through reducer', () => {
      const reducer = (state, action) => ({ value: action.value })
      const store = createStore(reducer)
      const action = store.dispatch({ type: 'EVENT', value: 'new value' })

      expect(store.getState()).to.deep.equal({ value: 'new value'})
    })
  })

  describe('#subscribe', () => {
    it('should subscribe to dispatch events', () => {
      const reducer = (state, action) => ({ value: action.value })
      const store = createStore(reducer)
      const subscription = sinon.spy()

      store.subscribe(subscription)
      store.dispatch({ type: 'EVENT' })

      expect(subscription).to.have.been.called
    })
  })
})
