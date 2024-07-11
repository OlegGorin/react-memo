import styles from "./EndGameModal.module.css";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/userContext/UseUser";
import { useEasyMode } from "../../contexts/easyModeContext/UseEasyMode";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useState } from "react";
import { postLeader } from "../../api";

export function EndGameModal({ isWon, isLeader, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const { user, setUser } = useUser();
  const [setError] = useState(null);
  const [stateBtn, setStateBtn] = useState(true);
  const { isEasyMode, forceEye, forceCards } = useEasyMode();

  const title = isWon ? (isLeader ? "Вы попали на Лидерборд!" : "Вы победили!") : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const onInputName = event => {
    setUser(event.target.value);
  };

  const postUserLeaderboard = async () => {
    if (user.trim() === "") {
      alert("Введите имя пользователя");
    } else {
      setStateBtn(prev => !prev);

      const timeUser = gameDurationMinutes * 60 + gameDurationSeconds;
      const achievements = [];
      if (!isEasyMode) {
        if (forceEye === 1) {
          achievements.push(1);
        }
        if (forceCards === 2) {
          achievements.push(2);
        }
      } else {
        if (forceCards === 2) {
          achievements.push(2);
        }
      }
      try {
        return postLeader({ user, timeUser, achievements });
      } catch (error) {
        console.error(error.message);
        if (error.message === "Failed to fetch") {
          setError("Ошибка соединения");
          return;
        }
      }
    }
  };

  return (
    <>
      {isLeader ? (
        <div className={styles.modalLeader}>
          <img className={styles.image} src={imgSrc} alt={imgAlt} />
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.modalUser}>
            <input
              className={styles.userName}
              type="text"
              placeholder="Пользователь"
              value={user}
              onChange={onInputName}
              autoFocus=""
            />
            <button
              className={`${stateBtn ? styles.nameSave : styles.newNameSave}`}
              disabled={!stateBtn}
              onClick={postUserLeaderboard}
            >
              Сохранить
            </button>
          </div>
          <p className={styles.description}>Затраченное время:</p>
          <div className={styles.time}>
            {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
          </div>
          <Button onClick={onClick}>Играть снова</Button>
          <Link className={styles.goLeaderboard} to="/leaderboard">
            Перейти к лидерборду
          </Link>
        </div>
      ) : (
        <div className={styles.modal}>
          <img className={styles.image} src={imgSrc} alt={imgAlt} />
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>Затраченное время:</p>
          <div className={styles.time}>
            {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
          </div>
          <Button onClick={onClick}>Играть снова</Button>
          <Link className={styles.goLeaderboard} to="/leaderboard">
            Перейти к лидерборду
          </Link>
        </div>
      )}
    </>
  );
}
