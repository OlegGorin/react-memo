import styles from "./LeaderboardPage.module.css";
import { useEffect } from "react";
import { useLeaders } from "../../contexts/leaderContext/UseLeaders";
import { getLeaders } from "../../api";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import achiev1 from "../../icons/achievement1.svg";
import achiev1Non from "../../icons/achievement1Non.svg";
import achiev2 from "../../icons/achievement2.svg";
import achiev2Non from "../../icons/achievement2Non.svg";
import { useEasyMode } from "../../contexts/easyModeContext/UseEasyMode";

export const LeaderboardPage = () => {
  const { leaders, setLeaders } = useLeaders();
  const { setIsEasyMode, setForceEye, setForceCards } = useEasyMode();

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

  const handleStartGame = () => {
    setIsEasyMode(false);
    setForceEye(1);
    setForceCards(2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.title}>Лидерборд</span>
          <Link to="/">
            <Button className={styles.title} onClick={handleStartGame}>
              Начать игру
            </Button>
          </Link>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.boxTitle}>
              <div className={styles.position}>
                <span>Позиция</span>
              </div>
              <div className={styles.name}>
                <span>Пользователь</span>
              </div>
              <div className={styles.achievements}>
                <span>Достижения</span>
              </div>
              <div className={styles.time}>
                <span>Время</span>
              </div>
            </div>
          </div>
          {leaders.map((sortLeader, index) => {
            return (
              <div key={index} className={styles.tableBody}>
                <div className={styles.boxContent}>
                  <div className={styles.userPosition}>
                    <span># {index + 1}</span>
                  </div>
                  <div className={styles.userName}>
                    <span>{sortLeader.name}</span>
                  </div>
                  <div className={styles.blockAchiev}>
                    <div className={styles.boxAchievement}>
                      {/* <div className={styles.tooltip}>
                        <span className={styles.tooltiptext}>Игра пройдена в сложном режиме</span>
                        {sortLeader.achievements.includes(1) ? (
                          <img src={achiev1} alt="achiev1" />
                        ) : (
                          <img src={achiev1Non} alt="achiev1Non" />
                        )}
                      </div> */}
                      {sortLeader.achievements.includes(1) ? (
                        <div className={styles.tooltip}>
                          <span className={styles.tooltiptext}>Игра пройдена в сложном режиме</span>
                          <img src={achiev1} alt="achiev1" />
                        </div>
                      ) : (
                        <img src={achiev1Non} alt="achiev1Non" />
                      )}
                    </div>
                    <div className={styles.spaceAchiv}></div>
                    <div className={styles.boxAchievement}>
                      {sortLeader.achievements.includes(2) ? (
                        <div className={styles.tooltip2}>
                          <span className={styles.tooltiptext2}>
                            Игра пройдена<br></br>без супер-сил
                          </span>
                          <img src={achiev2} alt="achiev2" />
                        </div>
                      ) : (
                        <img src={achiev2Non} alt="achiev2Non" />
                      )}
                    </div>
                  </div>
                  <span className={styles.emptySpace}></span>
                  <div className={styles.userTime}>
                    <span>{getTimeViewer(sortLeader.time)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
