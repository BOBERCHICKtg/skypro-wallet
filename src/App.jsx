import { useState } from "react";
import "./style.css";

function App() {
  const handleNavigation = (e) => {
    e.preventDefault(); // Отменяем стандартное поведение
    window.location.href = "/analysis.html"; // Или другая логика
  };

  return (
    <>
      <header className="header">
        <img className="header-img" src="img/Vector (18).svg" alt="" />
        <div className="header-box">
          <a className="header-box-link" href="/index.html" aria-current="page">
            Мои расходы
          </a>
          <a
            className="header-box-link"
            href="/analysis.html"
            onClick={handleNavigation}
            aria-current="page"
          >
            Анализ расходов
          </a>
        </div>
        <button className="button-header">Выйти</button>
      </header>
      <h1 className="title">Мои расходы</h1>
      <div className="expenses">
        <div className="expenses-left">
          <h2 className="expenses-title">Таблица расходов</h2>
          <div className="expenses-header">
            <p className="expenses-header-text">Описание</p>
            <p className="expenses-header-text">Категория</p>
            <p className="expenses-header-text">Дата</p>
            <p className="expenses-header-text">Сумма</p>
          </div>
          <div className="expenses-box">
            <p className="expenses-box-text">Пятерочка</p>
            <p className="expenses-box-text">Еда</p>
            <p className="expenses-box-text">03.07.2024</p>
            <p className="expenses-box-text">3 500 ₽</p>
            <b>
              <svg
                width="12.000000"
                height="12.000000"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <desc>Created with Pixso.</desc>
                <defs />
                <path
                  id="Vector"
                  d="M9.62 2.79L9.41 2.79L7.72 1.1C7.59 0.96 7.37 0.96 7.23 1.1C7.09 1.23 7.09 1.45 7.23 1.59L8.42 2.79L3.57 2.79L4.76 1.59C4.9 1.45 4.9 1.23 4.76 1.1C4.63 0.96 4.4 0.96 4.27 1.1L2.58 2.79L2.38 2.79C1.93 2.79 1 2.79 1 4.07C1 4.55 1.09 4.87 1.31 5.08C1.42 5.2 1.57 5.27 1.72 5.31C1.87 5.34 2.03 5.35 2.17 5.35L9.82 5.35C9.97 5.35 10.12 5.34 10.26 5.31C10.68 5.2 11 4.9 11 4.07C11 2.79 10.06 2.79 9.62 2.79Z"
                  fill="#999999"
                  fillOpacity="1.000000"
                  fillRule="nonzero"
                />
                <path
                  id="Vector"
                  d="M9.52 6L2.43 6C2.12 6 1.89 6.27 1.94 6.58L2.36 9.14C2.5 10.01 2.87 11 4.54 11L7.34 11C9.03 11 9.33 10.15 9.51 9.2L10.01 6.59C10.07 6.28 9.84 6 9.52 6ZM5.3 9.22C5.3 9.41 5.15 9.57 4.96 9.57C4.76 9.57 4.61 9.41 4.61 9.22L4.61 7.57C4.61 7.38 4.76 7.22 4.96 7.22C5.15 7.22 5.3 7.38 5.3 7.57L5.3 9.22ZM7.44 9.22C7.44 9.41 7.29 9.57 7.09 9.57C6.9 9.57 6.74 9.41 6.74 9.22L6.74 7.57C6.74 7.38 6.9 7.22 7.09 7.22C7.29 7.22 7.44 7.38 7.44 7.57L7.44 9.22Z"
                  fill="#999999"
                  fillOpacity="1.000000"
                  fillRule="nonzero"
                />
                <g opacity="0.000000" />
              </svg>
            </b>
          </div>
        </div>
        <div className="expenses-new">
          <h3 className="expenses-title">Новый расход</h3>
          <p className="expenses-new-text">Описание</p>
          <input
            className="expenses-new-input"
            placeholder="Введите описание"
            type="text"
            onInput="validateInput(this)"
          />
          <p className="expenses-new-text">Категория</p>
          <div className="expenses-new-box">
            <div className="expenses-new-category">
              <b></b>
              <p
                className="expenses-new-category-text"
                onClick="selectCategory(this)"
              >
                Еда
              </p>
            </div>
            <div className="expenses-new-category">
              <b></b>
              <p
                className="expenses-new-category-text"
                onClick="selectCategory(this)"
              >
                Транспорт
              </p>
            </div>
            <div className="expenses-new-category">
              <b></b>
              <p
                className="expenses-new-category-text"
                onClick="selectCategory(this)"
              >
                Жилье
              </p>
            </div>
            <div className="expenses-new-category">
              <b></b>
              <p
                className="expenses-new-category-text"
                onClick="selectCategory(this)"
              >
                Развлечения
              </p>
            </div>
            <div className="expenses-new-category">
              <b></b>
              <p
                className="expenses-new-category-text"
                onClick="selectCategory(this)"
              >
                Образование
              </p>
            </div>
            <div className="expenses-new-category">
              <b></b>
              <p
                className="expenses-new-category-text"
                onClick="selectCategory(this)"
              >
                Другое
              </p>
            </div>
          </div>
          <p className="expenses-new-text">Дата</p>
          <input
            className="expenses-new-input"
            placeholder="Введите дату"
            type="date"
            onInput="validateInput(this)"
          />
          <p className="expenses-new-text">Сумма</p>
          <input
            className="expenses-new-input"
            placeholder="Введите сумму"
            type="number"
            min="1"
            onInput="validateInput(this)"
          />
          <button className="expenses-new-button">Добавить новый расход</button>
        </div>
      </div>
    </>
  );
}

export default App;
