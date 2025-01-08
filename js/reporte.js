document.addEventListener('DOMContentLoaded', function () {
        // Массив месяцев на испанском
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Установка текущего дня, месяца и года в id="reporte_date"
    const reportDate = document.getElementById("reporte_date");
    const today = new Date();
    const diaActual = today.getDate(); // Получаем день
    const mesActual = meses[today.getMonth()]; // Получаем месяц
    const anioActual = today.getFullYear(); // Получаем год

    if (reportDate) { // Проверка на существование элемента
        reportDate.textContent = `${diaActual} de ${mesActual} de ${anioActual}`;
    }



    // Получаем данные из LocalStorage
    const dni = localStorage.getItem("dni");
    const nombres = localStorage.getItem("nombres");
    const apellidoPaterno = localStorage.getItem("apellidoPaterno");
    const apellidoMaterno = localStorage.getItem("apellidoMaterno");

    console.log("DNI:", dni);  // Выводим данные в консоль для отладки
    console.log("Nombres:", nombres);
    console.log("Apellido Paterno:", apellidoPaterno);
    console.log("Apellido Materno:", apellidoMaterno);

    // Заполняем информацию на странице
    const nombresReporte = document.getElementById("nombres_reporte");
    const apellidoPaternoReporte = document.getElementById("apellidoPaterno_reporte");
    const apellidoMaternoReporte = document.getElementById("apellidoMaterno_reporte");
    const dniReporte = document.getElementById("dni_reporte");

    if (nombresReporte) nombresReporte.textContent = nombres;
    if (apellidoPaternoReporte) apellidoPaternoReporte.textContent = apellidoPaterno;
    if (apellidoMaternoReporte) apellidoMaternoReporte.textContent = apellidoMaterno;
    if (dniReporte) dniReporte.textContent = dni;
});
