/* eslint-disable @typescript-eslint/no-explicit-any */
import { DirectiveOptions } from 'vue'

const directive: DirectiveOptions = {
  bind: (el: Element, binding) => {
    const image: any = Array.from(el.children).find(
      (element) => /image$/.test(element.classList.value),
    )

    if (!image) {
      console.error('[v-lazy-load] provided component doesn\'t contain element with class \'image\'')
      return false
    }

    if (typeof binding.value !== 'boolean') {
      console.error(`[v-lazy-load] provided expression '${binding.expression}' is not a boolean`)
      return false
    }

    if (Object.keys(binding.modifiers).length) console.warn('[v-lazy-load] doesn\'t accept modifiers')

    function loadImage() {
      if (image) {
        image.addEventListener('load', () => el.classList.add('piction--loaded'))
        image.addEventListener('error', () => console.error('[v-lazy-load] error eventlistener'))
        image.src = image.dataset.url
      }
    }

    function handleIntersect(entries: any[], observer: any) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage()
          observer.unobserve(el)
        }
      })
    }

    function createObserver() {
      const options = { root: null, threshold: 0 }
      const observer = new IntersectionObserver(handleIntersect, options)
      observer.observe(el)
    }

    if (window.IntersectionObserver && binding.value) return createObserver()
    return /* ie11 || !lazy */ loadImage()
  },
  unbind: (el: Element) => {
    const image = Array.from(el.children).find(
      (element) => /image$/.test(element.classList.value),
    )
    if (image) {
      image.removeEventListener('load', () => el.classList.add('piction--loaded'))
      image.removeEventListener('error', () => console.error('[v-lazy-load] error eventlistener'))
    }
  },
}

export default directive
