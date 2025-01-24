import styles from "./Navbar.module.css";

function Navbar() {
    return (
        <div className={styles.navbar}>
            <img src="https://placehold.co/800" className={styles.icon}/>
            <div className={styles.title}>
				PIXEL CRYPT
            </div>
            <button className={styles.about}>
				About
            </button>
        </div>
    )
}

export default Navbar;