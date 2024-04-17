import styles from './football.module.css';

export default function FootBall() {
    return (
        <>
            <div className={styles.pitch}>
                <div className={styles.goalkeeperArea}>
                    <div className={`${styles.goalkeeper} ${styles.position}`}></div>
                </div>
                <div className={styles.defenderArea}>
                    <div className={styles.defenderArea}>
                        <div className={`${styles.defender} ${styles.position} ${styles.inlineBlock}`}><input /></div>
                        <div className={`${styles.defender} ${styles.position} ${styles.inlineBlock}`}><input /></div>
                        <div className={`${styles.defender} ${styles.position} ${styles.inlineBlock}`}><input /></div>
                        <div className={`${styles.defender} ${styles.position} ${styles.inlineBlock}`}><input /></div>
                    </div>
                </div>
                <div className={styles.midfielderArea}>
                    <div className={`${styles.midfielder} ${styles.position} ${styles.inlineBlock}` }></div>
                    <div className={`${styles.midfielder} ${styles.position} ${styles.inlineBlock}`}></div>
                    <div className={`${styles.midfielder} ${styles.position} ${styles.inlineBlock}`}></div>
                </div>
                <div className={styles.forwardArea}>
                    <div className={`${styles.forward} ${styles.position} ${styles.inlineBlock}`}></div>
                    <div className={`${styles.forward} ${styles.position} ${styles.inlineBlock}`}></div>
                    <div className={`${styles.forward} ${styles.position} ${styles.inlineBlock}`}></div>
                </div>
            </div>
            <div>
                <button>등록!</button>
            </div>

        </>
    )
}