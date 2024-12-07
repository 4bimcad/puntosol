document.addEventListener('DOMContentLoaded', function () {
  const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVyaWNvcGVydUBnbWFpbC5jb20ifQ.4Xda7GQ9N5hjkJv4TIfOU4dpjghhyY4ZEcddBR68fgg"; // Замените на ваш API токен
  const API_URL = "https://dniruc.apisperu.com/api/v1/dni/";

  const input = document.getElementById("numberDocument");
  const verifyButton = document.getElementById("verify-document");
  const check1 = document.getElementById("polices");
  const check2 = document.getElementById("condicion");
  const continueButton = document.getElementById("continue-button");
  const errorMessage = document.getElementById("error-message");
  const resultBlock = document.getElementById("result");

  // Скрываем результат при загрузке страницы
  resultBlock.style.display = "none";

  // Восстановление данных из localStorage
  const storedDni = localStorage.getItem("dni");
  const storedCheck1 = localStorage.getItem("check1") === 'true'; // Преобразуем строку в булевое значение
  const storedCheck2 = localStorage.getItem("check2") === 'true';

  if (storedDni) {
    input.value = storedDni;  // Восстанавливаем значение в input
  }

  if (storedCheck1) {
    check1.checked = true;  // Восстанавливаем состояние чекбокса 1
  }

  if (storedCheck2) {
    check2.checked = true;  // Восстанавливаем состояние чекбокса 2
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
      localStorage.setItem("check1", check1.checked); // Сохраняем состояние чекбокса 1
      localStorage.setItem("check2", check2.checked); // Сохраняем состояние чекбокса 2
      updateContinueButtonState();
    });
  });

  input.addEventListener("input", () => {
    localStorage.setItem("dni", input.value.trim());  // Сохраняем значение из input

    // Скрываем блок результатов при изменении input
    resultBlock.style.display = "none";

    updateContinueButtonState();
  });

  // Обработчик события нажатия на кнопку Buscar
  verifyButton.addEventListener("click", function () {
    const dni = input.value.trim();

    // Сброс ошибки и результата
    errorMessage.textContent = '';
    errorMessage.style.display = "none";
    resultBlock.style.display = "none";

    // Проверка длины DNI
    if (dni.length !== 8) {
      errorMessage.textContent = "¡El DNI debe contener 8 dígitos!";
      errorMessage.style.display = "block";
      updateContinueButtonState(); // Обновляем состояние кнопки Continuar
      return;
    }

    // Формируем URL с параметрами
    const url = `${API_URL}${dni}?token=${API_TOKEN}`;

    // Отправляем GET запрос
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Обновляем содержимое div с результатами
          document.getElementById("dni").textContent = data.dni || "...";
          document.getElementById("nombres").textContent = data.nombres || "...";
          document.getElementById("apellidoPaterno").textContent = data.apellidoPaterno || "...";
          document.getElementById("apellidoMaterno").textContent = data.apellidoMaterno || "...";

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
  document.getElementById("continue-button").addEventListener("click", function () {
    const dni = document.getElementById("dni").textContent.trim();
    const nombres = document.getElementById("nombres").textContent.trim();
    const apellidoPaterno = document.getElementById("apellidoPaterno").textContent.trim();
    const apellidoMaterno = document.getElementById("apellidoMaterno").textContent.trim();

    if (dni && nombres && apellidoPaterno && apellidoMaterno) {
      // Очищаем старые данные в localStorage
      localStorage.removeItem("dni");
      localStorage.removeItem("nombres");
      localStorage.removeItem("apellidoPaterno");
      localStorage.removeItem("apellidoMaterno");

      // Записываем новые данные в localStorage
      localStorage.setItem("dni", dni);
      localStorage.setItem("nombres", nombres);
      localStorage.setItem("apellidoPaterno", apellidoPaterno);
      localStorage.setItem("apellidoMaterno", apellidoMaterno);

      // Перенаправляем на вторую страницу
      window.location.href = "mi_puntaje_reporte.html";
    } else {
      alert("Por favor, complete sus datos antes de continuar.");
    }
  });
});
