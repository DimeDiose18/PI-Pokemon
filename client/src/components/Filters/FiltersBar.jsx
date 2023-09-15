import styles from "./FiltersBar.module.css";
import FilterIcon from "../../assets/images/filtrar.png";
import OrderIcon from "../../assets/images/ordenar.png";

const FiltersBar = ({ setSelectedType, allTypes, setSelectedOrder, selectedOrder }) => {
  
  const handleFilterType = (e) => {
    e.preventDefault();
    const selectedType = e.target.value;
    setSelectedType(selectedType);
  };

  const handleOrder = (e) => {
    const value = e.target.value;
    const name = e.target.name
    setSelectedOrder({...selectedOrder, [name]:value});
  };

  return (
    <div className={styles.containerMain}>
      <div className={styles.filters}>
        
        <label className={styles.titles}>
        <div className={styles.titleContain}>
          Filtrer For <img src={FilterIcon} alt="filterIcon" className={styles.iconFilter}/>
        </div>
        
          <select className={styles.selects}>
            <option value="" disabled selected hidden>
              Select your option
            </option>
            <option value="all-pokemons">All Pokemons</option>
            <option value="new-pokemons">New Pokemons</option>
          </select>
        </label>
        <label className={styles.titles}>
        <div className={styles.titleContain}>
         Types: 
        </div>
        
        <select
        className={styles.selects}
          onChange={(e) => {
            handleFilterType(e);
          }}
        >
          <option value="All">All</option>
          {allTypes?.map((type) => {
            return (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            );
          })}
        </select>
        </label>
        
      </div>
      <div className={styles.filters}>
        <label className={styles.titles}>
        <div className={styles.titleContain}>
         Order
          <img src={OrderIcon} alt="orderIcon" className={styles.iconOrder}/> 
        </div>
          <select name="order" 
          className={styles.selects}
          onChange={(e) => handleOrder(e)}>
            <option value="" disabled selected hidden>
              Select your option
            </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <label className={styles.titles}>
          BY:
          <div className={styles.containerForm}>
            <form style={{display: "grid"}} onChange={(e) => handleOrder(e)}>
            <label className={styles.inputRadio}>
              Name
              <input type="radio" value="name" name="typeOrder" />
            </label>
            <label className={styles.inputRadio}>
              Attack
              <input type="radio" value="attack" name="typeOrder" />
            </label>
          </form>
          </div>
          
        </label>
      </div>
    </div>
  );
};

export default FiltersBar;
