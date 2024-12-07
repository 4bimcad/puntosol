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

    // Получаем RUC и razonSocial
    const rucElement = document.getElementById("ruc_reporte");
    const razonSocialElement = document.getElementById("razonSocial_reporte");
    const ruc = rucElement ? rucElement.textContent : null;
    const razonSocial = razonSocialElement ? razonSocialElement.textContent : null;

    // Проверка наличия RUC
    if (ruc) {
        let storedScore = localStorage.getItem(`creditScore_${ruc}`);
        let storedPercentage = localStorage.getItem(`creditPercentage_${ruc}`);

        if (storedScore && storedPercentage) {
            // Если для данного RUC уже есть сохранённые значения
            const scoreActualElement = document.getElementById("score-actual");
            const scoreScaleElement = document.getElementById("score-actual-2");
            const puntajeCrediticioElement = document.getElementById("puntaje_crediticio-2");

            // Обновляем данные на странице
            if (scoreActualElement) {
                scoreActualElement.setAttribute("data-value", storedScore);
                scoreActualElement.textContent = storedScore;

                // Записываем значение в элемент с id="puntaje_crediticio"
                if (puntajeCrediticioElement) {
                    puntajeCrediticioElement.textContent = storedScore;
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
            localStorage.setItem(`creditScore_${ruc}`, creditScore);
            localStorage.setItem(`creditPercentage_${ruc}`, creditPercentage);

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

            // Записываем значение в элемент с id="puntaje_crediticio-2"
            const puntajeCrediticioElement = document.getElementById("puntaje_crediticio-2");
            if (puntajeCrediticioElement) {
                puntajeCrediticioElement.textContent = creditScore;
            }
        }
    } else {
        console.error("Не найден элемент с RUC!");
    }
});
