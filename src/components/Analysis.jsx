import { useState } from "react";
import "../style.css";

const Analysis = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectionMode, setSelectionMode] = useState("day"); // 'day', 'week', 'month'
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  // Получение количества дней в месяце
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Получение дня недели для первого дня месяца
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Выбор даты/периода
  const handleDateSelect = (date) => {
    if (selectionMode === "day") {
      setSelectedDates([date]);
    } else if (selectionMode === "week") {
      const dayOfWeek = new Date(currentYear, currentMonth, date).getDay();
      const weekStart = date - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      const weekDates = [];

      for (let i = 0; i < 7; i++) {
        const day = weekStart + i;
        if (day > 0 && day <= getDaysInMonth(currentMonth, currentYear)) {
          weekDates.push(day);
        }
      }

      setSelectedDates(weekDates);
    } else if (selectionMode === "month") {
      const daysInMonth = getDaysInMonth(currentMonth, currentYear);
      const monthDates = [];

      for (let i = 1; i <= daysInMonth; i++) {
        monthDates.push(i);
      }

      setSelectedDates(monthDates);
    }
  };

  // Проверка, выбрана ли дата
  const isDateSelected = (date) => {
    return selectedDates.includes(date);
  };

  // Переключение между месяцами
  const changeMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
    setSelectedDates([]);
  };

  // Генерация календаря
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Дни текущего месяца
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div
          key={`day-${i}`}
          className={`calendar-day ${isDateSelected(i) ? "selected" : ""}`}
          onClick={() => handleDateSelect(i)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  // Форматирование периода для отображения
  const getSelectedPeriodText = () => {
    if (selectedDates.length === 0) return "Выберите период";

    const monthName = months[currentMonth];
    const year = currentYear;

    if (selectionMode === "day") {
      return `${selectedDates[0]} ${monthName} ${year}`;
    } else if (selectionMode === "week") {
      const start = Math.min(...selectedDates);
      const end = Math.max(...selectedDates);
      return `${start}-${end} ${monthName} ${year}`;
    } else {
      return `Весь ${monthName} ${year}`;
    }
  };

  return (
    <div>
      <header className="header">
        <img className="header-img" src="img/Vector (18).svg" alt="" />
        <div className="header-box">
          <a className="header-box-link" href="index.html" aria-current="page">
            Мои расходы
          </a>
          <a
            className="header-box-link"
            href="analysis.html"
            aria-current="page"
          >
            Анализ расходов
          </a>
        </div>
        <button className="button-header">Выйти</button>
      </header>

      <h1 className="title">Анализ расходов</h1>

      <div className="period-selector">
        <button
          className={`period-button ${selectionMode === "day" ? "active" : ""}`}
          onClick={() => setSelectionMode("day")}
        >
          День
        </button>
        <button
          className={`period-button ${selectionMode === "week" ? "active" : ""}`}
          onClick={() => setSelectionMode("week")}
        >
          Неделя
        </button>
        <button
          className={`period-button ${selectionMode === "month" ? "active" : ""}`}
          onClick={() => setSelectionMode("month")}
        >
          Месяц
        </button>
      </div>

      <div className="expenses">
        <div className="calendar">
          <div className="calendar-header">
            <button onClick={() => changeMonth("prev")}>&lt;</button>
            <h2>
              {months[currentMonth]} {currentYear}
            </h2>
            <button onClick={() => changeMonth("next")}>&gt;</button>
          </div>

          <div className="calendar-days">
            <p>Пн</p>
            <p>Вт</p>
            <p>Ср</p>
            <p>Чт</p>
            <p>Пт</p>
            <p>Сб</p>
            <p>Вс</p>
          </div>

          <div className="calendar-grid">{renderCalendar()}</div>
        </div>

        <div className="chart">
          <div className="chart-price">
            <h4 className="chart-price-title">
              {analyticsData.total.toLocaleString("ru-RU")} ₽
            </h4>
            <p className="chart-price-text">
              Расходы за <b>{getSelectedPeriodText()}</b>
            </p>
          </div>

          <div className="chart-img">
            {analyticsData.categories.length > 0 ? (
              analyticsData.categories.map((item, index) => (
                <div className="chart-img-name" key={index}>
                  <p className="chart-img-name--text">{item.formattedAmount}</p>
                  <div
                    style={{
                      maxWidth: "94px",
                      height: `${item.height}px`,
                      background: categoryColors[item.category] || "#ccc",
                    }}
                    className="chart-img-name--analytics"
                  ></div>
                  <p className="chart-img-name--miniText">
                    {item.category} ({item.percentage}%)
                  </p>
                </div>
              ))
            ) : (
              <p className="no-data">Нет данных за выбранный период</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
