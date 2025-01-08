// DOM Elements
const input = document.getElementById("numberDocument-2");
const verifyButton = document.getElementById("verify-document-2");
const check1 = document.getElementById("polices-2");
const check2 = document.getElementById("condicion-2");
const continueButton = document.getElementById("continue-button-2");
const errorMessage = document.getElementById("error-message"); // Для сообщений об ошибках

// Обновление состояния кнопки "Continuar"
function updateContinueButtonState() {
  const isInputComplete = input.value.trim().length === 11; // Проверяем длину на 11 символов
  const areCheckboxesChecked = check1.checked && check2.checked;

  // Кнопка "Continuar" активна, если все условия выполнены
  continueButton.disabled = !(isInputComplete && areCheckboxesChecked && !errorMessage.textContent);
}

// Событие для поля ввода RUC
input.addEventListener("input", () => {
  const isInputComplete = input.value.trim().length === 11;

  // Включаем/выключаем кнопку "Verificar" в зависимости от длины ввода
  verifyButton.disabled = !isInputComplete;

  // Обновляем состояние кнопки "Continuar"
  updateContinueButtonState();
});

// Событие для чекбоксов
[check1, check2].forEach(check => {
  check.addEventListener("change", updateContinueButtonState);
});

// Пример функции для отображения ошибок
function handleError(errorText) {
  errorMessage.textContent = errorText; // Показываем текст ошибки
  errorMessage.style.display = "block"; // Делаем ошибку видимой
  continueButton.disabled = true;       // Отключаем кнопку "Continuar"
}

// Пример функции для скрытия ошибок
function clearError() {
  errorMessage.textContent = "";        // Очищаем текст ошибки
  errorMessage.style.display = "none"; // Прячем блок ошибки
  updateContinueButtonState();          // Обновляем состояние кнопки
}

// Событие для кнопки "Verificar"
verifyButton.addEventListener("click", () => {
  const ruc = input.value.trim();

  // Сброс сообщения об ошибке перед проверкой
  clearError();

  // Проверка длины RUC
  if (ruc.length !== 11) {
    handleError("¡El RUC debe contener 11 dígitos!");
    return;
  }

  // Дополнительная логика проверки RUC (например, через API) может быть добавлена здесь
  console.log(`Verificando RUC: ${ruc}`);
});

// Инициализируем начальное состояние кнопки "Continuar"
updateContinueButtonState();
