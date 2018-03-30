# Начало использования

> Мы будем использовать [ES2015](https://github.com/lukehoban/es6features) в примерах кода в руководстве.


### HTML

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue2-storage/dist/vue2-storage.js"></script>

<div id="#app">
  <!-- TODO: here the outputs -->
</div>

<script>
  window.Vue.use(window.Vue2Storage, {
    storage: 'local',
    ttl: 60 * 60 * 24 * 1000
  })
</script>
```

### JavaScript

```javascript
// Если вы используете модульную систему (например via vue-cli), то импортируйте Vue и Vue2Storage и подключите плагин через` Vue.use(Vue2Storage)`
import Vue from 'vue'
import Vue2Storage from 'vue2-storage'

Vue.use(Vue2Storage, {
  storage: 'local',
  ttl: 60 * 60 * 24 * 1000
})

// TODO: here the example

// Now the app has started!
new Vue({ }).$mount('#app')
```

Output the following:

```html
<div id="#app">
  <!-- TODO: here the outputs -->
</div>
```
