import styles from '@/styles/linkBtn.module.css';

export default function LinkBtn({ btns }) {
  return (
    <ul className={styles.nav}>
      {btns.map((btn, idx) => {
        return (
          <li key={idx} onClick={btn.onClick} title={btn.title}>
            {btn.description}
          </li>
        );
      })}
    </ul>
  );
}
