export default {
    isDarkMode(){
        // намагаємося отримати з браузера чи використовується темна тема
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches   
    },
    listen(){
        // прослуховування події зміни теми в налаштуваннях браузера
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            const newColorScheme = event.matches ? "dark" : "light";
            this.switch(newColorScheme)
        })
    },
    switch(newColorScheme){
        // встановлення обраної користувацької теми
        newColorScheme === 'dark'
            ? document.documentElement.classList.add("dark")
            : document.documentElement.classList.remove("dark")
    }
}