/**
 * 王栋
 * 优诺
 * 功能点：vue中防止用户在短时间内频繁多次点击按钮的解决办法
 */
import Vue from 'vue'
const preventReClick = Vue.directive('preventReClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 1000)
      }
    })
  }
})
export {
  preventReClick
}
