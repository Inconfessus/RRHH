window.onload = init;

function init() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html"
    } else {
        document.querySelector('.btn-primary').addEventListener('click', actualizar);
    }
}



function actualizar() {
    var user_id = document.getElementById("input-id").value
    var name = document.getElementById('input-name').value;
    var last_name = document.getElementById('input-last_name').value;
    var phone = document.getElementById('input-phone').value;
    var email = document.getElementById('input-mail').value;
    var address = document.getElementById('input-address').value;


    axios({
        method: 'put',
        url: "http://localhost:3000/empleados/" + user_id,
        data: {
            name: name,
            last_name: last_name,
            phone: phone,
            email: email,
            address: address
        }
    }).then(function(res) {
        console.log(res);
        alert("Se actualizaron los datos de forma exitosa")
        window.location.href = "actualizar.html"
    }).catch(function(err) {
        console.log(err);
        alert("Ocurrio un error al actualizar los datos")
    })
}