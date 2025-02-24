namespace app {
    function mostrarVentana(): void {
        d3.selectAll(".ventana").style("display", "none");
    }

    export function ini(): void {
        let rectangulo: Figuras.Rectangulo | null = null;
        let cuadrado: Figuras.Cuadrado | null = null;
        let empleados: Empleados.clsEmpleados | null = null;
        let usuariosUI: CRUD.Usuarios | null = null;
        let gestor: Tienda.Productos | null = null;

        console.log("Aplicación iniciada...");

        d3.select("body")
            .append("button")
            .text("Mostrar Calculadora de Rectángulo")
            .style("padding", "10px")
            .style("font-size", "16px")
            .style("margin", "20px auto")
            .style("display", "block")
            .style("cursor", "pointer")
            .on("click", () => {
                if (!rectangulo) {
                    rectangulo = new Figuras.Rectangulo();
                    console.log("Rectangulo");
                }
                mostrarVentana();
                rectangulo.crearUI();
            });

        d3.select("body")
            .append("button")
            .text("Mostrar Calculadora de Cuadrado")
            .style("padding", "10px")
            .style("font-size", "16px")
            .style("margin", "20px auto")
            .style("display", "block")
            .style("cursor", "pointer")
            .on("click", () => {
                if (!cuadrado) {
                    cuadrado = new Figuras.Cuadrado();
                    console.log("Cuadrado");
                }
                mostrarVentana();
                cuadrado.crearUI();
            });

        d3.select("body")
            .append("button")
            .text("Ejemplo de Uso de en Array")
            .style("padding", "10px")
            .style("font-size", "16px")
            .style("margin", "20px auto")
            .style("display", "block")
            .style("cursor", "pointer")
            .on("click", () => {
                if (!empleados) {
                    empleados = new Empleados.clsEmpleados();
                    console.log("Empleados");
                }
                mostrarVentana();
                empleados.crearUI();
            });

            d3.select("body")
            .append("button")
            .text("Uso de post y get con api usuarios")
            .style("padding", "10px")
            .style("font-size", "16px")
            .style("margin", "20px auto")
            .style("display", "block")
            .style("cursor", "pointer")
            .on("click", () => {
                if (!usuariosUI) {
                    usuariosUI = new CRUD.Usuarios();
                    console.log("Cuadrado");
                }
                mostrarVentana();
                usuariosUI.mostrarVentana();
            });  
            
            d3.select("body")
            .append("button")
            .text("Gestión de productos con Map</>")
            .style("padding", "10px")
            .style("font-size", "16px")
            .style("margin", "20px auto")
            .style("display", "block")
            .style("cursor", "pointer")
            .on("click", () => {
                if (!gestor) {
                    gestor = new Tienda.Productos();
                    console.log("Productos");
                }
                mostrarVentana();
                gestor.crearUI();
            });
    }
}