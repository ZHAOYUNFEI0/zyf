// vue2
//  1、需要app组件 2、导入app组件 3、导入vue构造函数 4、new vue({render:h=>h(app)}).$mount('#app') 5、挂载到#APP容器中

// vue3
import App from './App.vue';

import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'element-plus/dist/index.css';
// vue应用实例
const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount('#app');
