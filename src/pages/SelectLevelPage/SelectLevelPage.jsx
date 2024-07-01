import { useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useState } from "react";
import { useEasyMode } from "../../contexts/easyModeContext/UseEasyMode";

export function SelectLevelPage() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate();
  const { isEasyMode, setIsEasyMode } = useEasyMode();

  const handleEasyModeChange = event => {
    setIsEasyMode(event.target.checked);
  };

  const arrLevel = [3, 6, 9];

  const handleCheckboxChange = level => {
    setSelectedLevel(level);
  };

  const handleStartClick = () => {
    if (selectedLevel !== null) {
      navigate(`/game/${selectedLevel}`);
    } else {
      alert("Нужно выбрать уровень");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          {arrLevel.map((level, index) => (
            <li className={`${styles.level} ${selectedLevel === level ? styles.selected : ""}`} key={index}>
              <label className={styles.checkboxButton}>
                <input
                  className={styles.selLevel}
                  type="checkbox"
                  checked={selectedLevel === level}
                  onChange={() => handleCheckboxChange(level)}
                />
                <span>{index + 1}</span>
              </label>
            </li>
          ))}
        </ul>
        <label>
          <input type="checkbox" onChange={handleEasyModeChange} checked={isEasyMode} />
          <span className={styles.easyMode}> Легкий режим</span>
        </label>
        <button className={styles.buttonStart} onClick={handleStartClick}>
          Старт
        </button>
      </div>
    </div>
  );
}
