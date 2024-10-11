import styles from "./creditCard.module.css";
import logo from "../../assets/logo.jpg";

const CreditCard = ({ cardNumber, cardHolderName }) => {
    return (
        <div className={styles.creditCard}>
            <div className={styles.creditCard__logo}>
                <img className={styles.logo} src={logo} alt="logo" />
                <div className={styles.creditCard__title}>IELTSZONE</div>
            </div>
            <div className={styles.cardNumber}>{cardNumber}</div>
            <div className={styles.cardHolderName}>{cardHolderName}</div>
        </div>
    );
};

export default CreditCard;
