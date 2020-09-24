setInterval(()=>{
    document.getElementById('qrCode').src = "/images/qrCode.png?random="+new Date().getTime();

},4000)

document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.querySelector('input[type="checkbox"]');
    
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          jQuery('.modal').modal();
          $.ajax({
            type: "POST",
            url: 'http://localhost:3001/ligabot',
            success: console.log('Bot Iniciado com sucesso')
          }).then(()=> jQuery('.modal').modal('hide'))
        } else {
          $.ajax({
            type: "POST",
            url: 'http://localhost:3001/desligabot',
            success: console.log('Bot Desligado com sucesso')
          })
      
          console.log('Bot Desligado');
        }
      });
});
    