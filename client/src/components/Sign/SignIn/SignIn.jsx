import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../../redux/features/auth";
import styles from "../SignIn/signin.module.css";

export default function SignIn() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState(
    "поле ввода не может быть пустым"
  );
  const [password, setPassword] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(
    "поле ввода не может быть пустым"
  );
  const [formValid, setFormVAlid] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    let regEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(String(e.target.value).toLowerCase())) {
      setEmailError("неправильно введен емейл");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError("пароль должен быть длиннее 3 и меньше 8");
      if (!e.target.value) {
        setPasswordError("поле ввода не может быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    if (emailError || passwordError) {
      setFormVAlid(false);
    } else {
      setFormVAlid(true);
    }
  }, [emailError, passwordError]);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };


  const error = useSelector((state) => state.auth.error);

  const handleSubmit = () => {
    dispatch(login(email, password));
  };

  return (
    <div className={styles.gradient}>
      <div className={styles.login__box}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          {error}

          <div className={styles.user__box}>
            {emailDirty && emailError && (
              <div style={{ color: "red" }}>{emailError}</div>
            )}
            <input
              type="email"
              name="email"
              required=""
              value={email}
              placeholder="email"
              onChange={handleChangeEmail}
              onBlur={(e) => blurHandler(e)}
            />
          </div>

          <div className={styles.user__box}>
            {passwordDirty && passwordError && (
              <div style={{ color: "red" }}>{passwordError}</div>
            )}
            <input
              name="password"
              type="password"
              value={password}
              onChange={passwordHandler}
              required=""
              placeholder="password"
              onBlur={(e) => blurHandler(e)}
            />
          </div>

        <Link to='/'> <button
            onClick={handleSubmit}
            disabled={!formValid}
            className={styles.button5}
          >
            Вход
          </button></Link> 
        </form>
        {/* <span>У вас нет акаунта?</span> */}
        <div className={styles.homeButton}>
          <Link to="/signup" className={styles.a}>
            Регистрация
          </Link>
          <Link to="/" className={styles.a}>
            Главное меню
          </Link>
        </div>
      </div>
    </div>
  );
}
