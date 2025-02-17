namespace app {
    export function ini(): void {
        let rectangulo: Figuras.Rectangulo | null = null;
        let cuadrado: Figuras.Cuadrado | null = null;
        let empleados: Empleados.clsEmpleados | null = null;

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
                cuadrado.crearUI();
            });

        d3.select("body")
            .append("button")
            .text("Ejemplo de Uso de map() en Arrays")
            .style("padding", "10px")
            .style("font-size", "16px")
            .style("margin", "20px auto")
            .style("display", "block")
            .style("cursor", "pointer")
            .on("click", () => {
                if (!empleados) {
                    empleados = new Empleados.clsEmpleados();
                    console.log("Cuadrado");
                }
                empleados.crearUI();
            });
    }
}