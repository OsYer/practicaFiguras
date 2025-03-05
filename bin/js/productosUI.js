var Tienda;
(function (Tienda) {
    class ProductosUI {
        constructor(productos) {
            this.productos = productos;
            this.crearUI();
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
                .attr("class", "ventana");
            ventana.append("button")
                .text("✖")
                .attr("id", "cerrar-ventana")
                .on("click", () => ventana.style("display", "none"));
            const form = ventana.append("div");
            this.inputId = form.append("input").attr("id", "id").attr("type", "number");
            this.inputNombre = form.append("input").attr("id", "nombre").attr("type", "text");
            this.inputCategoria = form.append("input").attr("id", "categoria").attr("type", "text");
            this.inputPrecio = form.append("input").attr("id", "precio").attr("type", "number");
            this.inputStock = form.append("input").attr("id", "stock").attr("type", "number");
            form.append("button")
                .text("Agregar Producto")
                .attr("id", "btn-agregar")
                .on("click", () => {
                this.productos.agregarProducto(Number(this.inputId.property("value")), this.inputNombre.property("value"), this.inputCategoria.property("value"), Number(this.inputPrecio.property("value")), Number(this.inputStock.property("value")));
            });
            this.buscarCategoria = form.append("input")
                .attr("id", "buscar-categoria")
                .attr("type", "text")
                .attr("placeholder", "Buscar por categoría...");
            this.buscarCategoria.on("input", () => {
                this.productos.buscarPorCategoria(this.buscarCategoria.property("value"));
            });
            ventana.append("table").attr("id", "tabla-productos");
            this.productos.actualizarTabla();
            // Aplicando estilos con selectAll
            d3.selectAll("#ventana-productos")
                .style("position", "fixed")
                .style("top", "50%")
                .style("left", "50%")
                .style("transform", "translate(-50%, -50%)")
                .style("width", "90%")
                .style("max-width", "600px")
                .style("max-height", "90vh")
                .style("overflow", "auto")
                .style("background", "#fff")
                .style("border", "1px solid #ccc")
                .style("border-radius", "12px")
                .style("box-shadow", "0px 8px 16px rgba(0,0,0,0.3)")
                .style("padding", "20px")
                .style("z-index", "1000");
            d3.selectAll("input")
                .style("width", "100%")
                .style("padding", "8px")
                .style("border", "1px solid #ccc")
                .style("border-radius", "6px")
                .style("font-size", "16px")
                .style("margin-bottom", "10px");
            d3.selectAll("#btn-agregar")
                .style("background", "linear-gradient(90deg, #ff7e5f, #feb47b)")
                .style("color", "white")
                .style("border", "none")
                .style("border-radius", "6px")
                .style("padding", "10px")
                .style("width", "100%");
        }
    }
    Tienda.ProductosUI = ProductosUI;
})(Tienda || (Tienda = {}));
//# sourceMappingURL=productosUI.js.map