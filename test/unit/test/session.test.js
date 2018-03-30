import Vue from 'vue'
import VueStorage from '../../../src'

Vue.use(VueStorage, {
  storage: 'session'
})

describe('Session Storage', () => {
  let vm

  beforeEach(() => {
    vm = new Vue()
  })

  describe('Set item', () => {
    it('Set Object', (done) => {
      const data = { a: 1 }
      vm.$storage.set('test', data)
      const item = vm.$storage.get('test')
      assert(item.a && item.a === 1, 'Item is not Object')
      done()
    })
    it('Set Array', (done) => {
      const data = [1, 2]
      vm.$storage.set('test', data)
      const item = vm.$storage.get('test')
      assert(Array.isArray(item) && item.length === 2, 'Item is not Array')
      done()
    })
    it('Set String', (done) => {
      const data = 'test'
      vm.$storage.set('test', data)
      const item = vm.$storage.get('test')
      assert(typeof item === 'string', 'Item is not String')
      done()
    })
    it('Set Number', (done) => {
      const data = 1
      vm.$storage.set('test', data)
      const item = vm.$storage.get('test')
      assert(typeof item === 'number', 'Item is not Number')
      done()
    })
    it('Set Boolean [true]', (done) => {
      const data = true
      vm.$storage.set('test', data)
      const item = vm.$storage.get('test')
      assert(item === true, 'Item is not Boolean [true]')
      done()
    })
    it('Set Boolean [false]', (done) => {
      const data = false
      vm.$storage.set('test', data)
      const item = vm.$storage.get('test')
      assert(item === false, 'Item is not Boolean [false]')
      done()
    })
  })

  describe('Set item with TTL 5 seconds', () => {
    it('Set item', (done) => {
      const data = { a: 1 }
      vm.$storage.set('test', data, { ttl: 5 })
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          const item = vm.$storage.get('test')
          assert(item === null, 'TTL not work')
          resolve()
        }, 8000)
      })
      promise.then(done)
    }).timeout(10000)
  })

  describe('Remove item by key', () => {
    it('Remove item', (done) => {
      const data = 'test'
      vm.$storage.set('test', data)
      vm.$storage.remove('test')
      const item = vm.$storage.get('test')
      assert(item === null, 'Item is not removed')
      done()
    })
  })

  describe('Clear storage', () => {
    it('Clear storage', (done) => {
      vm.$storage.set('test', 'test')
      vm.$storage.set('test1', [1, 2])
      vm.$storage.set('test2', 2)
      vm.$storage.clear()
      assert(vm.$storage.get('test') === null, 'The store is not cleaned')
      assert(vm.$storage.get('test1') === null, 'The store is not cleaned')
      assert(vm.$storage.get('test2') === null, 'The store is not cleaned')
      done()
    })
  })
})

