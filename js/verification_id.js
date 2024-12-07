// DOM Elements
const input = document.getElementById("numberDocument");
const verifyButton = document.getElementById("verify-document");
const check1 = document.getElementById("polices");
const check2 = document.getElementById("condicion");
const continueButton = document.getElementById("continue-button");
const errorMessage = document.getElementById("error-message"); // Для сообщений об ошибках

// Отключаем кнопки, пока поле не заполнено полностью
input.addEventListener("input", () => {
  const isInputComplete = input.value.trim().length === 8;

  // Включаем/выключаем кнопку "Verificar" в зависимости от длины ввода
  verifyButton.disabled = !isInputComplete;

  // Проверяем чекбоксы и текст ошибки для "Continuar"
  const areCheckboxesChecked = check1.checked && check2.checked;
  continueButton.disabled = !(isInputComplete && areCheckboxesChecked && !errorMessage.textContent);
});

// Проверка чекбоксов для кнопки "Continuar"
[check1, check2].forEach(check => {
  check.addEventListener("change", () => {
    const isInputComplete = input.value.trim().length === 8;
    const areCheckboxesChecked = check1.checked && check2.checked;

    // Кнопка "Continuar" активна только при выполнении всех условий
    continueButton.disabled = !(isInputComplete && areCheckboxesChecked && !errorMessage.textContent);
  });
});

// Пример функции для отображения ошибок
function handleError(errorText) {
  errorMessage.textContent = errorText; // Показываем текст ошибки
  continueButton.disabled = true;       // Отключаем кнопку "Continuar"
}
