export default {
    isDarkMode(){
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches   
    },
    listen(){
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            const newColorScheme = event.matches ? "dark" : "light";
            this.switch(newColorScheme)
        })
    },
    switch(newColorScheme){
        newColorScheme === 'dark'
            ? document.documentElement.classList.add("dark")
            : document.documentElement.classList.remove("dark")
    }
}