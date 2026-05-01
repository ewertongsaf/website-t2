const form = document.getElementById("absence-form");
const totalClassesInput = document.getElementById("total-classes");
const currentAbsencesInput = document.getElementById("current-absences");
const percentOutput = document.getElementById("absence-percent");
const maxOutput = document.getElementById("max-absences");
const remainingOutput = document.getElementById("remaining-absences");
const statusOutput = document.getElementById("absence-status");
const noteOutput = document.getElementById("absence-note");
const resultCard = document.querySelector(".result-card");

const LIMIT_PERCENT = 15; // Limite fixo de 15%

// Determina a cor baseada no percentual de faltas e limite
function getColorStatus(percentage, isWithinLimit) {
  if (!isWithinLimit) {
    return {
      class: "status-red",
      status: "Crítico",
      message:
        "Você ultrapassou o limite de faltas! Procure a secretaria para regularizar sua situação.",
    };
  }
  if (percentage >= 10) {
    return {
      class: "status-yellow",
      status: "Atenção",
      message:
        "Você está próximo do limite de faltas. Cuidado para não ultrapassar!",
    };
  }
  return {
    class: "status-green",
    status: "Seguro",
    message: "Você está seguro. Continue acompanhando suas faltas!",
  };
}

// Algoritmo executado ao 'atualizar' a calculadora
function updateCalculator() {
  const totalClasses = Math.max(0, Number(totalClassesInput.value) || 0);
  const currentAbsences = Math.max(0, Number(currentAbsencesInput.value) || 0);
  const maxAbsences = Math.floor((totalClasses * LIMIT_PERCENT) / 100);
  const remainingAbsences = Math.max(maxAbsences - currentAbsences, 0);
  const percentage =
    totalClasses > 0 ? (currentAbsences / totalClasses) * 100 : 0;
  const isWithinLimit = currentAbsences <= maxAbsences;
  const colorStatus = getColorStatus(percentage, isWithinLimit);

  // Atualiza os valores
  percentOutput.textContent = `${percentage.toFixed(1)}%`;
  maxOutput.textContent = String(maxAbsences);
  remainingOutput.textContent = String(remainingAbsences);
  statusOutput.textContent = colorStatus.status;
  noteOutput.textContent = colorStatus.message;

  // Atualiza a cor do card
  resultCard.className = `calculator-card result-card ${colorStatus.class}`;
}

// Atualiza a calculadora quando o usuario *submita* os dados
form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateCalculator();
});

// Inicializa com valores padrão
updateCalculator();
