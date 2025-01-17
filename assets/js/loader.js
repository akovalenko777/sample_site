// так як цей файл містить тільки одну сутність - експортуємо її за замовчуванням без назви
export default {
  // замість document.getElementById("loader")
  element: window.loader,
  show() {
    this.element.classList.add('show')
  },
  hide(timeout = 0) {
    setTimeout(()=>{
      this.element.classList.remove('show')
    }, timeout)
  }
}