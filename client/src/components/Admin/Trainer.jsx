import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTrainer } from "../../redux/features/trainer";
import styles from "./admin.module.css"

const AddTrainer = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [photo, setPhoto] = useState("");
  const [info, setInfo] = useState("");

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleRaiting = (e) => {
    setRating(e.target.value)
  }
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0])
  }
  const handleInfo = (e) => {
    setInfo(e.target.value)
  }

  const handleClick = () => {
    dispatch(addTrainer(name, rating, photo, info));
    setName("");
    setRating("");
    setPhoto("");
    setInfo("");
  };

  

  return (
    <div className={styles.inputDiv}>
      <div className={styles.inputs}>
        <input placeholder="Имя Фамилия" onChange={handleName} value={name} type="text" /> <br />
        <input placeholder="Рейтинг" onChange={handleRaiting} value={rating} type="text" /> <br />
        <input placeholder="Фото" onChange={(e) => handlePhoto(e)} type="file" /> <br />
        <input placeholder="Описание" onChange={handleInfo} value={info} type="text" /> <br />
        <button onClick={handleClick}>Отправить</button>
      </div>
    </div>
  );
};

export default AddTrainer;
