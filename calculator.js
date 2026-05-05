const form = document.getElementById("absence-form");
const disciplineSelect = document.getElementById("discipline-select");
const selectedTotalOutput = document.getElementById("selected-total-classes");
const currentAbsencesInput = document.getElementById("current-absences");
const percentOutput = document.getElementById("absence-percent");
const maxOutput = document.getElementById("max-absences");
const remainingOutput = document.getElementById("remaining-absences");
const statusOutput = document.getElementById("absence-status");
const noteOutput = document.getElementById("absence-note");
const resultCard = document.querySelector(".result-card");

const LIMIT_PERCENT = 15; // Limite fixo de 15%

// Carga horaria fixa por disciplina neste semestre (pode ser ajustada depois).
const DISCIPLINE_TOTAL_CLASSES = {
  "CES-10": 96,
  "MTP-03": 32,
  "HUM-01": 48,
  "QUI-18": 80,
  "MAT-13": 64,
  "MAT-15": 32,
  "MAT-17": 32,
  "FND-01": 32,
  "HUM-70": 48,
};

// Determina a cor baseada no percentual de faltas e limite
function getColorStatus(percentage, isWithinLimit, isMaxxed) {
  if (isMaxxed) {
    return {
      class: "status-red",
      status: "Crítico",
      message:
        "Você atingiu o limite de faltas! Não pode faltar mais nenhuma aula. Cuidado!",
    };
  } else if (!isWithinLimit) {
    return {
      class: "status-red",
      status: "Crítico",
      message:
        "Você ultrapassou o limite de faltas! Procure a secretaria para regularizar sua situação.",
    };
  } else if (percentage >= 10) {
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
  const selectedDiscipline = disciplineSelect.value;
  const totalClasses = DISCIPLINE_TOTAL_CLASSES[selectedDiscipline] || 0;
  // Seleciona faltas dentro do intervalo permitido [0, totalClasses]
  const rawCurrent = Number(currentAbsencesInput.value) || 0;
  const currentAbsences = Math.max(0, Math.min(rawCurrent, totalClasses));
  const maxAbsences = Math.floor((totalClasses * LIMIT_PERCENT) / 100);
  const remainingAbsences = Math.max(maxAbsences - currentAbsences, 0);
  const percentage =
    totalClasses > 0 ? (currentAbsences / totalClasses) * 100 : 0;
  const isWithinLimit = currentAbsences < maxAbsences;
  const isMaxxed = currentAbsences == maxAbsences;
  const colorStatus = getColorStatus(percentage, isWithinLimit, isMaxxed);

  selectedTotalOutput.textContent = `Total no semestre: ${totalClasses} aulas`;
  currentAbsencesInput.max = String(totalClasses);

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

// Atualiza dinamicamente quando a disciplina for alterada
disciplineSelect.addEventListener("change", () => {
  const selectedDiscipline = disciplineSelect.value;
  const totalClasses = DISCIPLINE_TOTAL_CLASSES[selectedDiscipline] || 0;
  selectedTotalOutput.textContent = `Total no semestre: ${totalClasses} aulas`;
  currentAbsencesInput.max = String(totalClasses);
});

// Inicializa com valores padrão
updateCalculator();
