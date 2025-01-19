export default {
  barElement: null,
  init(){
    const header = document.querySelector('header')
    if (!header) return console.error('Not found header in page markup')
    
    console.log(header.style.position)
    this.barElement = document.createElement('div')
    this.barElement.className = 'page_progress'
    header.append(this.barElement)
    this.calcBarWidth()
    this.addListeners()
  },
  calcBarWidth(){
    const htmlEl = document.documentElement
    const winScroll = document.body.scrollTop || htmlEl.scrollTop;
    const scrolled = 100 - winScroll / (htmlEl.scrollHeight - htmlEl.clientHeight) * 100;
    this.barElement.setAttribute('style', `--barWidth: ${scrolled}`)
  },
  addListeners(){
    window.addEventListener('scroll', ()=>{this.calcBarWidth()})
    window.addEventListener('resize', ()=>{this.calcBarWidth()})
  }
}