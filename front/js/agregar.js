window.onload = init;

function init() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html"
    } else {
        document.querySelector('.btn-primary').addEventListener('click', agregar);
    }
}



function agregar() {
    var name = document.getElementById('input-name').value;
    var last_name = document.getElementById('input-last_name').value;
    var phone = document.getElementById('input-phone').value;
    var email = document.getElementById('input-mail').value;
    var address = document.getElementById('input-address').value;


    axios({
        method: 'post',
        url: "http://localhost:3000/empleados",
        data: {
            name: name,
            last_name: last_name,
            phone: phone,
            email: email,
            address: address
        }
    }).then(function(res) {
        console.log(res);
        alert("Registro exitoso")
        window.location.href = "agregar.html"
    }).catch(function(err) {
        console.log(err);
    })
}