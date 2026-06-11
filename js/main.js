// =====================================
// IMPORTACIONES
// =====================================

import { Spring } from "./spring.js";
import { Renderer } from "./renderer.js";
import { PhysicsEngine } from "./physics.js";
import { UIController } from "./ui.js";

// =====================================
// CANVAS
// =====================================

const canvas =
    document.getElementById(
        "simulationCanvas"
    );

// =====================================
// OBJETOS PRINCIPALES
// =====================================

const spring = new Spring({

    mass: 1,
    k: 50,
    damping: 0.5,
    gravity: 9.81

});

const renderer =
    new Renderer(canvas);

const physics =
    new PhysicsEngine(
        spring
    );

const ui =
    new UIController(
        spring
    );

// =====================================
// INICIALIZACIÓN UI
// =====================================

ui.initialize();

// =====================================
// CONTROLES
// =====================================

ui.bindControls({

    onStart: () => {

        spring.start();

        physics.resetClock();
    },

    onPause: () => {

        spring.pause();
    },

    onReset: () => {

        spring.pause();

        spring.reset();

        physics.resetClock();

        ui.updatePhysicsInfo(
            spring.getState()
        );
    }

});

// =====================================
// LOOP DE ANIMACIÓN
// =====================================

function animate(time) {

    physics.update(time);

    const state =
        spring.getState();

    renderer.render({

        ...state,

        restLength:
            spring.restLength

    });

    ui.updatePhysicsInfo(
        state
    );

    requestAnimationFrame(
        animate
    );
}

// =====================================
// ESTADO INICIAL
// =====================================

renderer.render({

    ...spring.getState(),

    restLength:
        spring.restLength

});

ui.updatePhysicsInfo(
    spring.getState()
);

// =====================================
// INICIAR MOTOR
// =====================================

physics.start();

requestAnimationFrame(
    animate
);