// =====================================
// RENDERER DEL SIMULADOR
// =====================================

export class Renderer {

    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.width = canvas.width;
        this.height = canvas.height;

        // Punto de anclaje del resorte
        this.anchorX = this.width / 2;
        this.anchorY = 80;

        // Dimensiones masa
        this.massWidth = 90;
        this.massHeight = 70;

        // Resorte
        this.springTurns = 18;
        this.springAmplitude = 20;
    }

    // =====================================
    // Limpiar canvas
    // =====================================

    clear() {

        this.ctx.clearRect(
            0,
            0,
            this.width,
            this.height
        );
    }

    // =====================================
    // Fondo
    // =====================================

    drawBackground() {

        const ctx = this.ctx;

        ctx.fillStyle = "#ffffff";

        ctx.fillRect(
            0,
            0,
            this.width,
            this.height
        );
    }

    // =====================================
    // Soporte superior
    // =====================================

    drawSupport() {

        const ctx = this.ctx;

        ctx.fillStyle = "#333";

        ctx.fillRect(
            this.anchorX - 120,
            40,
            240,
            20
        );

        ctx.beginPath();

        ctx.arc(
            this.anchorX,
            this.anchorY,
            8,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    // =====================================
    // Dibujar resorte helicoidal
    // =====================================

    drawSpring(length) {

        const ctx = this.ctx;

        const startX = this.anchorX;
        const startY = this.anchorY;

        const turns = this.springTurns;
        const amplitude =
            this.springAmplitude;

        ctx.beginPath();

        ctx.moveTo(startX, startY);

        const segments = turns * 10;

        for (
            let i = 0;
            i <= segments;
            i++
        ) {

            const t = i / segments;

            const y =
                startY + t * length;

            const x =
                startX +
                Math.sin(
                    t *
                    turns *
                    Math.PI *
                    2
                ) *
                amplitude;

            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = "#2563eb";
        ctx.lineWidth = 3;

        ctx.stroke();
    }

    // =====================================
    // Dibujar masa
    // =====================================

    drawMass(yPosition) {

        const ctx = this.ctx;

        const x =
            this.anchorX -
            this.massWidth / 2;

        const y = yPosition;

        // sombra

        ctx.fillStyle =
            "rgba(0,0,0,0.15)";

        ctx.fillRect(
            x + 4,
            y + 4,
            this.massWidth,
            this.massHeight
        );

        // bloque

        ctx.fillStyle = "#ef4444";

        ctx.fillRect(
            x,
            y,
            this.massWidth,
            this.massHeight
        );

        // borde

        ctx.strokeStyle = "#991b1b";

        ctx.lineWidth = 2;

        ctx.strokeRect(
            x,
            y,
            this.massWidth,
            this.massHeight
        );

        // texto

        ctx.fillStyle = "#ffffff";

        ctx.font =
            "bold 20px Arial";

        ctx.textAlign = "center";

        ctx.fillText(
            "m",
            this.anchorX,
            y + 42
        );
    }

    // =====================================
    // Línea guía
    // =====================================

    drawGuideLine(yPosition) {

        const ctx = this.ctx;

        ctx.beginPath();

        ctx.moveTo(
            this.anchorX,
            this.anchorY
        );

        ctx.lineTo(
            this.anchorX,
            yPosition
        );

        ctx.strokeStyle =
            "rgba(0,0,0,0.15)";

        ctx.lineWidth = 1;

        ctx.stroke();
    }

    // =====================================
    // Escala lateral
    // =====================================

    drawScale() {

        const ctx = this.ctx;

        const x = 80;

        ctx.strokeStyle = "#999";
        ctx.lineWidth = 1;

        ctx.beginPath();

        ctx.moveTo(x, 80);
        ctx.lineTo(x, 550);

        ctx.stroke();

        for (
            let y = 80;
            y <= 550;
            y += 25
        ) {

            ctx.beginPath();

            ctx.moveTo(
                x - 6,
                y
            );

            ctx.lineTo(
                x + 6,
                y
            );

            ctx.stroke();
        }
    }

    // =====================================
    // Render principal
    // =====================================

    render(springState) {

        this.clear();

        this.drawBackground();

        this.drawScale();

        this.drawSupport();

        const springLength =
            springState.restLength +
            springState.position;

        const massY =
            this.anchorY +
            springLength;

        this.drawGuideLine(massY);

        this.drawSpring(
            springLength
        );

        this.drawMass(
            massY
        );
    }
}