import React from "react";
import "./style.css";

const SignUp = () => {
  return (
    <article class="signPage">
      <h1 class="signPage-title">Регистрация</h1>
      <div class="signPage-box">
        <input class="signPage-input" placeholder="Имя" type="text" />
        <input class="signPage-input" placeholder="Эл. почта" type="text" />
        <input class="signPage-input" placeholder="Пароль" type="text" />
      </div>
      <button class="signPage-button">Зарегистрироваться</button>
      <div class="signPage-box-text">
        <p class="signPage-text">Уже есть аккаунт?</p>
        <a class="signPage-link" href="">
          Войдите здесь
        </a>
      </div>
    </article>
  );
};

export default SignUp;
