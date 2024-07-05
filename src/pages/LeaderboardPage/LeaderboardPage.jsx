import styles from "./LeaderboardPage.module.css";
import { useEffect } from "react";
import { useLeaders } from "../../contexts/leaderContext/UseLeaders";
import { getLeaders } from "../../api";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";

export const LeaderboardPage = () => {
  const { leaders, setLeaders } = useLeaders();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLeaders();
        // Отсортируем результаты лидерборда в порядке возрастания времени
        response.leaders.sort((a, b) => a.time - b.time);
        // Если результатаов в лидерборде более 10, ограничим просмотр этим количеством
        const lenLeaders = response.leaders.length < 10 ? response.leaders.length : 10;
        const sortLeaders = response.leaders.slice(0, lenLeaders);
        setLeaders(sortLeaders);
      } catch (error) {
        console.error(error);
        throw new Error("Ошибка при получении списка лидеров");
      }
    };
    fetchData();
  }, [setLeaders]);

  function getTimeViewer(innerSeconds) {
    const minutes = Math.floor(innerSeconds / 60);
    const seconds = innerSeconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    const viewedTime = `${formattedMinutes}:${formattedSeconds}`;
    return viewedTime;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.title}>Лидерборд</span>
          <Link to="/">
            <Button>Начать игру</Button>
          </Link>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span className={styles.userPosition}>Позиция</span>
            <span className={styles.userName}>Пользователь</span>
            <span className={styles.emptySpace}></span>
            <span className={styles.userTime}>Время</span>
          </div>
          {leaders.map((sortLeader, index) => {
            return (
              <div key={index} className={styles.tableBody}>
                <span className={styles.userPosition}># {index + 1}</span>
                <span className={styles.userName}>{sortLeader.name}</span>
                <span className={styles.emptySpace}></span>
                <span className={styles.userTime}>{getTimeViewer(sortLeader.time)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
