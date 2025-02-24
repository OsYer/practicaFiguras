var Tienda;
(function (Tienda) {
    class Productos {
        constructor() {
            this.productos = new Map();
        }
        agregarProducto(id, nombre, categoria, precio, stock) {
            if (!id || !nombre || !categoria || !precio || !stock) {
                alert(" Todos los campos son obligatorios.");
                return;
            }
            if (id <= 0 || precio <= 0 || stock < 0) {
                alert("ID, precio y stock deben ser valores positivos.");
                return;
            }
            if (this.productos.has(id)) {
                alert(` El producto con ID ${id} ya existe.`);
                return;
            }
            this.productos.set(id, { id, nombre, categoria, precio, stock });
            this.actualizarTabla();
        }
        eliminarProducto(id) {
            if (!this.productos.has(id)) {
                alert(` No existe un producto con ID ${id}.`);
                return;
            }
            this.productos.delete(id);
            this.actualizarTabla();
        }
        crearUI() {
            let ventana = d3.select("#ventana-productos");
            if (!ventana.empty()) {
                ventana.style("display", "block");
                return;
            }
            ventana = d3.select("body")
                .append("div")
                .attr("id", "ventana-productos")
                .attr("class", "ventana")
                .style("position", "absolute")
                .style("top", "100px")
                .style("left", "100px")
                .style("width", "500px")
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
                .on("click", () => ventana.style("display", "none"));
            ventana.append("h2")
                .text("Gestión de Productos")
                .style("text-align", "center")
                .style("margin-top", "10px")
                .style("color", "#333");
            const form = ventana.append("div")
                .style("padding", "20px");
            form.append("label")
                .text("ID: ");
            form.append("input")
                .attr("id", "id")
                .attr("type", "number")
                .style("width", "100%");
            form.append("label")
                .text("Nombre: ");
            form.append("input")
                .attr("id", "nombre")
                .attr("type", "text")
                .style("width", "100%");
            form.append("label")
                .text("Categoría: ");
            form.append("input")
                .attr("id", "categoria")
                .attr("type", "text")
                .style("width", "100%");
            form.append("label")
                .text("Precio: ");
            form.append("input")
                .attr("id", "precio")
                .attr("type", "number")
                .style("width", "100%");
            form.append("label")
                .text("Stock: ");
            form.append("input")
                .attr("id", "stock")
                .attr("type", "number")
                .style("width", "100%");
            form.append("button")
                .text("Agregar Producto")
                .style("margin-top", "10px")
                .style("padding", "8px")
                .style("cursor", "pointer")
                .style("width", "100%")
                .on("click", () => {
                const id = Number(document.getElementById("id").value);
                const nombre = document.getElementById("nombre").value;
                const categoria = document.getElementById("categoria").value;
                const precio = Number(document.getElementById("precio").value);
                const stock = Number(document.getElementById("stock").value);
                this.agregarProducto(id, nombre, categoria, precio, stock);
            });
            ventana.append("table")
                .attr("id", "tabla-productos")
                .style("width", "100%")
                .style("margin-top", "20px")
                .style("border", "1px solid black");
            this.actualizarTabla();
        }
        actualizarTabla() {
            const tabla = d3.select("#tabla-productos");
            if (tabla.select("thead").empty()) {
                tabla.append("thead").append("tr")
                    .selectAll("th")
                    .data(["ID", "Nombre", "Categoría", "Precio", "Stock", "Acciones"])
                    .enter()
                    .append("th")
                    .style("border-bottom", "2px solid #ddd")
                    .style("padding", "8px")
                    .text(data => data);
                tabla.append("tbody").attr("id", "tbody-productos");
            }
            const tbody = d3.select("#tbody-productos");
            tbody.html("");
            const rows = tbody.selectAll("tr")
                .data(Array.from(this.productos.values()), (d) => d.id);
            const newRows = rows.enter().append("tr");
            newRows.append("td").text(d => d.id);
            newRows.append("td").text(d => d.nombre);
            newRows.append("td").text(d => d.categoria);
            newRows.append("td").text(d => `$${d.precio}`);
            newRows.append("td").text(d => d.stock);
            newRows.append("td").append("button")
                .text("Eliminar")
                .on("click", (event, d) => this.eliminarProducto(d.id));
            rows.exit().remove();
        }
    }
    Tienda.Productos = Productos;
})(Tienda || (Tienda = {}));
//# sourceMappingURL=productos.js.map