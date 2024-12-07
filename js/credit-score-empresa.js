/* App */
$(document).ready(function () {
  // Шаги числовой анимации с разделителями
  var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');

  // Анимация чисел, использует значение из data-value
  $('[data-animate="count-out"]').each(function () {
      var thisValue = $(this).data('value'); // Получение значения data-value
      $(this).animateNumber({ number: thisValue, numberStep: comma_separator_number_step });
  });

  // Активация всплывающих подсказок
  $('[data-toggle="popover"]').popover();

  // Анимация шкалы с использованием переменных
  $('[data-animate="colorScale"]').each(function () {
      var thisValue = $(this).data('value'); // Получение значения data-value
      $(this).find('.scoreTick, .scoreArrow').css("left", thisValue + "%"); // Установка позиции
  });

  // Настройки для диаграмм "Donut" (круговая диаграмма)
  var Donutoptions = {
      segmentShowStroke: false,
      animation: true,
      animationEasing: 'linear',
      animationSteps: 20,
      onAnimationComplete: function () {
          this.showTooltip(this.segments, true);
      },
      tooltipEvents: [],
      showTooltips: true,
      tooltipTemplate: "<%if (label){%><%=label%>: <%}%>$<%= value %>",
      tooltipFillColor: "#404040",
      tooltipFontFamily: "'Open Sans',Helvetica,Arial, sans-serif"
  };

  // Генерация круговой диаграммы на основе данных в DOM
  $('[data-chart="doughnut"]').each(function () {
      var ct = $(this).get(0).getContext('2d');
      var chartId = $(this).get(0).id; // Получаем ID диаграммы
      var chartData = window["data" + chartId]; // Данные для диаграммы из переменной window

      // Проверяем существование данных перед созданием диаграммы
      if (chartData) {
          new Chart(ct).Doughnut(chartData, Donutoptions);
      } else {
          console.error("Данные для диаграммы с ID " + chartId + " не найдены.");
      }
  });

  // Логика работы с переменными ruc и razonSocial
  var ruc = localStorage.getItem("ruc"); // Получаем RUC из LocalStorage
  var razonSocial = localStorage.getItem("razonSocial"); // Получаем Razón Social из LocalStorage

  // Проверяем и обновляем элементы DOM
  if (ruc) {
      var rucElement = $('#ruc_reporte'); // Элемент для отображения RUC
      if (rucElement.length) {
          rucElement.text(ruc);
      }
  } else {
      console.error("RUC не найден в LocalStorage!");
  }

  if (razonSocial) {
      var razonElement = $('#razon_reporte'); // Элемент для отображения Razón Social
      if (razonElement.length) {
          razonElement.text(razonSocial);
      }
  } else {
      console.error("Razón Social не найдена в LocalStorage!");
  }
});
