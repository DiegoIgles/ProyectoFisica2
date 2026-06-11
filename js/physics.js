// =====================================
// MOTOR DE FÍSICA
// =====================================

export class PhysicsEngine {

    constructor(spring) {

        this.spring = spring;

        // Tiempo del frame anterior
        this.lastTime = 0;

        // Limitar dt para evitar explosiones numéricas
        this.maxDeltaTime = 0.03;

        // Factor de velocidad global
        this.timeScale = 1;
    }

    // =====================================
    // Inicializar reloj
    // =====================================

    start() {

        this.lastTime =
            performance.now();
    }

    // =====================================
    // Actualizar simulación
    // =====================================

    update(currentTime) {

        let deltaTime =
            (currentTime - this.lastTime) /
            1000;

        this.lastTime =
            currentTime;

        // Evitar saltos enormes
        deltaTime = Math.min(
            deltaTime,
            this.maxDeltaTime
        );

        deltaTime *=
            this.timeScale;

        this.spring.update(
            deltaTime
        );

        return deltaTime;
    }

    // =====================================
    // Reiniciar reloj
    // =====================================

    resetClock() {

        this.lastTime =
            performance.now();
    }

    // =====================================
    // Cambiar velocidad simulación
    // =====================================

    setTimeScale(value) {

        this.timeScale =
            Number(value);
    }

    // =====================================
    // Obtener velocidad simulación
    // =====================================

    getTimeScale() {

        return this.timeScale;
    }

    // =====================================
    // Obtener estado
    // =====================================

    getState() {

        return this.spring.getState();
    }
}