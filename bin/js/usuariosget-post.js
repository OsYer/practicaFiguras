var CRUD;
(function (CRUD) {
    class Usuarios {
        constructor() {
            this.apiUrl = "http://localhost:3000/usuarios";
        }
        mostrarVentana() {
            d3.select("#ventana-usuarios").remove();
            const ventana = d3.select("body")
                .append("div")
                .attr("id", "ventana-usuarios")
                .style("position", "absolute")
                .style("top", "100px")
                .style("left", "100px")
                .style("width", "450px")
                .style("background", "#fff")
                .style("border", "1px solid #ccc")
                .style("border-radius", "8px")
                .style("box-shadow", "4px 4px 10px rgba(0,0,0,0.2)")
                .style("padding", "20px")
                .style("z-index", "1000");
            ventana.append("button")
                .text("X")
                .style("position", "absolute")
                .style("top", "5px")
                .style("right", "5px")
                .style("border", "none")
                .style("background", "transparent")
                .style("font-size", "18px")
                .style("cursor", "pointer")
                .on("click", () => d3.select("#ventana-usuarios").remove());
            ventana.append("h2")
                .text("Lista de Usuarios")
                .style("text-align", "center")
                .style("margin-top", "10px")
                .style("color", "#333");
            // 🔹 Formulario para agregar usuarios
            const formulario = ventana.append("div")
                .style("margin-bottom", "20px");
            formulario.append("label").text("Nombre:");
            const inputNombre = formulario.append("input")
                .attr("type", "text")
                .attr("id", "nombre")
                .style("margin", "5px");
            formulario.append("label").text("Email:");
            const inputEmail = formulario.append("input")
                .attr("type", "email")
                .attr("id", "email")
                .style("margin", "5px");
            formulario.append("label").text("Teléfono:");
            const inputTelefono = formulario.append("input")
                .attr("type", "text")
                .attr("id", "telefono")
                .style("margin", "5px");
            formulario.append("button")
                .text("Agregar Usuario")
                .style("cursor", "pointer")
                .style("background", "green")
                .style("color", "white")
                .style("padding", "8px")
                .style("border", "none")
                .style("border-radius", "4px")
                .on("click", () => {
                this.agregarUsuario(inputNombre.property("value"), inputEmail.property("value"), inputTelefono.property("value"));
            });
            const tabla = ventana.append("table")
                .style("width", "100%")
                .style("border-collapse", "collapse")
                .style("margin-top", "10px");
            const thead = tabla.append("thead");
            thead.append("tr")
                .selectAll("th")
                .data(["Nombre", "Email", "Teléfono"])
                .enter()
                .append("th")
                .style("border-bottom", "2px solid #ddd")
                .style("padding", "8px")
                .text(d => d);
            tabla.append("tbody").attr("id", "tabla-usuarios");
            this.cargarUsuarios();
        }
        cargarUsuarios() {
            fetch(this.apiUrl)
                .then(response => response.json())
                .then((data) => {
                console.log("Usuarios obtenidos:", data);
                const tbody = d3.select("#tabla-usuarios");
                tbody.html(""); // Limpiar antes de agregar datos nuevos
                const rows = tbody.selectAll("tr")
                    .data(data, (d) => d.id)
                    .enter()
                    .append("tr");
                rows.append("td").text((d) => d.nombre);
                rows.append("td").text((d) => d.email);
                rows.append("td").text((d) => d.telefono);
            })
                .catch(error => console.error("Error al obtener usuarios:", error));
        }
        agregarUsuario(nombre, email, telefono) {
            // Validar que los campos no estén vacíos
            if (!nombre || !email || !telefono) {
                alert("Todos los campos son obligatorios.");
                return;
            }
            const nuevoUsuario = { nombre, email, telefono };
            fetch(this.apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoUsuario)
            })
                .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al agregar usuario: ${response.statusText}`);
                }
                return response.text();
            })
                .then(mensaje => {
                console.log(mensaje); // "Usuario agregado exitosamente"
                alert("Usuario agregado correctamente.");
                this.cargarUsuarios(); // Recargar la lista después de agregar
            })
                .catch(error => console.error("Error:", error));
        }
    }
    CRUD.Usuarios = Usuarios;
})(CRUD || (CRUD = {}));
function iniciarApp() {
    let usuariosUI = null;
    if (!usuariosUI) {
        usuariosUI = new CRUD.Usuarios();
        console.log("Iniciando CRUD de usuarios...");
    }
    usuariosUI.mostrarVentana();
}
//# sourceMappingURL=usuariosget-post.js.map