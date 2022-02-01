import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addAbonements } from "../../redux/features/subscription"
import styles from './admin.module.css'

const Subscription = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [text, setText] = useState("");

  const handleName = (e) => {
    setName(e.target.value)
  };
  const handleImg = (e) => {
    setImg(e.target.files[0])
  };
  const handlePrice = (e) => {
    setPrice(e.target.value)
  }
  const handleTime = (e) => {
    setTime(e.target.value)
  }
  const handleText = (e) => {
    setText(e.target.value)
  }
  const handleClick = () => {
    dispatch(addAbonements(name, img, price, time, text))
    setName("");
    setImg("")
    setPrice("");
    setTime("");
    setText("");
  }


  return (
    <div className={styles.inputDiv}>
      <div className={styles.inputs}>
        <input onChange={handleName} type="text" value={name} placeholder="Название" />
        <input onChange={(e) => handleImg(e)} type="file" placeholder="Фото" />
        <input onChange={handlePrice} type="text" value={price} placeholder="Цена" />
        <input onChange={handleTime} type="text" value={time} placeholder="Продолжительность" />
        <input onChange={handleText} type="text" value={text} placeholder="Описание" />
        <button onClick={handleClick}>Отправить</button>
      </div>
    </div>
  );
};

export default Subscription;
