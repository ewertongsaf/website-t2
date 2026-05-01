const form = document.getElementById("absence-form");
const totalClassesInput = document.getElementById("total-classes");
const currentAbsencesInput = document.getElementById("current-absences");
const limitPercentInput = document.getElementById("limit-percent");
const percentOutput = document.getElementById("absence-percent");
const maxOutput = document.getElementById("max-absences");
const remainingOutput = document.getElementById("remaining-absences");
const statusOutput = document.getElementById("absence-status");
const noteOutput = document.getElementById("absence-note");

// Algoritmo executado ao 'atualizar' a calculadora
function updateCalculator() {
  const totalClasses = Math.max(0, Number(totalClassesInput.value) || 0); // Prevencao numeros < 0 com funcoes Math.max(x, 0)
  const currentAbsences = Math.max(0, Number(currentAbsencesInput.value) || 0);
  const limitPercent = Math.min(
    100,
    Math.max(1, Number(limitPercentInput.value) || 15), // 15% por padrao
  );
  const maxAbsences = Math.floor((totalClasses * limitPercent) / 100); // Usar o floor para saber o numero maximo de faltas!
  const remainingAbsences = Math.max(maxAbsences - currentAbsences, 0);
  const percentage =
    totalClasses > 0 ? (currentAbsences / totalClasses) * 100 : 0;
  const isWithinLimit = currentAbsences <= maxAbsences; // Ve se o cara estourou as faltas (booleano)

  // Feat: Implementar mudanca de cores da caixa para indicar risco
  percentOutput.textContent = `${percentage.toFixed(1)}%`;
  maxOutput.textContent = String(maxAbsences);
  remainingOutput.textContent = String(remainingAbsences);
  statusOutput.textContent = isWithinLimit
    ? "Dentro do limite"
    : "Acima do limite";
  noteOutput.textContent = isWithinLimit
    ? "Você ainda está dentro do limite de faltas para esta disciplina."
    : "O limite foi ultrapassado. Vale revisar o mapa de faltas com atenção.";
}

// Atualiza a calculadora quando o usuario *submita* os dados
form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateCalculator();
});

// Atualiza automaticamente a calculadora a medida que o usuario digita
[totalClassesInput, currentAbsencesInput, limitPercentInput].forEach(
  (input) => {
    input.addEventListener("input", updateCalculator);
  },
);

updateCalculator();
