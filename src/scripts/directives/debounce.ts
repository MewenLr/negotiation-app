/* eslint-disable @typescript-eslint/no-explicit-any */
import { DirectiveOptions } from 'vue'

/* eslint-disable func-names */
function debounceFunc(fn: any, delay: number) {
  let timeout: any

  const debounced = function (this: any, ...args: any) {
    const later = () => {
      timeout = undefined
      fn.apply(this, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, delay)

    if (!timeout) return fn.apply(this, args)
    return false
  }

  return debounced
}

const directive: DirectiveOptions = {
  bind(el: any, binding: any) {
    const { callback, debounce } = binding.value

    if (!debounce) return false

    const modifier = Object.keys(binding.modifiers)[0]
    el.eventType = ['input', 'keyup'].includes(modifier) ? modifier : 'input'

    if (typeof callback !== 'function') {
      console.error(`[v-debounce] provided expression '${callback}' is not a function`)
      return false
    }

    const delay = parseInt(binding.arg, 10) || 300
    el.eventFn = debounceFunc((e: Error) => callback(e), delay)

    return el.addEventListener(el.eventType, el.eventFn)
  },
  unbind: (el: any) => el.removeEventListener(el.eventType, el.eventFn),
}

export default directive
