window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer" + localStorage.getItem("token")
            }   
        }
        loadUsers();
    }
    else {
        window.alert("No tienes permiso.");
        window.location.href = "login.html"
    }
}

function loadUsers() {
    axios.get(url + "/users", headers)
    .then(function(res) {
        console.log(res);
        displayUser(res.data.message);
    })
    .catch(function(error) {
        console.log(error);
    })
}

function displayUser(user) {
    var body = document.querySelector("body");

    for(var i = 0; i < user.length; i++) {
        body.innerHTML += `<h3>${user[i].user_fname}</h3>`
    }
}