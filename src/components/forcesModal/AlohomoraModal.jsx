import styles from "./AlohomoraModal.module.css";

export function AlohomoraModal() {
  return (
    <div className={styles.alohomora}>
      <span>
        <b>Алохомора</b>
        <p>
          Открывается случайная<br></br>пара карт.
        </p>
      </span>
    </div>
  );
}
