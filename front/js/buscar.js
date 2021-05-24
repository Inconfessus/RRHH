window.onload = init;

function init() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html"
    } else {
        document.querySelector('.btn-primary').addEventListener('click', buscar);
    }
}



function buscar() {
    var name = document.getElementById('input-name').value;
    var last_name = document.getElementById('input-last_name').value;
    var full_name = name + last_name

    axios({
        method: 'get',
        url: "http://localhost:3000/empleados/" + full_name,
        data: {
            name: name,
            last_name: last_name
        }
    }).then(function(res) {
        console.log(res.data.message);
        displayEmpleados(res.data.message)
    }).catch(function(err) {
        alert("No se pudieron obtener los datos del empleado")
        console.log(full_name)
    })
}

function displayEmpleados(empleados) {

    for (var i = 0; i < empleados.length; i++) {
        subtitulo.innerHTML = `<h3>Datos del usuario:</h3>`;
        datos.innerHTML = `<h3>Número de identificación: ${empleados[i].user_id}</h3><br>
                              <h3>Nombre: ${empleados[i].name} ${empleados[i].last_name}</h3><br>
                              <h3>Teléfono: ${empleados[i].phone}</h3><br>
                              <h3>Correo: ${empleados[i].email}</h3><br>
                              <h3>Dirección: ${empleados[i].address}</h3><br>`;
    }
}