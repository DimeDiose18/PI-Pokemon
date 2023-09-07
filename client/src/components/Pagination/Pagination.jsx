import styles from "./Pagination.module.css";
import arrow from "../../assets/images/circulo-de-flecha.png";
import { useEffect, useState } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
  onPageInputChange,
}) => {
  const [page, setPage] = useState();
  const [inputValue, setInputValue] = useState(currentPage.toString());

  useEffect(() => {
    setPage(currentPage);
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handlePreviusClick = () => {
    if (!isLoading && currentPage > 1) {
      onPageChange(Number(currentPage) - 1);;
    }
  };

  const handleNextClick = () => {
    if (!isLoading && currentPage < totalPages) {
      onPageChange(Number(currentPage) + 1);
    }
  };

  const handleSearchPage = (e) => {
    setInputValue(e.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter" && inputValue !== page.toString()) {
      onPageInputChange(inputValue);
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
        value={inputValue}
        onChange={handleSearchPage}
        onKeyDown={handleEnterKey}
        type="text"
        className={styles.input}
      />
      <p> de {totalPages}</p>
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
