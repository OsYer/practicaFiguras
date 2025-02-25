var app;
(function (app) {
    function mostrarVentana() {
        d3.selectAll(".ventana").style("display", "none");
    }
    function crearBoton(texto, handler) {
        d3.select("body")
            .append("button")
            .text(texto)
            .attr("class", "boton-estandar")
            .on("click", handler);
    }
    function ini() {
        let rectangulo = null;
        let cuadrado = null;
        let empleados = null;
        let usuariosUI = null;
        let gestor = null;
        // console.log("Aplicación iniciada...");
        d3.select("body")
            .append("h2")
            .text("Menú de Prácticas")
            .attr("class", "titulo-menu")
            .style("font-size", "clamp(20px, 4vw, 32px)")
            .style("color", "#ffffff")
            .style("margin-bottom", "20px");
        crearBoton("Mostrar Calculadora de Rectángulo", () => {
            if (!rectangulo) {
                rectangulo = new Figuras.Rectangulo();
                console.log("Rectangulo");
            }
            mostrarVentana();
            rectangulo.crearUI();
        });
        crearBoton("Mostrar Calculadora de Cuadrado", () => {
            if (!cuadrado) {
                cuadrado = new Figuras.Cuadrado();
                console.log("Cuadrado");
            }
            mostrarVentana();
            cuadrado.crearUI();
        });
        crearBoton("Ejemplo de Uso de en Array", () => {
            if (!empleados) {
                empleados = new Empleados.clsEmpleados();
                console.log("Empleados");
            }
            mostrarVentana();
            empleados.crearUI();
        });
        crearBoton("Uso de post y get con API usuarios", () => {
            if (!usuariosUI) {
                usuariosUI = new CRUD.Usuarios();
                console.log("Usuarios");
            }
            mostrarVentana();
            usuariosUI.mostrarVentana();
        });
        crearBoton("Gestión de productos con Map", () => {
            if (!gestor) {
                gestor = new Tienda.Productos();
                console.log("Productos");
            }
            mostrarVentana();
            gestor.crearUI();
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
    app.ini = ini;
})(app || (app = {}));
//# sourceMappingURL=app.js.map