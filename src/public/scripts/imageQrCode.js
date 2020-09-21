setInterval(()=>{
    document.getElementById('qrCode').src = "/images/qrCode.png?random="+new Date().getTime();

},4000)

document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.querySelector('input[type="checkbox"]');
    
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
           jQuery('.modal').modal();
        } else {
      
          console.log('Not checked');
        }
      });
    });
    