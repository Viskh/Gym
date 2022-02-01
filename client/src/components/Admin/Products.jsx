import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from './admin.module.css'
import { addProduct } from "../../redux/features/shop";


const Products = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
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
  const handleWeight = (e) => {
    setWeight(e.target.value)
  }
  const handleText = (e) => {
    setText(e.target.value)
  }
  const handleClick = () => {
    dispatch(addProduct(name, img, price, weight, text))
    setName("");
    setImg("")
    setPrice("");
    setWeight("");
    setText("");
  }


  return (
    <div className={styles.inputDiv}>
      <div className={styles.inputs}>
        <input onChange={handleName} type="text" value={name} placeholder="Название" />
        <input onChange={(e) => handleImg(e)} type="file" placeholder="Фото" />
        <input onChange={handlePrice} type="text" value={price} placeholder="Цена" />
        <input onChange={handleWeight} type="text" value={weight} placeholder="Вес упаковки" />
        <input onChange={handleText} type="text" value={text} placeholder="Описание" />
        <button onClick={handleClick}>Отправить</button>
      </div>
    </div>
  );
};

export default Products;
