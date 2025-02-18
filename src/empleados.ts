namespace Empleados {
    export interface Empleado {
        nombre: string;
        salarioMensual: number;
        salarioAnual?: number;
        bonoAnual?: number;
    }

    export class clsEmpleados {
        private empleados: Empleado[] = [];

        public agregarEmpleado(nombre: string, salario: number): void {
            if (!nombre || isNaN(salario) || salario <= 0) {
                alert("Por favor ingresa un nombre y un salario válido");
                return;
            }

            if (this.empleados.some(emp => emp.nombre.toLowerCase() === nombre.toLowerCase())) {
                alert("El empleado ya existe.");
                return;
            }

            this.empleados.push({ nombre, salarioMensual: salario });
            this.actualizarTabla(this.empleados);
        }

        public calcularSueldosAnuales(): void {
            this.empleados.forEach(empleado => {
                empleado.salarioAnual = empleado.salarioMensual * 12;
            });

            this.actualizarTabla(this.empleados);
        }
        public calcularBonos(): void {
            this.empleados = this.empleados.map(empleado => ({
                ...empleado,
                bonoAnual: empleado.salarioAnual! * (empleado.salarioMensual > 15000 ? 0.10 : 0.05) 
            }));

            this.actualizarTabla(this.empleados);
        }

        public filtrarEmpleados(): void {
            const empleadosFiltrados = this.empleados.filter(empleado => empleado.salarioMensual > 15000);
            this.actualizarTabla(empleadosFiltrados);
        }

        public calcularTotalSueldos(): void {
            const total = this.empleados.reduce((acumulador, empleado) => acumulador + empleado.salarioMensual, 0);
            alert(`El total de sueldos mensuales es: ${total}`);
        }

        public crearUI(): void {
            let ventana = d3.select("#ventana-empleados");

            if (!ventana.empty()) {
                ventana.style("display", "block");
                return;
            }

            ventana = d3.select("body")
                .append("div")
                .attr("id", "ventana-empleados")
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
                .text("Gestión de Empleados")
                .style("text-align", "center")
                .style("margin-top", "10px")
                .style("color", "#333");

            const form = ventana.append("div").style("padding", "10px");

            form.append("label").text("Nombre: ");
            form.append("input")
                .attr("id", "nombre")
                .attr("type", "text")
                .style("width", "100%");

            form.append("br");

            form.append("label").text("Salario Mensual: ");
            form.append("input")
                .attr("id", "salario")
                .attr("type", "number")
                .style("width", "100%");

            form.append("br");
            form.append("button")
                .text("Agregar Empleado")
                .style("margin-top", "10px")
                .style("padding", "8px")
                .style("cursor", "pointer")
                .style("width", "100%")
                .on("click", () => {
                    const nombre = (document.getElementById("nombre") as HTMLInputElement).value;
                    const salario = parseFloat((document.getElementById("salario") as HTMLInputElement).value);
                    this.agregarEmpleado(nombre, salario);
                });

            form.append("button")
                .text("Calcular Sueldos Anuales")
                .style("margin-top", "10px")
                .style("padding", "8px")
                .style("cursor", "pointer")
                .style("width", "100%")
                .on("click", () => this.calcularSueldosAnuales());

            form.append("button")
                .text("Calcular Bonos Anuales")
                .style("margin-top", "10px")
                .style("padding", "8px")
                .style("cursor", "pointer")
                .style("width", "100%")
                .on("click", () => this.calcularBonos());

            form.append("button")
                .text("Filtrar +15,000")
                .style("margin-top", "10px")
                .style("padding", "8px")
                .style("cursor", "pointer")
                .style("width", "100%")
                 .on("click", () => this.filtrarEmpleados());

            ventana.append("table")
                .attr("id", "tabla-empleados")
                .style("width", "100%")
                .style("margin-top", "20px")
                .style("border", "1px solid black");

            this.actualizarTabla(this.empleados);
        }

        private actualizarTabla(empleados: Empleado[] = this.empleados): void {
            const tabla = d3.select("#tabla-empleados");

            if (tabla.select("thead").empty()) {
                tabla.append("thead").append("tr")
                    .selectAll("th")
                    .data(["Nombre", "Salario Mensual", "Salario Anual", "Bono Anual"]) 
                    .enter()
                    .append("th")
                    .style("border-bottom", "2px solid #ddd")
                    .style("padding", "8px")
                    .text(d => d);

                tabla.append("tbody").attr("id", "tbody-empleados");
            }

            const tbody = d3.select("#tbody-empleados");

            const rows = tbody.selectAll("tr")
                .data(empleados, (d: Empleado) => d.nombre);

            const newRows = rows.enter().append("tr");

            newRows.append("td").text(d => d.nombre);
            newRows.append("td").text(d => d.salarioMensual);
            newRows.append("td").text(d => d.salarioAnual ?? "");
            newRows.append("td").text(d => d.bonoAnual ?? ""); 
            rows.select("td:nth-child(3)").text(d => d.salarioAnual ?? "");
            rows.select("td:nth-child(4)").text(d => d.bonoAnual ?? "");

            rows.exit().remove();
        }
    }
}