import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loadTrainers } from '../../redux/features/trainer'
import logo1 from "../../assets/logog.png";
import styles from '../Trainer/trainer.module.css'
import { loadCartItems } from '../../redux/features/cart';
import { trainerAddInCart} from '../../redux/features/profile'

function Trainer() {
  const trainers = useSelector((state) => state.trainerReducer.trainers)
  const cartItems = useSelector((state) => state.cartReducer.cartItems._id);
  const cartTrainer = useSelector(state => state.cartReducer.cartItems.trainer)
  const load = useSelector(state => state.cartReducer.loading)
  const profileId = useSelector((state) => state.auth.id)
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=> {
    dispatch(loadCartItems(profileId))
  }, [dispatch, profileId])

  const handleClickTrainers = (trainer) => {
      dispatch(trainerAddInCart(trainer, cartItems))
  }

  useEffect(() => {
    dispatch(loadTrainers())
  }, [dispatch])


    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.header_nav}>
              <div className={styles.header_logo}>
                <Link to='/'><img className={styles.header_logo} src={logo1} alt=""/></Link>
              </div>
            </div>
          </div>
          <div className={styles.headerTitle}>
            <h2>Тренеры THE GYM которые будут вас обучать</h2>
          </div>
          <div className={styles.container_block}>
            {!load ? trainers.map((trainer) => {
              return (
                <div className={styles.cart} key={trainer._id}>
                  <div className={styles.block_cart}>
                    <div className={styles.image}>
                      <img
                        src={`http://localhost:5000/${trainer.img}`}
                        alt=""/>
                    </div>
                    <div className={styles.info}>
                      <h3>Имя: {trainer.name}</h3>
                      <p>
                        {trainer.description}
                      </p>
                      <p className={styles.star}>
                        ★ {trainer.rating}
                      </p>
                    </div>
                    {cartTrainer !== trainer._id ?
                    <div className={styles.button }>
                      <button
                        onClick={() =>token ? handleClickTrainers(trainer._id) : navigate('/signin')}>Добавить
                        тренера
                      </button>
                    </div> : null}
                  </div>
                </div>
              )
            }) : null}
          </div>
        </div>
      </div>
    )
}
export default Trainer;