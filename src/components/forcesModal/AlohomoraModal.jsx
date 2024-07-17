import styles from "./AlohomoraModal.module.css";

export function AlohomoraModal({ pairsCount }) {
  return (
    <>
      <div
        className={`${pairsCount === 3 ? styles.alohomora3 : pairsCount === 6 ? styles.alohomora6 : styles.alohomora9}`}
      >
        <span>
          <b>Алохомора</b>
          <p>
            Открывается случайная<br></br>пара карт.
          </p>
        </span>
      </div>
    </>
  );
}
