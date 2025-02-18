var CRUD;
(function (CRUD) {
    ;
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
                const rows = tbody.selectAll("tr")
                    .data(data, (d) => d.id);
                const newRows = rows.enter().append("tr");
                newRows.append("td").text((d) => d.nombre);
                newRows.append("td").text((d) => d.email);
                newRows.append("td").text((d) => d.telefono);
                rows.exit().remove();
            })
                .catch(error => console.error("Error al obtener usuarios:", error));
        }
    }
    CRUD.Usuarios = Usuarios;
})(CRUD || (CRUD = {}));
//# sourceMappingURL=usuariosget.js.map