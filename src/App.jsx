import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate
} from "react-router-dom";
import "./style.css";
import Analysis from "./components/Analysis";

// Компонент страницы расходов
function ExpensesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expenses, setExpenses] = useState(() => {
    // Загрузка данных из localStorage при инициализации
    try {
      const savedExpenses = localStorage.getItem("expenses");
      return savedExpenses
        ? JSON.parse(savedExpenses)
        : [
            {
              id: 1,
              description: "Пятерочка",
              category: "Еда",
              date: "03.07.2024",
              amount: "3 500 ₽",
            },
          ];
    } catch (error) {
      console.error("Ошибка при чтении из localStorage:", error);
      return [
        {
          id: 1,
          description: "Пятерочка",
          category: "Еда",
          date: "03.07.2024",
          amount: "3 500 ₽",
        },
      ];
    }
  });

  const [newExpense, setNewExpense] = useState({
    description: "",
    category: "",
    date: "",
    amount: "",
  });

  const [formValid, setFormValid] = useState(false);
  const [nextId, setNextId] = useState(() => {
    // Загрузка следующего ID из localStorage
    try {
      const savedNextId = localStorage.getItem("nextId");
      return savedNextId ? parseInt(savedNextId) : 2;
    } catch (error) {
      console.error("Ошибка при чтении nextId из localStorage:", error);
      return 2;
    }
  });

  const navigate = useNavigate();

  // Сохранение данных в localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem("expenses", JSON.stringify(expenses));
      localStorage.setItem("nextId", nextId.toString());
    } catch (error) {
      console.error("Ошибка при сохранении в localStorage:", error);
    }
  }, [expenses, nextId]);

  const selectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setNewExpense({ ...newExpense, category: categoryName });
  };

  const validateInput = (input) => {
    if (input.value.trim() !== "") {
      if (input.type === "number" && parseFloat(input.value) <= 0) {
        input.classList.remove("valid");
        return false;
      }
      input.classList.add("valid");
      return true;
    } else {
      input.classList.remove("valid");
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
    validateInput(e.target);
  };

  const checkFormValidity = () => {
    return (
      newExpense.description.trim() !== "" &&
      newExpense.category !== "" &&
      newExpense.date !== "" &&
      newExpense.amount !== "" &&
      parseFloat(newExpense.amount) > 0
    );
  };

  const addNewExpense = (e) => {
    e.preventDefault();
    if (!checkFormValidity()) return;

    const amountValue = parseFloat(newExpense.amount);
    const formattedAmount = isNaN(amountValue)
      ? "0 ₽"
      : `${amountValue.toLocaleString("ru-RU")} ₽`;

    const dateObj = new Date(newExpense.date);
    const formattedDate = isNaN(dateObj.getTime())
      ? new Date().toLocaleDateString("ru-RU")
      : dateObj.toLocaleDateString("ru-RU");

    const expenseToAdd = {
      id: nextId,
      description: newExpense.description,
      category: newExpense.category,
      date: formattedDate,
      amount: formattedAmount,
    };

    setExpenses([...expenses, expenseToAdd]);
    setNextId(nextId + 1);

    // Сброс формы
    setNewExpense({
      description: "",
      category: "",
      date: "",
      amount: "",
    });
    setSelectedCategory(null);

    // Сброс классов валидации
    document.querySelectorAll(".expenses-new-input").forEach((input) => {
      input.classList.remove("valid");
    });
    document.querySelectorAll(".expenses-new-category-text").forEach((el) => {
      el.classList.remove("selected");
    });
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  useEffect(() => {
    setFormValid(checkFormValidity());
  }, [newExpense]);

  return (
    <>
      <header className="header">
        <img className="header-img" src="img/Vector (18).svg" alt="" />
        <div className="header-box">
          <Link className="header-box-link" to="/" aria-current="page">
            Мои расходы
          </Link>
          <Link className="header-box-link" to="/analysis" aria-current="page">
            Анализ расходов
          </Link>
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
          {expenses.map((expense) => (
            <div className="expenses-box" key={expense.id}>
              <p className="expenses-box-text">{expense.description}</p>
              <p className="expenses-box-text">{expense.category}</p>
              <p className="expenses-box-text">{expense.date}</p>
              <p className="expenses-box-text">{expense.amount}</p>
              <button
                className="delete-button"
                onClick={() => deleteExpense(expense.id)}
                aria-label="Удалить расход"
              >
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
              </button>
            </div>
          ))}
        </div>
        <div className="expenses-new">
          <h3 className="expenses-title">Новый расход</h3>
          <form onSubmit={addNewExpense}>
            <p className="expenses-new-text">Описание</p>
            <input
              className="expenses-new-input"
              name="description"
              placeholder="Введите описание"
              type="text"
              value={newExpense.description}
              onChange={handleInputChange}
              onBlur={(e) => validateInput(e.target)}
              required
            />
            <p className="expenses-new-text">Категория</p>
            <div className="expenses-new-box">
              {[
                "Еда",
                "Транспорт",
                "Жилье",
                "Развлечения",
                "Образование",
                "Другое",
              ].map((category) => (
                <div className="expenses-new-category" key={category}>
                  <b></b>
                  <p
                    className={`expenses-new-category-text ${
                      selectedCategory === category ? "selected" : ""
                    }`}
                    onClick={() => selectCategory(category)}
                  >
                    {category}
                  </p>
                </div>
              ))}
            </div>
            <p className="expenses-new-text">Дата</p>
            <input
              className="expenses-new-input"
              name="date"
              placeholder="Введите дату"
              type="date"
              value={newExpense.date}
              onChange={handleInputChange}
              onBlur={(e) => validateInput(e.target)}
              required
            />
            <p className="expenses-new-text">Сумма</p>
            <input
              className="expenses-new-input"
              name="amount"
              placeholder="Введите сумму"
              type="number"
              min="1"
              step="0.01"
              value={newExpense.amount}
              onChange={handleInputChange}
              onBlur={(e) => validateInput(e.target)}
              required
            />
            <button
              className="expenses-new-button"
              type="submit"
              disabled={!formValid}
            >
              Добавить новый расход
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// Главный компонент приложения с роутингом
function App() {
  return (
    <Router>
      <Routes>
        {/* Основной маршрут */}
        <Route path="/" element={<ExpensesPage />} />

        {/* Маршрут для анализа */}
        <Route path="/analysis" element={<Analysis />} />

        {/* Редирект для старых ссылок */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />

        {/* Запасной маршрут (404) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
