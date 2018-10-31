let markers = new Map();
document.addEventListener('DOMContentLoaded',()=>{
    var socket = io('/');
      
    var map ;  
   
    socket.on('locationsUpdate',(locationsMap)=>{
        console.log("type of ==>",typeof locationsMap , locationsMap);

        locationsMap.forEach((userObj)=>{
            console.log('id is this-->',userObj.user_id);
            
            let position = {};
            position.lat = userObj.location.lat ; 
            position.lng = userObj.location.lng ;
            if(position.lat && position.lng){
                var marker = new google.maps.Marker({
                    position: position,
                    map:map,
                    title: userObj.user_id
                  });
            }
            
              if(markers.has(userObj.user_id)){
                  let oldMarker = markers.get(userObj.user_id);
                  oldMarker.setMap(null);
                  markers.delete(userObj.user_id);
                  markers.set(userObj.user_id,marker);
              }
             

        })

    })

    setInterval(()=>{
        socket.emit('requestLocation');
    },10000)
    
})
function initMap() {
    var options = {
        enableHighAccuracy: true,
        maximumAge: 0
      }
    navigator.geolocation.getCurrentPosition((pos)=>{
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
        zoom: 8
      });

    },(error)=>{
            console.log("error--->",error);
      },options)

  }