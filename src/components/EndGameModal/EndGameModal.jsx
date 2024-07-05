import styles from "./EndGameModal.module.css";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/userContext/UseUser";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";

export function EndGameModal({ isWon, isLeader, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const title = isWon ? (isLeader ? "Вы попали на Лидерборд!" : "Вы победили!") : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const { user, setUser } = useUser();

  const onInputName = event => {
    setUser(event.target.value);
  };

  return (
    <>
      {isLeader ? (
        <div className={styles.modalLeader}>
          <img className={styles.image} src={imgSrc} alt={imgAlt} />
          <h2 className={styles.title}>{title}</h2>
          <input
            className={styles.userName}
            type="text"
            placeholder="Пользователь"
            value={user}
            onChange={onInputName}
            autoFocus=""
          />
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
