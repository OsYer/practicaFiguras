namespace Figuras {
    export class Rectangulo {
        public calcularArea(base: number, altura: number): number {
            return base * altura;
        }

        public calcularPerimetro(base: number, altura: number): number {
            return 2 * (base + altura);
        }

        public crearUI(): void {
            let ventana = d3.select("#ventana-rectangulo");

            // if (!ventana.empty()) {
            //     ventana.style("display", "block");
            //     return;
            // }

            ventana = d3.select("body")
                .append("div")
                .attr("id", "ventana-rectangulo")
                .attr("class", "ventana")
                .style("position", "fixed")
                .style("top", "50%")
                .style("left", "50%")
                .style("transform", "translate(-50%, -50%)")
                .style("width", "90%")
                .style("max-width", "400px")
                .style("background", "#ffffff")
                .style("border", "1px solid #ccc")
                .style("border-radius", "12px")
                .style("box-shadow", "0px 8px 16px rgba(0,0,0,0.3)")
                .style("padding", "20px")
                .style("z-index", "1000")
                .style("text-align", "center");

            ventana.append("button")
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
                .on("click", () => ventana.style("display", "none"));

            ventana.append("h2")
                .text("Calculadora de Rectángulo")
                .style("font-size", "clamp(18px, 4vw, 24px)")
                .style("margin-bottom", "15px")
                .style("color", "#333");

            const contenido = ventana.append("div")
            .style("padding", "10px");

            contenido.append("label")
                .text("Base: ")
                .style("font-size", "16px")
                .style("display", "block")
                .style("margin-bottom", "5px");

            contenido.append("input")
                .attr("type", "number")
                .attr("id", "base")
                .style("width", "100%")
                .style("padding", "8px")
                .style("border", "1px solid #ccc")
                .style("border-radius", "6px")
                .style("font-size", "16px")
                .style("margin-bottom", "10px");

            contenido.append("label")
                .text("Altura: ")
                .style("font-size", "16px")
                .style("display", "block")
                .style("margin-top", "10px")
                .style("margin-bottom", "5px");

            contenido.append("input")
                .attr("type", "number")
                .attr("id", "altura")
                .style("width", "100%")
                .style("padding", "8px")
                .style("border", "1px solid #ccc")
                .style("border-radius", "6px")
                .style("font-size", "16px")
                .style("margin-bottom", "10px");

            contenido.append("button")
                .text("Calcular")
                .style("width", "100%")
                .style("padding", "10px")
                .style("border", "none")
                .style("border-radius", "6px")
                .style("background", "linear-gradient(90deg, #ff7e5f, #feb47b)")
                .style("color", "white")
                .style("font-size", "16px")
                .style("cursor", "pointer")
                .style("transition", "0.3s")
                .style("box-shadow", "0px 4px 6px rgba(0,0,0,0.1)")
                .on("mouseover", function () {
                    d3.select(this)
                        .style("background", "linear-gradient(90deg, #feb47b, #ff7e5f)")
                        .style("transform", "scale(1.05)");
                })
                .on("mouseout", function () {
                    d3.select(this)
                        .style("background", "linear-gradient(90deg, #ff7e5f, #feb47b)")
                        .style("transform", "scale(1)");
                })
                .on("click", () => this.realizarCalculo());

            contenido.append("p")
                .attr("id", "resultado-rectangulo")
                .style("margin-top", "10px")
                .style("font-size", "16px")
                .style("color", "#555");

            contenido.append("svg")
                .attr("id", "rectangulo-svg")
                .attr("width", "100%")
                .attr("height", "200px")
                .style("margin-top", "20px")
                .style("border", "1px solid #000");
        }

        private realizarCalculo(): void {
            const base = parseFloat((document.getElementById("base") as HTMLInputElement).value);
            const altura = parseFloat((document.getElementById("altura") as HTMLInputElement).value);

            if (isNaN(base) || isNaN(altura) || base <= 0 || altura <= 0) {
                alert("Por favor, ingrese valores válidos.");
                return;
            }

            const area = this.calcularArea(base, altura);
            const perimetro = this.calcularPerimetro(base, altura);

            d3.select("#resultado-rectangulo").html(`Área: ${area} - Perímetro: ${perimetro}`);
            this.dibujarRectangulo(base, altura);
        }

        private dibujarRectangulo(base: number, altura: number): void {
            const svg = d3.select("#rectangulo-svg");
            svg.selectAll("*").remove();

            svg.append("rect")
                .attr("x", 50)
                .attr("y", 50)
                .attr("width", base)
                .attr("height", altura)
                .attr("fill", "red")
                .attr("stroke", "black")
                .attr("stroke-width", 2);
        }
    }
}
