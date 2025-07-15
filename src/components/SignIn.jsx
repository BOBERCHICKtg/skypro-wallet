import React from "react";
import "./style.css";

const SignIn = () => {
  return (
    <article class="signPage">
      <h1 class="signPage-title">Вход</h1>
      <div class="signPage-box">
        <input class="signPage-input" placeholder="Имя" type="text" />
        <input class="signPage-input" placeholder="Пароль" type="text" />
      </div>
      <button class="signPage-button">Войти</button>
      <div class="signPage-box-text">
        <p class="signPage-text">Нужно зарегистрироваться?</p>
        <a class="signPage-link" href="">
          Регистрируйся здесь
        </a>
      </div>
    </article>
  );
};

export default SignIn;
