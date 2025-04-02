let currentTeam = "A";
let scores = { A: 0, B: 0 };
let currentQuestion = 0;
let hasRebounded = false;
let startingTeam = "A";

const questions = [
    { text: "¿Qué es lo primero que debes hacer antes de una actividad física intensa?", options: { A: "Estirar sin calentar", B: "Realizar un calentamiento", C: "Correr a máxima velocidad", D: "Saltar sin preparación" }, correct: "B" },
    { text: "¿Qué mejora la resistencia cardiovascular?", options: { A: "Levantar pesas", B: "Correr durante 30 minutos", C: "Hacer flexiones", D: "Estiramientos estáticos" }, correct: "B" },
    { text: "¿Qué habilidad motriz se trabaja al mantener el equilibrio sobre una pierna?", options: { A: "Fuerza", B: "Coordinación", C: "Equilibrio", D: "Velocidad" }, correct: "C" },
    { text: "¿Qué deporte de equipo usa una red y un balón para pasar por encima?", options: { A: "Fútbol", B: "Baloncesto", C: "Voleibol", D: "Rugby" }, correct: "C" },
    { text: "¿Qué elemento es esencial en la expresión corporal?", options: { A: "Ritmo", B: "Fuerza máxima", C: "Competencia", D: "Velocidad" }, correct: "A" },
    { text: "¿Qué actividad en el medio natural requiere una brújula?", options: { A: "Escalada", B: "Orientación", C: "Natación", D: "Ciclismo" }, correct: "B" },
    { text: "¿Qué parte del cuerpo se fortalece más al hacer abdominales?", options: { A: "Brazos", B: "Piernas", C: "Abdomen", D: "Espalda" }, correct: "C" },
    { text: "¿Qué debes evitar para mantener una buena higiene postural?", options: { A: "Sentarte recto", B: "Encogerte al estar sentado", C: "Mirar al frente", D: "Apoyar la espalda" }, correct: "B" },
    { text: "¿Qué técnica se usa para lanzar un balón en baloncesto?", options: { A: "Pase de pecho", B: "Golpe de puño", C: "Patada", D: "Lanzamiento de hombro" }, correct: "A" },
    { text: "¿Qué indica una frecuencia cardíaca elevada durante el ejercicio?", options: { A: "Falta de esfuerzo", B: "Buen calentamiento", C: "Esfuerzo físico", D: "Reposo" }, correct: "C" },
    { text: "¿Qué juego tradicional fomenta la cooperación?", options: { A: "El escondite", B: "La cuerda", C: "El pañuelo", D: "La gallinita ciega" }, correct: "B" },
    { text: "¿Qué deporte individual requiere una raqueta y una red?", options: { A: "Natación", B: "Tenis", C: "Atletismo", D: "Gimnasia" }, correct: "B" },
    { text: "¿Qué mejora la flexibilidad?", options: { A: "Correr rápido", B: "Hacer estiramientos", C: "Saltar alto", D: "Levantar pesas" }, correct: "B" },
    { text: "¿Qué debes usar para protegerte en una actividad en el medio natural?", options: { A: "Gafas de sol", B: "Casco", C: "Guantes", D: "Todo lo anterior" }, correct: "D" },
    { text: "¿Qué táctica se usa en fútbol para avanzar en equipo?", options: { A: "Pase en profundidad", B: "Tiro a puerta", C: "Regate individual", D: "Salto vertical" }, correct: "A" },
    { text: "¿Qué actividad expresiva usa música y movimientos coordinados?", options: { A: "Danza", B: "Fútbol", C: "Lucha", D: "Atletismo" }, correct: "A" },
    { text: "¿Qué mide la prueba de salto vertical?", options: { A: "Fuerza explosiva", B: "Resistencia", C: "Equilibrio", D: "Coordinación" }, correct: "A" },
    { text: "¿Qué hábito saludable evita lesiones?", options: { A: "No calentar", B: "Hidratarse", C: "Correr sin zapatillas", D: "Saltar sin control" }, correct: "B" },
    { text: "¿Qué deporte colectivo tiene 5 jugadores por equipo en la cancha?", options: { A: "Fútbol", B: "Baloncesto", C: "Voleibol", D: "Balonmano" }, correct: "B" },
    { text: "¿Qué se necesita para una buena orientación en el medio natural?", options: { A: "Mapa y brújula", B: "Pelota", C: "Raqueta", D: "Cuerda" }, correct: "A" }
];

function updateBackground() {
    document.body.style.backgroundColor = currentTeam === "A" ? "white" : "black";
    document.body.style.color = currentTeam === "A" ? "black" : "white";
}

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").innerText = q.text;
    document.getElementById("optA").innerText = `A: ${q.options.A}`;
    document.getElementById("optB").innerText = `B: ${q.options.B}`;
    document.getElementById("optC").innerText = `C: ${q.options.C}`;
    document.getElementById("optD").innerText = `D: ${q.options.D}`;
    document.getElementById("rebound").style.display = "none";
    document.getElementById("optA").style.display = "block";
    document.getElementById("optB").style.display = "block";
    document.getElementById("optC").style.display = "block";
    document.getElementById("optD").style.display = "block";
    updateBackground();
}

function checkAnswer(selected) {
    const q = questions[currentQuestion];
    if (selected === q.correct) {
        scores[currentTeam]++;
        updateScores();
        document.body.style.backgroundColor = "#00cc00";
        setTimeout(() => {
            startingTeam = currentTeam;
            nextQuestion();
        }, 1000);
    } else {
        if (!hasRebounded) {
            document.body.style.backgroundColor = "#ff4444";
            setTimeout(() => {
                document.getElementById("rebound").style.display = "block";
                hasRebounded = true;
                currentTeam = currentTeam === "A" ? " personallyB" : "A";
                document.getElementById(`opt${selected}`).style.display = "none";
                updateBackground();
            }, 1000);
        } else {
            document.body.style.backgroundColor = "#ff4444";
            setTimeout(() => {
                currentTeam = startingTeam;
                nextQuestion();
            }, 1000);
        }
    }
}

function reboundQuestion() {
    document.getElementById("rebound").style.display = "none";
}

function nextQuestion() {
    hasRebounded = false;
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.body.style.backgroundColor = "#ffcc00";
        document.getElementById("question").innerText = `Fin del examen. Ganador: Equipo ${scores.A > scores.B ? "A" : "B"}`;
        document.querySelector(".options").style.display = "none";
        document.getElementById("rebound").style.display = "none";
        document.getElementById("next").style.display = "none";
    }
}

function updateScores() {
    document.getElementById("scoreA").innerText = scores.A;
    document.getElementById("scoreB").innerText = scores.B;
}

loadQuestion();