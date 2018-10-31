document.addEventListener('DOMContentLoaded',()=>{
    let socket = io('/');

    socket.emit('register_user')

    var options = {
        enableHighAccuracy: true,
        maximumAge: 0
      };

      console.log('in dom content loaded')

      setInterval(()=>{
        navigator.geolocation.getCurrentPosition((pos)=>{
            const { latitude : lat , longitude :lng  }  = pos.coords ;
            console.log('lat->',lat);
            console.log('long->',lng);
            socket.emit('update_Location',{lat,lng});

        },(error)=>{
                console.log("error--->",error);
          },options)
      },2000)



})
