// =====================================
// CLASE SPRING SYSTEM
// Sistema masa-resorte amortiguado
// =====================================

export class Spring {

    constructor({
        mass = 1,
        k = 50,
        damping = 0.5,
        gravity = 9.81
    } = {}) {

        // Parámetros físicos
        this.mass = mass;
        this.k = k;
        this.damping = damping;
        this.gravity = gravity;

        // Longitud natural del resorte (px)
        this.restLength = 150;

        // Estado dinámico
        this.position = 40;      // desplazamiento inicial
        this.velocity = 0;
        this.acceleration = 0;

        // Estado inicial para reset
        this.initialPosition = 40;

        // Simulación
        this.running = false;
    }

    // ==========================
    // Actualizar física
    // ==========================
    update(dt) {

        if (!this.running) return;

        // Fuerza elástica
        const springForce = -this.k * this.position;

        // Fuerza de amortiguamiento
        const dampingForce = -this.damping * this.velocity;

        // Fuerza de gravedad
        const gravityForce = this.mass * this.gravity;

        // Fuerza neta
        const netForce =
            springForce +
            dampingForce +
            gravityForce;

        // Segunda ley de Newton
        this.acceleration =
            netForce / this.mass;

        // Integración de Euler
        this.velocity +=
            this.acceleration * dt;

        this.position +=
            this.velocity * dt;
    }

    // ==========================
    // Reiniciar simulación
    // ==========================
    reset() {

        this.position = this.initialPosition;
        this.velocity = 0;
        this.acceleration = 0;
    }

    // ==========================
    // Iniciar
    // ==========================
    start() {
        this.running = true;
    }

    // ==========================
    // Pausar
    // ==========================
    pause() {
        this.running = false;
    }

    // ==========================
    // Cambiar masa
    // ==========================
    setMass(value) {
        this.mass = Number(value);
    }

    // ==========================
    // Cambiar k
    // ==========================
    setSpringConstant(value) {
        this.k = Number(value);
    }

    // ==========================
    // Cambiar amortiguamiento
    // ==========================
    setDamping(value) {
        this.damping = Number(value);
    }

    // ==========================
    // Cambiar gravedad
    // ==========================
    setGravity(value) {
        this.gravity = Number(value);
    }

    // ==========================
    // Obtener datos
    // ==========================
    getState() {

        return {
            position: this.position,
            velocity: this.velocity,
            acceleration: this.acceleration,
            mass: this.mass,
            k: this.k,
            damping: this.damping,
            gravity: this.gravity
        };
    }
}