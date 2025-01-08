document.addEventListener('DOMContentLoaded', function () {
  const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVyaWNvcGVydUBnbWFpbC5jb20ifQ.4Xda7GQ9N5hjkJv4TIfOU4dpjghhyY4ZEcddBR68fgg"; // Замените на ваш API токен
  const API_URL = "https://dniruc.apisperu.com/api/v1/ruc/";

  const input = document.getElementById("numberDocument-2");
  const verifyButton = document.getElementById("verify-document-2");
  const check1 = document.getElementById("polices-2");
  const check2 = document.getElementById("condicion-2");
  const continueButton = document.getElementById("continue-button-2");
  const errorMessage = document.getElementById("error-message");
  const resultBlock = document.getElementById("result");

  // Скрываем результат при загрузке страницы
  resultBlock.style.display = "none";

  // Восстановление данных из localStorage
  const storedRuc = localStorage.getItem("ruc");
  const storedCheck1 = localStorage.getItem("check1-2") === 'true'; // Преобразуем строку в булевое значение
  const storedCheck2 = localStorage.getItem("check2-2") === 'true';

  if (storedRuc) {
    input.value = storedRuc; // Восстанавливаем значение в input
  }

  if (storedCheck1) {
    check1.checked = true; // Восстанавливаем состояние чекбокса 1
  }

  if (storedCheck2) {
    check2.checked = true; // Восстанавливаем состояние чекбокса 2
  }

  // Отключаем кнопку Continuar, если условия не выполнены
  function updateContinueButtonState() {
    const isInputEmpty = input.value.trim() === ''; // Проверка на пустое поле
    const areCheckboxesChecked = check1.checked && check2.checked;
    const isErrorDisplayed = errorMessage.textContent !== '';

    // Кнопка Continuar активна только если все условия выполнены
    continueButton.disabled = isInputEmpty || !areCheckboxesChecked || isErrorDisplayed;
  }

  // Добавляем обработчик событий для чекбоксов и поля ввода
  [check1, check2].forEach((check) => {
    check.addEventListener("change", () => {
      localStorage.setItem("check1-2", check1.checked); // Сохраняем состояние чекбокса 1
      localStorage.setItem("check2-2", check2.checked); // Сохраняем состояние чекбокса 2
      updateContinueButtonState();
    });
  });

  input.addEventListener("input", () => {
    localStorage.setItem("ruc", input.value.trim()); // Сохраняем значение из input

    // Скрываем блок результатов при изменении input
    resultBlock.style.display = "none";

    updateContinueButtonState();
  });

  // Обработчик события нажатия на кнопку Buscar
  verifyButton.addEventListener("click", function () {
    const ruc = input.value.trim();

    // Сброс ошибки и результата
    errorMessage.textContent = '';
    errorMessage.style.display = "none";
    resultBlock.style.display = "none";

    // Проверка длины RUC
    if (ruc.length !== 11) {
      errorMessage.textContent = "¡El RUC debe contener 11 dígitos!";
      errorMessage.style.display = "block";
      updateContinueButtonState(); // Обновляем состояние кнопки Continuar
      return;
    }

    // Формируем URL с параметрами
    const url = `${API_URL}${ruc}?token=${API_TOKEN}`;

    // Отправляем GET запрос
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.ruc) {
          // Обновляем содержимое div с результатами
          document.getElementById("ruc").textContent = data.ruc || "...";
          document.getElementById("razonSocial").textContent = data.razonSocial || "...";

          // Показываем блок с результатами
          resultBlock.style.display = "block";

          // Сбрасываем текст ошибки
          errorMessage.textContent = '';
          errorMessage.style.display = "none";
        } else {
          errorMessage.style.display = "block";
          errorMessage.textContent = "Tu registro está actualmente en proceso de actualización. Por favor, inténtalo más tarde.";
        }
        updateContinueButtonState(); // Обновляем состояние кнопки Continuar
      })
      .catch((error) => {
        console.error("Mensaje:", error);
        errorMessage.textContent = "Tu registro está actualmente en proceso de actualización. Por favor, inténtalo más tarde.";
        errorMessage.style.display = "block";
        updateContinueButtonState(); // Обновляем состояние кнопки Continuar
      });
  });

  // Инициализируем начальное состояние кнопки Continuar
  updateContinueButtonState();

  // Вторая страница

  // При клике на кнопку "Continuar" сохраняем данные в localStorage
  continueButton.addEventListener("click", function () {
    const ruc = document.getElementById("ruc").textContent.trim();
    const razon = document.getElementById("razonSocial").textContent.trim();

    if (ruc && razon) {
      // Очищаем старые данные в localStorage
      localStorage.removeItem("ruc");
      localStorage.removeItem("razonSocial");

      // Записываем новые данные в localStorage
      localStorage.setItem("ruc", ruc);
      localStorage.setItem("razonSocial", razon);

      // Перенаправляем на вторую страницу
      window.location.href = "puntaje_reporte_empresa.html";
    } else {
      alert("Por favor, complete sus datos antes de continuar.");
    }
  });
});
