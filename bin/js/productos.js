var Tienda;
(function (Tienda) {
    class Productos {
        constructor() {
            this.productos = new Map();
        }
        agregarProducto(id, nombre, categoria, precio, stock) {
            if (!id || !nombre || !categoria || !precio || !stock) {
                alert("Todos los campos son obligatorios.");
                return;
            }
            if (id <= 0 || precio <= 0 || stock < 0) {
                alert("ID, precio y stock deben ser valores positivos.");
                return;
            }
            if (this.productos.has(id)) {
                alert(`El producto con ID ${id} ya existe.`);
                return;
            }
            this.productos.set(id, { id, nombre, categoria, precio, stock });
            this.actualizarTabla();
        }
        eliminarProducto(id) {
            if (!this.productos.has(id)) {
                alert(`No existe un producto con ID ${id}.`);
                return;
            }
            this.productos.delete(id);
            this.actualizarTabla();
        }
        buscarPorCategoria(categoria) {
            this.actualizarTabla(categoria);
        }
        actualizarTabla(categoriaFiltro = "") {
            const tabla = d3.select("#tabla-productos");
            tabla.html("");
            const thead = tabla.append("thead").append("tr");
            ["ID", "Nombre", "Categoría", "Precio", "Stock", "Acciones"]
                .forEach(text => {
                thead.append("th")
                    .text(text);
            });
            const tbody = tabla.append("tbody");
            this.productos.forEach(producto => {
                if (categoriaFiltro && !producto.categoria.toLowerCase().includes(categoriaFiltro.toLowerCase()))
                    return;
                const row = tbody.append("tr");
                row.append("td").text(producto.id);
                row.append("td").text(producto.nombre);
                row.append("td").text(producto.categoria);
                row.append("td").text(`$${producto.precio}`);
                row.append("td").text(producto.stock);
                row.append("td")
                    .append("button")
                    .text("Eliminar")
                    .attr("class", "btn-eliminar")
                    .on("click", () => this.eliminarProducto(producto.id));
            });
            // Estilos para botones eliminar
            d3.selectAll(".btn-eliminar")
                .style("background", "red")
                .style("color", "white")
                .style("border", "none")
                .style("padding", "5px 10px")
                .style("border-radius", "5px")
                .style("cursor", "pointer");
        }
    }
    Tienda.Productos = Productos;
})(Tienda || (Tienda = {}));
//# sourceMappingURL=productos.js.map