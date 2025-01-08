document.addEventListener("DOMContentLoaded", function () {
    // Диапазон значений для расчета кредитного рейтинга
    const MIN_SCORE = 450;
    const MAX_SCORE = 750;
  
    // Диапазон процентов для шкалы
    const MIN_PERCENT = (MIN_SCORE / 1050) * 100;
    const MAX_PERCENT = (MAX_SCORE / 1050) * 100;
  
    // Генерация случайного значения для credit score
    const generateScore = () => Math.floor(Math.random() * (MAX_SCORE - MIN_SCORE + 1)) + MIN_SCORE;
  
    // Рассчет процента от диапазона (для шкалы MIN_PERCENT-MAX_PERCENT)
    const calculatePercentage = (score) => {
        return (
            MIN_PERCENT +
            ((score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * (MAX_PERCENT - MIN_PERCENT)
        );
    };
  
    // Получаем номер DNI с элемента
    const dniReporte = document.getElementById("dni_reporte");
    const dni = dniReporte ? dniReporte.textContent : null;
  
    // Проверка наличия номера dni
    if (dni) {
        let storedScore = localStorage.getItem(`creditScore_${dni}`);
        let storedPercentage = localStorage.getItem(`creditPercentage_${dni}`);
  
        if (storedScore && storedPercentage) {
            // Если для данного DNI уже есть сохранённые значения
            const scoreActualElement = document.getElementById("score-actual");
            const scoreScaleElement = document.getElementById("score-actual-2");
            const puntajeCrediticioElement = document.getElementById("puntaje_crediticio");
  
            // Обновляем данные на странице
            if (scoreActualElement) {
                scoreActualElement.setAttribute("data-value", storedScore);
                scoreActualElement.textContent = storedScore;
                
                // Присваиваем значение из score-actual переменной puntaje_crediticio
                let puntaje_crediticio = storedScore; // Просто присваиваем значение из score-actual
                console.log("puntaje_crediticio:", puntaje_crediticio); // Логирование

                // Записываем значение в элемент с id="puntaje_crediticio"
                if (puntajeCrediticioElement) {
                    puntajeCrediticioElement.textContent = puntaje_crediticio;
                }
            }
  
            if (scoreScaleElement) {
                scoreScaleElement.setAttribute("data-value", storedPercentage);
                const scoreTick = scoreScaleElement.querySelector(".scoreTick");
                const scoreArrow = scoreScaleElement.querySelector(".scoreArrow");
  
                if (scoreTick && scoreArrow) {
                    scoreTick.style.left = storedPercentage + "%";
                    scoreArrow.style.left = storedPercentage + "%";
                }
            }
        } else {
            // Если данных нет, генерируем и сохраняем новые значения
            const creditScore = generateScore();
            const creditPercentage = calculatePercentage(creditScore);
  
            // Сохраняем новые значения в localStorage
            localStorage.setItem(`creditScore_${dni}`, creditScore);
            localStorage.setItem(`creditPercentage_${dni}`, creditPercentage);
  
            // Обновляем data-value и текст для id="score-actual"
            const scoreActualElement = document.getElementById("score-actual");
            if (scoreActualElement) {
                // Устанавливаем data-value
                scoreActualElement.setAttribute("data-value", creditScore);
  
                // Обновляем текст до начала анимации
                scoreActualElement.textContent = "0";
  
                // Проверяем, подключен ли jQuery
                if (typeof $ !== "undefined" && typeof $.animateNumber !== "undefined") {
                    // Анимация числа с помощью animateNumber
                    $(scoreActualElement).animateNumber(
                        {
                            number: creditScore, // Конечное значение
                            easing: 'swing', // Плавное увеличение
                            numberStep: $.animateNumber.numberStepFactories.separator(',') // Разделитель тысяч
                        },
                        1500 // Длительность анимации
                    );
                } else {
                    // Если animateNumber недоступен, обновляем сразу
                    scoreActualElement.textContent = creditScore;
                }
            }
  
            // Обновляем data-value для шкалы id="score-actual-2"
            const scoreScaleElement = document.getElementById("score-actual-2");
            if (scoreScaleElement) {
                const roundedPercentage = Math.round(creditPercentage); // Округляем процент
                scoreScaleElement.setAttribute("data-value", roundedPercentage);
  
                // Обновляем позицию стрелки и метки на шкале
                const scoreTick = scoreScaleElement.querySelector(".scoreTick");
                const scoreArrow = scoreScaleElement.querySelector(".scoreArrow");
                if (scoreTick && scoreArrow) {
                    scoreTick.style.left = roundedPercentage + "%";
                    scoreArrow.style.left = roundedPercentage + "%";
                }
            }

            // Присваиваем значение из score-actual переменной puntaje_crediticio
            let puntaje_crediticio = creditScore; // Просто присваиваем значение из score-actual
            console.log("puntaje_crediticio:", puntaje_crediticio); // Логирование

            // Записываем значение в элемент с id="puntaje_crediticio"
            const puntajeCrediticioElement = document.getElementById("puntaje_crediticio");
            if (puntajeCrediticioElement) {
                puntajeCrediticioElement.textContent = puntaje_crediticio;
            }
        }
    } else {
        console.error("Не найден элемент с номером DNI!");
    }
});
