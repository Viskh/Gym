import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../../redux/features/auth";
import styles from "../SignUp/signup.module.css";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState(
    "поле ввода не может быть пустым"
  );
  const [passwordError, setPasswordError] = useState(
    "поле ввода не может быть пустым"
  );
  const [formValid, setFormVAlid] = useState(false);

  const [name, setName] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [nameError, setNameError] = useState("поле ввода не может быть пустым");

  const [weight, setWeight] = useState("");
  const [weightDirty, setWeightDirty] = useState(false);
  const [weightError, setWeightError] = useState(
    "поле ввода не может быть пустым"
  );

  const [tel, setTel] = useState("");
  const [telDirty, setTelDirty] = useState(false);
  const [telError, setTelError] = useState("поле ввода не может быть пустым");

  const [age, setAge] = useState("");
  const [ageDirty, setAgeDirty] = useState(false);
  const [ageError, setAgeError] = useState("поле ввода не может быть пустым");

  const [text, setText] = useState("");
  const [textDirty, setTextDirty] = useState(false);
  const [textError, setTextError] = useState("поле ввода не может быть пустым");

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

  const textHandler = (e) => {
    setText(e.target.value);
    if (!e.target.value) {
      setTextError("поле ввода не может быть пустым");
    } else {
      setTextError("");
    }
  };

  const telHandler = (e) => {
    setTel(e.target.value);
    if (!e.target.value) {
      setTelError("поле ввода не может быть пустым");
    } else {
      setTelError("");
    }
  };

  const ageHandler = (e) => {
    setAge(e.target.value);
    if (!e.target.value) {
      setAgeError("поле ввода не может быть пустым");
    } else {
      setAgeError("");
    }
  };

  const nameHandler = (e) => {
    setName(e.target.value);
    if (!e.target.value) {
      setNameError("поле ввода не может быть пустым");
    } else {
      setNameError("");
    }
  };

  const weightHandler = (e) => {
    setWeight(e.target.value);
    if (!e.target.value) {
      setWeightError("поле ввода не может быть пустым");
    } else {
      setWeightError("");
    }
  };

  useEffect(() => {
    if (emailError || passwordError) {
      setFormVAlid(false);
    } else {
      setFormVAlid(true);
    }
  }, [emailError, passwordError]);

  const handleSubmit = () => {
    dispatch(createUser(email, password, name, weight));
    navigate("/signin");
  };

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

  const blurName = (e) => {
    switch (e.target.name) {
      case "Name":
        setNameDirty(true);
        break;
      case "weight":
        setWeightDirty(true);
        break;
      default:
        break;
    }
  };

  const blurTel = (e) => {
    switch (e.target.name) {
      case "Tel":
        setTelDirty(true);
        break;
      case "age":
        setAgeDirty(true);
        break;
      case "text":
        setTextDirty(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.gradient}>
      <div className={styles.login__box}>
        <h2>регистрация</h2>
        <div>
          {error}
          {emailDirty && emailError && (
            <div style={{ color: "red" }}>{emailError}</div>
          )}
          <div className={styles.user__box}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => handleChangeEmail(e)}
              onBlur={(e) => blurHandler(e)}
              name="email"
            />
          </div>

          {passwordDirty && passwordError && (
            <div style={{ color: "red" }}>{passwordError}</div>
          )}
          <div className={styles.user__box}>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => passwordHandler(e)}
              onBlur={(e) => blurHandler(e)}
              name="password"
            />
          </div>

          {nameDirty && nameError && (
            <div style={{ color: "red" }}>{nameError}</div>
          )}
          <div className={styles.user__box}>
            <input
              onBlur={(e) => blurName(e)}
              name="Name"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => nameHandler(e)}
            />
          </div>

          {weightDirty && weightError && (
            <div style={{ color: "red" }}>{weightError}</div>
          )}
          <div className={styles.user__box}>
            <input
              onBlur={(e) => blurName(e)}
              name="weight"
              type="number"
              placeholder="weight"
              value={weight}
              onChange={(e) => weightHandler(e)}
            />
          </div>

          {ageDirty && ageError && (
            <div style={{ color: "red" }}>{ageError}</div>
          )}
          <div className={styles.user__box}>
            <input
              onBlur={(e) => blurTel(e)}
              name="age"
              type="number"
              placeholder="age"
              value={age}
              onChange={(e) => ageHandler(e)}
            />
          </div>

          {textDirty && textError && (
            <div style={{ color: "red" }}>{textError}</div>
          )}
          <div className={styles.user__box}>
            <input
              onBlur={(e) => blurTel(e)}
              name="text"
              type="text"
              placeholder="purpose of training"
              value={text}
              onChange={(e) => textHandler(e)}
            />
          </div>

          {telDirty && telError && (
            <div style={{ color: "red" }}>{telError}</div>
          )}
          <div className={styles.user__box}>
            <input
              onBlur={(e) => blurTel(e)}
              name="Tel"
              type="tel"
              placeholder="telephone"
              id="phone"
              value={tel}
              onChange={(e) => telHandler(e)}
            />
          </div>

          <Link to="/signin">
            {" "}
            <button
              onClick={handleSubmit}
              disabled={!formValid}
              className={styles.button5}
            >
              зарегистрироваться
            </button>
          </Link>
        </div>
        <div className={styles.main}>
          <Link to="/" className={styles.a}>
            Главное меню
          </Link>
        </div>
        <div className={styles.main}>
          <Link to="/signin" className={styles.a}>
            Вход
          </Link>
        </div>
      </div>
    </div>
  );
}
