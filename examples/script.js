const prefix = 'app_'
window.Vue.use(window.Vue2Storage, {
  prefix,
  driver: 'local',
  ttl: 60 * 60 * 24 * 1000
})

new window.Vue({
  data () {
    return {
      data: [],
      form: {
        key: '',
        value: '',
        ttl: 60
      },
      has: false,
      key: '',
      keys: [],
      total: 0
    }
  },
  methods: {
    addItem () {
      const index = this.data.findIndex(el => el.key === this.form.key)
      if (index === -1) {
        this.data.push(this.form)
      } else {
        this.$set(this.data, index, {
          key: this.form.key,
          value: this.form.value,
          ttl: Number(this.form.ttl) * 1000
        })
      }
      this.$storage.set(
        this.form.key,
        this.form.value,
        {
          ttl: Number(this.form.ttl) * 1000
        }
      )
      this.form = {
        key: '',
        value: '',
        ttl: 60
      }
    },
    getFromStorage (key) {
      const value = this.$storage.get(key)
      const index = this.data.findIndex(el => el.key === key)
      console.log(index, value)
      if (value) {
        if (index > -1) {
          this.$set(this.data, index, { key, value })
        }
      } else {
        this.data.splice(index, 1)
      }
    },
    removeFromStorage (key) {
      this.$storage.remove(key)
      this.getFromStorage(key)
    },
    clearStorage () {
      this.$storage.clear()
      this.data = []
    },
    hasKey () {
      this.has = this.$storage.has(this.key)
    },
    getKeys () {
      this.keys = this.$storage.keys()
    },
    getLength () {
      this.total = this.$storage.length()
    }
  }
}).$mount('#app')
