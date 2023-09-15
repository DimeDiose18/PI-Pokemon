import styles from "./Pagination.module.css";
import arrow from "../../assets/images/circulo-de-flecha.png";
import { useRef } from "react";

const  Pagination = ({ currentPage, totalPages, onPageChange, isLoading }) => {
  const input = useRef();

 
  const handlePreviusClick = () => {
    if (!isLoading && currentPage > 1) {
      input.current.value = Number(currentPage) - 1;
      onPageChange(Number(currentPage) - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLoading && currentPage < totalPages) {
      input.current.value = Number(currentPage) + 1;
      onPageChange(Number(currentPage) + 1);
    }
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      onPageChange(event.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.buttonPrevius}
        onClick={handlePreviusClick}
        disabled={isLoading || currentPage === 1}
      >
        <img src={arrow} className={styles.prevImg} alt="buttonPrevius" />
      </button>
      <input
        defaultValue={currentPage}
        ref={input}
        onKeyDown={handleEnterKey}
        type="text"
        className={styles.input}
      />
      <p className={styles.p}> de {totalPages}</p>
      <button
        className={styles.buttonNext}
        onClick={handleNextClick}
        disabled={isLoading || currentPage === totalPages}
      >
        <img src={arrow} className={styles.nextImg} alt="buttonNext" />
      </button>
    </div>
  );
};

export default Pagination;
