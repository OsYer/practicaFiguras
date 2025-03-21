namespace Tienda {
    export interface Producto {
        id: number;
        nombre: string;
        categoria: string;
        precio: number;
        stock: number;
    }

    export class Productos {
        private productos: Map<number, Producto>;

        constructor() {
            this.productos = new Map();
        }

        public agregarProducto(id: number, nombre: string, categoria: string, precio: number, stock: number): void {
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

        public eliminarProducto(id: number): void {
            if (!this.productos.has(id)) {
                alert(`No existe un producto con ID ${id}.`);
                return;
            }
            this.productos.delete(id);
            this.actualizarTabla();
        }

        public buscarPorCategoria(categoria: string): void {
            this.actualizarTabla(categoria);
        }

        public crearUI(): void {
            let ventana = d3.select("#ventana-productos");

            if (!ventana.empty()) {
                ventana.style("display", "block");
                return;
            }

            ventana = d3.select("body")
                .append("div")
                .attr("id", "ventana-productos")
                .attr("class", "ventana")
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

            ventana.append("button")
                .text("✖")
                .attr("class", "cerrar-ventana")
                .style("position", "absolute")
                .style("top", "10px")
                .style("right", "10px")
                .style("border", "none")
                .style("background", "transparent")
                .style("font-size", "20px")
                .style("color", "#333")
                .style("cursor", "pointer")
                .on("mouseover", function () { d3.select(this).style("color", "red"); })
                .on("mouseout", function () { d3.select(this).style("color", "#333"); })
                .on("click", () => ventana.style("display", "none"));

            ventana.append("h2")
                .text("Gestión de Productos")
                .style("text-align", "center")
                .style("margin-bottom", "20px")
                .style("color", "#333");

            const form = ventana.append("div")
                .style("padding", "20px");

            const agregarCampo = (label: string, id: string, type: string) => {
                form.append("label")
                    .text(label)
                    .style("font-weight", "bold")
                    .style("display", "block")
                    .style("margin-top", "10px");

                form.append("input")
                    .attr("id", id)
                    .attr("type", type)
                    .style("width", "100%")
                    .style("padding", "8px")
                    .style("border", "1px solid #ccc")
                    .style("border-radius", "6px")
                    .style("font-size", "16px");
            };

            agregarCampo("ID:", "id", "number");
            agregarCampo("Nombre:", "nombre", "text");
            agregarCampo("Categoría:", "categoria", "text");
            agregarCampo("Precio:", "precio", "number");
            agregarCampo("Stock:", "stock", "number");

            form.append("button")
                .text("Agregar Producto")
                .style("margin-top", "15px")
                .style("padding", "10px")
                .style("border", "none")
                .style("border-radius", "6px")
                .style("background", "linear-gradient(90deg, #ff7e5f, #feb47b)")
                .style("color", "white")
                .style("font-size", "16px")
                .style("cursor", "pointer")
                .style("width", "100%")
                .on("click", () => {
                    const id = Number((document.getElementById("id") as HTMLInputElement).value);
                    const nombre = (document.getElementById("nombre") as HTMLInputElement).value;
                    const categoria = (document.getElementById("categoria") as HTMLInputElement).value;
                    const precio = Number((document.getElementById("precio") as HTMLInputElement).value);
                    const stock = Number((document.getElementById("stock") as HTMLInputElement).value);
                    this.agregarProducto(id, nombre, categoria, precio, stock);
                });

            const buscarWrapper = form.append("div")
                .attr("class", "search-container")
                .style("position", "relative")
                .style("width", "100%")
                .style("max-width", "300px")
                .style("margin", "0 auto 15px")
                .style("margin-top", "15px");

            buscarWrapper.append("input")
                .attr("id", "buscar-categoria")
                .attr("type", "text")
                .attr("placeholder", "Buscar por categoría...")
                .style("width", "100%")
                .style("padding", "8px 35px 8px 10px")
                .style("border", "1px solid #ccc")
                .style("border-radius", "6px")
                .style("font-size", "16px");

            const svg = buscarWrapper.append("svg")
                .attr("class", "search-icon")
                .attr("viewBox", "0 0 24 24")
                .attr("width", "20px")
                .attr("height", "20px")
                .style("position", "absolute")
                .style("right", "10px")
                .style("top", "50%")
                .style("transform", "translateY(-50%)")
                .style("cursor", "pointer");

                svg.append("circle")
                .attr("cx", 11)
                .attr("cy", 11)
                .attr("r", 8)
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("fill", "none");

            svg.append("line")
                .attr("x1", 16)
                .attr("y1", 16)
                .attr("x2", 22)
                .attr("y2", 22)
                .attr("stroke", "black")
                .attr("stroke-width", 2);
            svg.on("click", () => {
                const categoria = (document.getElementById("buscar-categoria") as HTMLInputElement).value;
                this.buscarPorCategoria(categoria);
            });
            d3.select("#buscar-categoria")
                .on("input", () => {
                    const categoria = (document.getElementById("buscar-categoria") as HTMLInputElement).value;
                    this.buscarPorCategoria(categoria); 
                });


            const tablaWrapper = ventana.append("div")
                .style("max-height", "300px")
                .style("overflow-y", "auto")
                .style("width", "100%")
                .style("margin-top", "20px")
                .style("border", "1px solid #ccc")
                .style("border-radius", "6px")
                .style("background", "#fff");

            tablaWrapper.append("table")
                .attr("id", "tabla-productos")
                .attr("class", "tabla")
                .style("width", "100%")
                .style("border-collapse", "collapse");

            this.actualizarTabla();
        }

        private actualizarTabla(categoriaFiltro: string = ""): void {
            const tabla = d3.select("#tabla-productos");
            tabla.html("");

            const thead = tabla.append("thead").append("tr");
            ["ID", "Nombre", "Categoría", "Precio", "Stock", "Acciones"]
                .forEach(text => {
                    thead.append("th")
                        .text(text)
                        .style("padding", "10px")
                        .style("background", "#ff7e5f")
                        .style("color", "white");
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
                    .on("click", () => this.eliminarProducto(producto.id));
            });
        }

    }
}
