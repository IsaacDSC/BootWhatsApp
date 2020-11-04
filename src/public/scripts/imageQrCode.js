document.addEventListener('DOMContentLoaded', function () {
  setInterval(() => {
    document.getElementById('qrCode').src = "/images/qrCode.png?random=" + new Date().getTime();
  }, 2000)
  let key = 0
  const checkbox = document.querySelector('input[type="checkbox"]');

  socket.on('qrcodeSuccess', async function () {
    await jQuery('#popup').modal('hide')
    $('.spinner-border').removeClass('d-none')
  })

  socket.on('bootIniciado', async function () {
    $('.spinner-border').addClass('d-none')
  })

  checkbox.addEventListener('change', async function () {
    if (checkbox.checked) {
      jQuery('#popup').modal();
      if (key == 0) {
        key = 1
        $.ajax({
          type: "POST",
          url: '/ligabot',
          success: console.log('Bot Iniciado com sucesso')
        }).then(() => {
          //  jQuery('#popup').modal('hide')
          key = 0
        })
      }
    } else {
      $.ajax({
        type: "POST",
        url: '/desligabot',
        success: console.log('Bot Desligado com sucesso')
      })

      console.log('Bot Desligado');
    }
  });
});
