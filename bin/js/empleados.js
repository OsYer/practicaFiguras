var Empleados;
(function (Empleados) {
    class C_Empleados {
        constructor() {
            this.empleados = [];
            this.crearUI();
        }
        agregarEmpleado(nombre, salario) {
            if (!nombre || isNaN(salario) || salario <= 0) {
                alert("Por favor ingresa un nombre y un salario válido");
                return;
            }
            // if (this.empleados.some(emp => emp.nombre.toLowerCase() === nombre.toLowerCase())) {
            //     alert("El empleado ya existe.");
            //     return;
            // }
            this.empleados.push({ nombre, salarioMensual: salario });
            this.actualizarTabla(this.empleados);
        }
        calcularSueldosAnuales() {
            this.empleados.forEach(empleado => {
                empleado.salarioAnual = empleado.salarioMensual * 12;
            });
            this.actualizarTabla(this.empleados);
        }
        calcularBonos() {
            this.empleados = this.empleados.map(empleado => (Object.assign(Object.assign({}, empleado), { bonoAnual: empleado.salarioAnual * (empleado.salarioMensual > 15000 ? 0.10 : 0.05) })));
            this.actualizarTabla(this.empleados);
        }
        filtrarEmpleados() {
            const empleadosFiltrados = this.empleados.filter(empleado => empleado.salarioMensual > 15000);
            this.actualizarTabla(empleadosFiltrados);
        }
        calcularTotalSueldos() {
            const total = this.empleados.reduce((acumulador, empleado) => acumulador + empleado.salarioMensual, 0);
            alert(`El total de sueldos mensuales es: ${total}`);
        }
        crearUI() {
            this.ventana = d3.select("#ventana-empleados");
            if (!this.ventana.empty()) {
                this.ventana.style("display", "block");
                return;
            }
            this.ventana = d3.select("body")
                .append("div")
                .attr("id", "ventana-empleados")
                .attr("class", "ventana")
                .style("position", "fixed")
                .style("top", "50%")
                .style("left", "50%")
                .style("transform", "translate(-50%, -50%)")
                .style("width", "90%")
                .style("max-width", "400px")
                .style("max-height", "80vh")
                .style("overflow", "auto")
                .style("background", "#ffffff")
                .style("border", "1px solid #ccc")
                .style("border-radius", "12px")
                .style("box-shadow", "0px 8px 16px rgba(0,0,0,0.3)")
                .style("padding", "20px")
                .style("z-index", "1000")
                .style("text-align", "center");
            this.ventana.append("button")
                .text("✖")
                .style("position", "absolute")
                .style("top", "10px")
                .style("right", "10px")
                .style("border", "none")
                .style("background", "transparent")
                .style("font-size", "20px")
                .style("color", "#333")
                .style("cursor", "pointer")
                .style("transition", "0.3s")
                .on("mouseover", function () { d3.select(this).style("color", "red"); })
                .on("mouseout", function () { d3.select(this).style("color", "#333"); })
                .on("click", () => this.ventana.style("display", "none"));
            this.ventana.append("h2")
                .text("Gestión de Empleados")
                .style("font-size", "clamp(18px, 4vw, 24px)")
                .style("margin-bottom", "15px")
                .style("color", "#333");
            const contenido = this.ventana.append("div")
                .style("padding", "10px");
            contenido.append("label")
                .text("Nombre: ")
                .style("font-size", "16px")
                .style("display", "block")
                .style("margin-bottom", "5px");
            this.inputNombre = contenido.append("input")
                .attr("type", "text")
                .attr("id", "nombre")
                .style("width", "100%")
                .style("padding", "8px")
                .style("border", "1px solid #ccc")
                .style("border-radius", "6px")
                .style("font-size", "16px")
                .style("margin-bottom", "10px");
            contenido.append("label")
                .text("Salario Mensual: ")
                .style("font-size", "16px")
                .style("display", "block")
                .style("margin-bottom", "5px");
            this.inputSalarioMensual = contenido.append("input")
                .attr("type", "number")
                .attr("id", "salario")
                .style("width", "100%")
                .style("padding", "8px")
                .style("border", "1px solid #ccc")
                .style("border-radius", "6px")
                .style("font-size", "16px")
                .style("margin-bottom", "10px");
            const botones = [
                {
                    texto: "Agregar Empleado",
                    accion: () => this.agregarEmpleado(this.inputNombre.property("value"), parseFloat(this.inputSalarioMensual.property("value")))
                },
                { texto: "Calcular Sueldos Anuales", accion: () => this.calcularSueldosAnuales() },
                { texto: "Calcular Bonos Anuales", accion: () => this.calcularBonos() },
                { texto: "Filtrar +15,000", accion: () => this.filtrarEmpleados() },
                { texto: "Total Sueldos", accion: () => this.calcularTotalSueldos() }
            ];
            botones.forEach(btn => {
                contenido.append("button")
                    .text(btn.texto)
                    .style("width", "100%")
                    .style("margin-top", "10px")
                    .style("padding", "10px")
                    .style("border", "none")
                    .style("border-radius", "6px")
                    .style("background", "linear-gradient(90deg, #ff7e5f, #feb47b)")
                    .style("color", "white")
                    .style("font-size", "16px")
                    .style("cursor", "pointer")
                    .style("transition", "0.3s")
                    .on("click", btn.accion);
            });
            const tablaWrapper = contenido.append("div")
                .style("max-height", "200px")
                .style("overflow-y", "auto")
                .style("margin-top", "20px");
            tablaWrapper.append("table")
                .attr("id", "tabla-empleados")
                .style("width", "100%")
                .style("border-collapse", "collapse")
                .style("border", "1px solid #000");
            this.actualizarTabla(this.empleados);
        }
        actualizarTabla(empleados = this.empleados) {
            const tabla = d3.select("#tabla-empleados");
            tabla.html("");
            const thead = tabla.append("thead").append("tr");
            ["Nombre", "Salario Mensual", "Salario Anual", "Bono Anual"].forEach(text => {
                thead.append("th")
                    .style("border", "1px solid black")
                    .style("padding", "8px")
                    .style("background", "#ff7e5f")
                    .style("color", "white")
                    .text(text);
            });
            const tbody = tabla.append("tbody");
            empleados.forEach(emp => {
                var _a, _b;
                const row = tbody.append("tr");
                row.append("td")
                    .text(emp.nombre)
                    .style("border", "1px solid black")
                    .style("padding", "8px");
                row.append("td")
                    .text(emp.salarioMensual)
                    .style("border", "1px solid black")
                    .style("padding", "8px");
                row.append("td")
                    .text((_a = emp.salarioAnual) !== null && _a !== void 0 ? _a : "")
                    .style("border", "1px solid black")
                    .style("padding", "8px");
                row.append("td")
                    .text((_b = emp.bonoAnual) !== null && _b !== void 0 ? _b : "")
                    .style("border", "1px solid black")
                    .style("padding", "8px");
            });
        }
    }
    Empleados.C_Empleados = C_Empleados;
})(Empleados || (Empleados = {}));
//# sourceMappingURL=empleados.js.map