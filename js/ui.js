// =====================================
// CONTROLADOR DE INTERFAZ
// =====================================

export class UIController {

    constructor(spring) {

        this.spring = spring;

        // ==========================
        // SLIDERS
        // ==========================

        this.massSlider =
            document.getElementById("mass");

        this.springConstantSlider =
            document.getElementById(
                "springConstant"
            );

        this.dampingSlider =
            document.getElementById(
                "damping"
            );

        this.gravitySlider =
            document.getElementById(
                "gravity"
            );

        // ==========================
        // VALORES VISUALES
        // ==========================

        this.massValue =
            document.getElementById(
                "massValue"
            );

        this.springConstantValue =
            document.getElementById(
                "springConstantValue"
            );

        this.dampingValue =
            document.getElementById(
                "dampingValue"
            );

        this.gravityValue =
            document.getElementById(
                "gravityValue"
            );

        // ==========================
        // INFORMACIÓN DINÁMICA
        // ==========================

        this.positionDisplay =
            document.getElementById(
                "positionDisplay"
            );

        this.velocityDisplay =
            document.getElementById(
                "velocityDisplay"
            );

        this.accelerationDisplay =
            document.getElementById(
                "accelerationDisplay"
            );

        // ==========================
        // BOTONES
        // ==========================

        this.startBtn =
            document.getElementById(
                "startBtn"
            );

        this.pauseBtn =
            document.getElementById(
                "pauseBtn"
            );

        this.resetBtn =
            document.getElementById(
                "resetBtn"
            );
    }

    // =====================================
    // Inicializar eventos
    // =====================================

    initialize() {

        this.initializeSliders();

        this.updateDisplayedValues();
    }

    // =====================================
    // Configurar sliders
    // =====================================

    initializeSliders() {

        // Masa

        this.massSlider.addEventListener(
            "input",
            (event) => {

                const value =
                    event.target.value;

                this.spring.setMass(
                    value
                );

                this.massValue.textContent =
                    Number(value).toFixed(1);
            }
        );

        // Constante elástica

        this.springConstantSlider.addEventListener(
            "input",
            (event) => {

                const value =
                    event.target.value;

                this.spring.setSpringConstant(
                    value
                );

                this.springConstantValue.textContent =
                    value;
            }
        );

        // Amortiguamiento

        this.dampingSlider.addEventListener(
            "input",
            (event) => {

                const value =
                    event.target.value;

                this.spring.setDamping(
                    value
                );

                this.dampingValue.textContent =
                    Number(value).toFixed(1);
            }
        );

        // Gravedad

        this.gravitySlider.addEventListener(
            "input",
            (event) => {

                const value =
                    event.target.value;

                this.spring.setGravity(
                    value
                );

                this.gravityValue.textContent =
                    Number(value).toFixed(2);
            }
        );
    }

    // =====================================
    // Eventos botones
    // =====================================

    bindControls({

        onStart,
        onPause,
        onReset

    }) {

        this.startBtn.addEventListener(
            "click",
            () => {

                if (onStart)
                    onStart();
            }
        );

        this.pauseBtn.addEventListener(
            "click",
            () => {

                if (onPause)
                    onPause();
            }
        );

        this.resetBtn.addEventListener(
            "click",
            () => {

                if (onReset)
                    onReset();
            }
        );
    }

    // =====================================
    // Actualizar panel físico
    // =====================================

    updatePhysicsInfo(state) {

        this.positionDisplay.textContent =
            state.position.toFixed(2);

        this.velocityDisplay.textContent =
            state.velocity.toFixed(2);

        this.accelerationDisplay.textContent =
            state.acceleration.toFixed(2);
    }

    // =====================================
    // Actualizar etiquetas
    // =====================================

    updateDisplayedValues() {

        this.massValue.textContent =
            Number(
                this.massSlider.value
            ).toFixed(1);

        this.springConstantValue.textContent =
            this.springConstantSlider.value;

        this.dampingValue.textContent =
            Number(
                this.dampingSlider.value
            ).toFixed(1);

        this.gravityValue.textContent =
            Number(
                this.gravitySlider.value
            ).toFixed(2);
    }

    // =====================================
    // Sincronizar interfaz
    // =====================================

    syncFromSpring() {

        this.massSlider.value =
            this.spring.mass;

        this.springConstantSlider.value =
            this.spring.k;

        this.dampingSlider.value =
            this.spring.damping;

        this.gravitySlider.value =
            this.spring.gravity;

        this.updateDisplayedValues();
    }
}