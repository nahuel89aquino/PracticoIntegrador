const socket = io();
let nameUser = document.getElementById("nameUser");
let user;
let chatBox = document.getElementById("chatBox");

Swal.fire({
    title:"Bienvenido al chat",
    input:"text",
    text:"Ingrese el usuario",
    inputValidator: (value)=>{
        return !value && "Se necesita un nombre de usuario"
    },
    allowOutsideClick:false
}).then(result=>{
    nameUser.innerText=`Bienvendio al chat ${result.value}!! `;
    user = result.value;
});

chatBox.addEventListener('keyup',e => {
    if (e.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', {user:user,message:chatBox.value});
            chatBox.value='';
        }
    }
})

/*SOCKET LISTENERS*/
socket.on('messageLogs',data=>{
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message => {
        messages = messages +`${message.user} dice: ${message.message}</br>` 
    });
    log.innerHTML = messages;
})

