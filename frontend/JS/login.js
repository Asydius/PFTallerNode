window.onload = init;

function init() {
    if(!localStorage.getItem("token")) {
        document.querySelector('.btn-primary').addEventListener('click', login);
    }
    else {
        window.location.href = "index.html"
    }
    
}

function login() {
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'https://pftallernode.herokuapp.com/login',
        data: {
            user_mail: mail,
            user_password: pass
        }
    }).then(function(res) {
        if(res.data.code === 200) {
            localStorage.setItem("token", res.data.message);
            window.location.href = "users.html"
        }
        else{
            alert("Usuario y/o contraseña incorrectos.");
        }
    }).catch(function(error) {
        console.log(error);
    })
}