import loader from "./loader.js";
import theme from "./theme.js";
// можна імпортувати тільки те, що потрібно
import { helperFunction1, getEl, getCookie, setCookie } from "./helpers.js";

// якщо потрібно все - то можна імпортувати в одну локальну змінну
import * as CONFIG from "./config.js"

(()=>{
  helperFunction1()
  // helperFunction2()
  console.log(CONFIG.API_KEY);


  // слухаємо зміну теми
  theme.listen()
  // перевіряємо чи записаний користувацький вибір теми
  const userColorScheme = getCookie('colorScheme')
  if (userColorScheme) {
    // якщо так - це пріоритет, встановлюємо цю тему
    theme.switch(userColorScheme)
  } else {
    // інакше перевіряємо чи увімкнена у користувача темна тема в браузері (не працює для Chrome)?
    if (theme.isDarkMode()) theme.switch('dark')
  }
  document.documentElement.classList.contains('dark') && (window.colorSchemeSwitcher.checked = true)

  loadPage2('/pages/main.html')
})()

// чекаємо поки завантажаться усі необхідні ресурси і тільки потім ховаємо лоадер
// window.addEventListener("load", (event) => {
//     loader.hide(1000)
// });

// альтернативний варіант, більш скорочений, але не дає можливості додати ще один обробник на цю саму подію
// таймаут доданий для емуляції часу відповіді від сервера
// window.onload = event => loader.hide(1000)

document.addEventListener('click', (e) => {
  console.log('Click event', e)

  if (e.target.id === 'colorSchemeSwitcher') {
    const colorScheme = e.target.checked ? 'dark' : 'light'
    theme.switch(colorScheme)
    setCookie('colorScheme', colorScheme, 365)
  }

  if (e.target.classList.contains("nav-link")) {
    e.preventDefault()
    loadPage(e.target.getAttribute("href"))
  }
})

// асинхронна функція для завантаження змісту сторінки за шляхом
async function loadPage(path) {
  loader.show()
  const response = await fetch(path)
  const html = await response.text()

  window.main_content.innerHTML = html
  window.main_content.querySelectorAll('script').forEach(scriptEl => {
    if ( scriptEl.innerHTML ) eval(scriptEl.innerHTML)
    if ( scriptEl.getAttribute("src")) {
      const script = document.createElement('script')
      script.setAttribute("src", scriptEl.getAttribute("src"))
      window.main_content.after(script)
    }
  })

  // const main_content = document.getElementById("main_content")
  // main_content.innerHTML = html
  // main_content.querySelectorAll('script').forEach(scriptEl => {
  //   if ( scriptEl.innerHTML ) eval(scriptEl.innerHTML)
  //   if ( scriptEl.getAttribute("src")) {
  //     const script = document.createElement('script')
  //     script.setAttribute("src", scriptEl.getAttribute("src"))
  //     main_content.after(script)
  //   }
  // })

  // $("#main_content").html(html);
  loader.hide(200)
}

// те саме що й loadPage, тільки функція не асинхронна і fetch використовує ланцюг методів then()
function loadPage2(path) {
  loader.show()
  fetch(path)
    .then(resp => resp.text())
    .then(html => {
      window.main_content.innerHTML = html
      loader.hide(200)    
    })
}