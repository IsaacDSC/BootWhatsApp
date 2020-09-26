 let configClass = document.querySelector('#confiClass')
 let layoutConfigClass = document.querySelector('#configClass')
 let config = document.querySelector('#config')

 function abrirConfigClass() {
     layoutConfigClass.style.top = '0px'
     config.style.top = '0px'
 }

 function fecharConfigClass() {
     layoutConfigClass.style.top = '-1000px'
     config.style.top = '-150px'
 }

 configClass.addEventListener('change', e => {
     if (configClass.checked) {
         abrirConfigClass()

     } else {
         fecharConfigClass()
     }

 })