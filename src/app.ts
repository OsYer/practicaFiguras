namespace app {

    export class MainApp {
        constructor() {
            this.Main()
        }

        private ocultarVentanas(): void {
            d3.selectAll(".ventana").style("display", "none");
        }

        private agregarBoton(texto: string, handler: () => void): void {
            d3.select("body")
                .append("button")
                .text(texto)
                .attr("class", "boton-estandar")
                .on("click", handler);
        }

        private Main(): void {
            let rectangulo: Figuras.Rectangulo | null = null;
            let cuadrado: Figuras.Cuadrado | null = null;
            let empleados: Empleados.C_Empleados | null = null;
            let usuariosCrud: CRUD.Usuarios | null = null;
            let gestorProductos: Tienda.Productos | null = null;
            let usuarios: Usuarios.UsuarioClase | null = null;

            d3.select("body")
                .append("h2")
                .text("Menú de Prácticas")
                .attr("class", "titulo-menu")
                .style("font-size", "clamp(20px, 4vw, 32px)")
                .style("color", "#ffffff")
                .style("margin-bottom", "20px");

            this.agregarBoton("Mostrar Calculadora de Rectángulo", () => {
                this.ocultarVentanas();
                if (!rectangulo) {
                    rectangulo = new Figuras.Rectangulo();
                    console.log("Rectangulo");
                } else {
                    rectangulo.ventana.style("display", "block");
                }
            });

            this.agregarBoton("Mostrar Calculadora de Cuadrado", () => {
                this.ocultarVentanas();
                if (!cuadrado) {
                    cuadrado = new Figuras.Cuadrado();
                    console.log("Cuadrado");
                } else {
                    cuadrado.ventana.style("display", "block");
                }
            });

            this.agregarBoton("Ejemplo de Uso de en Array", () => {
                this.ocultarVentanas();
                if (!empleados) {
                    empleados = new Empleados.C_Empleados();
                    console.log("Empleados");
                } else {
                    empleados.ventana.style("display", "block");
                }
            });

            this.agregarBoton("Uso de post y get con API usuarios", () => {
                this.ocultarVentanas();
                if (!usuariosCrud) {
                    usuariosCrud = new CRUD.Usuarios();
                    console.log("Usuarios");
                } else {
                    usuariosCrud.ventana.style("display", "block");
                }
            });

            this.agregarBoton("Gestión de productos con Map", () => {
                this.ocultarVentanas();
                if (!gestorProductos) {
                    gestorProductos = new Tienda.Productos();
                    console.log("Productos");
                }
                gestorProductos.crearUI();
            });
            this.agregarBoton("Usuarios", () => {
                this.ocultarVentanas();
            
                if (!usuarios) {
                    usuarios = new Usuarios.UsuarioClase();
                } else {
                    usuarios.ventana.style("display", "block");
                }
            });
            
            d3.select("body")
                .style("display", "flex")
                .style("flex-direction", "column")
                .style("align-items", "center")
                .style("justify-content", "center")
                .style("min-height", "100vh")
                .style("background", "linear-gradient(45deg, #0f1e45, #2a5298)")
                .style("font-family", "Arial, sans-serif");

            d3.selectAll(".boton-estandar")
                .style("width", "80%")
                .style("max-width", "400px")
                .style("padding", "12px 20px")
                .style("font-size", "clamp(14px, 2vw, 18px)")
                .style("margin", "10px")
                .style("border", "none")
                .style("border-radius", "8px")
                .style("background", "linear-gradient(90deg, #ff7e5f, #feb47b)")
                .style("color", "white")
                .style("box-shadow", "0px 4px 6px rgba(0,0,0,0.1)")
                .style("cursor", "pointer")
                .style("transition", "all 0.3s ease-in-out")
                .on("mouseover", function () {
                    d3.select(this)
                        .style("background", "linear-gradient(90deg, #feb47b, #ff7e5f)")
                        .style("transform", "scale(1.05)");
                })
                .on("mouseout", function () {
                    d3.select(this)
                        .style("background", "linear-gradient(90deg, #ff7e5f, #feb47b)")
                        .style("transform", "scale(1)");
                });
        }
    }
}

const appInstance = new app.MainApp();