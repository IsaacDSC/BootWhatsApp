setInterval(()=>{
    document.getElementById('qrCode').src = "/images/qrCode.png?random="+new Date().getTime();

},4000)

