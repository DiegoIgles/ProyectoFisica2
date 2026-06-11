// =====================================
// CONFIGURACIÓN GROK
// =====================================

// REEMPLAZA POR TU API KEY

const GROQ_API_KEY = "";

// Endpoint compatible OpenAI de xAI

const API_URL =
    "https://api.groq.com/openai/v1/chat/completions";

// =====================================
// ELEMENTOS DEL DOM
// =====================================

const chatButton =
    document.getElementById(
        "ai-chat-button"
    );

const chatWindow =
    document.getElementById(
        "ai-chat-window"
    );

const closeButton =
    document.getElementById(
        "close-chat"
    );

const messagesContainer =
    document.getElementById(
        "ai-chat-messages"
    );

const input =
    document.getElementById(
        "ai-chat-input"
    );

const sendButton =
    document.getElementById(
        "send-ai-message"
    );

// =====================================
// ABRIR CHAT
// =====================================

chatButton.addEventListener(
    "click",
    () => {

        if (
            chatWindow.style.display ===
            "flex"
        ) {

            chatWindow.style.display =
                "none";

        } else {

            chatWindow.style.display =
                "flex";
        }
    }
);

// =====================================
// CERRAR CHAT
// =====================================

closeButton.addEventListener(
    "click",
    () => {

        chatWindow.style.display =
            "none";
    }
);

// =====================================
// AGREGAR MENSAJE
// =====================================

function addMessage(
    text,
    className
) {

    const message =
        document.createElement(
            "div"
        );

    message.className =
        className;

    message.textContent =
        text;

    messagesContainer.appendChild(
        message
    );

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;
}

// =====================================
// OBTENER DATOS DEL SIMULADOR
// =====================================

function getSimulationData() {

    const mass =
        document.getElementById(
            "mass"
        )?.value;

    const k =
        document.getElementById(
            "springConstant"
        )?.value;

    const damping =
        document.getElementById(
            "damping"
        )?.value;

    const gravity =
        document.getElementById(
            "gravity"
        )?.value;

    const position =
        document.getElementById(
            "positionDisplay"
        )?.textContent;

    const velocity =
        document.getElementById(
            "velocityDisplay"
        )?.textContent;

    const acceleration =
        document.getElementById(
            "accelerationDisplay"
        )?.textContent;

    return {

        mass,
        k,
        damping,
        gravity,
        position,
        velocity,
        acceleration

    };
}

// =====================================
// ENVIAR MENSAJE
// =====================================

async function sendMessage() {

    const userMessage =
        input.value.trim();

    if (!userMessage)
        return;

    addMessage(
        userMessage,
        "user-message"
    );

    input.value = "";

    addMessage(
        "Pensando...",
        "ai-message"
    );

    const thinkingMessage =
        messagesContainer.lastChild;

    const simData =
        getSimulationData();

    const context = `
Eres un asistente de física para estudiantes.

Reglas importantes:

- Responde siempre en español.
- Usa explicaciones cortas y claras.
- No escribas ecuaciones largas salvo que el usuario las pida.
- No realices cálculos numéricos complejos paso a paso.
- Si faltan datos, indícalo.
- Usa listas y párrafos cortos.
- Limita cada respuesta a 200 palabras.
- Si hablas de fórmulas, explica su significado en lenguaje sencillo.
- Nunca dejes ecuaciones incompletas.
- No muestres derivadas ni desarrollos matemáticos avanzados a menos que el usuario los solicite.

Datos actuales del simulador:

Masa = ${simData.mass} kg
Constante k = ${simData.k} N/m
Amortiguamiento = ${simData.damping}
Gravedad = ${simData.gravity} m/s²
Posición = ${simData.position}
Velocidad = ${simData.velocity}
Aceleración = ${simData.acceleration}
`;

    try {

        const response =
            await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {

                       "Content-Type": "application/json",
    "Authorization": `Bearer ${GROQ_API_KEY}`

                    },

                    body: JSON.stringify({

                        model: "llama-3.3-70b-versatile",

                        messages: [

                            {
                                role: "system",
                                content:
                                    context
                            },

                            {
                                role: "user",
                                content:
                                    userMessage
                            }

                        ],

                        temperature: 0.7,

                        max_tokens: 500

                    })

                }
            );

        if (!response.ok) {

            throw new Error(
                `Error HTTP ${response.status}`
            );
        }

        const data =
            await response.json();

        thinkingMessage.remove();

        const answer =
            data.choices?.[0]
                ?.message?.content ||
            "No se recibió respuesta.";

        addMessage(
            answer,
            "ai-message"
        );

    }
    catch (error) {

        thinkingMessage.remove();

        addMessage(
            "Error al conectar con Grok: " +
            error.message,
            "ai-message"
        );

        console.error(error);
    }
}

// =====================================
// BOTÓN ENVIAR
// =====================================

sendButton.addEventListener(
    "click",
    sendMessage
);

// =====================================
// ENTER
// =====================================

input.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
        ) {

            sendMessage();
        }
    }
);