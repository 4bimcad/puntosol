document.addEventListener('DOMContentLoaded', function () {
    // Массив месяцев на испанском
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Установка текущего дня, месяца и года в id="reporte_date"
    const reportDate = document.getElementById("reporte_date-2");
    const today = new Date();
    const diaActual = today.getDate(); // Получаем день
    const mesActual = meses[today.getMonth()]; // Получаем месяц
    const anioActual = today.getFullYear(); // Получаем год

    if (reportDate) { // Проверка на существование элемента
        reportDate.textContent = `${diaActual} de ${mesActual} de ${anioActual}`;
    }

    // Получаем данные из LocalStorage
    const ruc = localStorage.getItem("ruc");
    const razonSocial = localStorage.getItem("razonSocial");

    console.log("RUC:", ruc);  // Выводим данные в консоль для отладки
    console.log("Razón Social:", razonSocial);

    // Заполняем информацию на странице
    const rucReporte = document.getElementById("ruc_reporte");
    const razonSocialReporte = document.getElementById("razonSocial_reporte");

    if (rucReporte) rucReporte.textContent = ruc;
    if (razonSocialReporte) razonSocialReporte.textContent = razonSocial;
});
