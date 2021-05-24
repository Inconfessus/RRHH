window.onload = init;


function init() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html"
    } else {
        document.querySelector('.btn-primary').addEventListener('click', eliminar);
    }
}



function eliminar() {
    var user_id = document.getElementById("input-id").value


    axios({
        method: 'delete',
        url: "http://localhost:3000/empleados/" + user_id,
    }).then(function(res) {
        console.log(res);
        alert("El empleado se elimino de la base de datos")
        window.location.href = "eliminar.html"
    }).catch(function(err) {
        console.log(err);
        alert("Ocurrio un error al eliminar al empleado")
    })
}