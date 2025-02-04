import styles from "./PopupDeleteTask.module.css";

export const PopupDeleteTask = ({ handleDeleteTask, closePopup }) => (
  <div className={styles["popup__content"]}>
    <h2 className={styles["popup__title"]}>Подтвердите удаление</h2>
    <div className={styles["popup__buttons"]}>
      <button className={styles.confirm} onClick={handleDeleteTask}>
        Подтверждаю
      </button>
      <button className={styles.cancel} onClick={closePopup}>
        Отмена
      </button>
    </div>
  </div>
);
