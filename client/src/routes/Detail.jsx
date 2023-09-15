import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import styles from "../components/Home/Detail.module.css";
import imageLoading from "../assets/images/Poké_Ball_icon.svg.png";
import { fetchPokemonDetails } from "../redux/actions";

const Detail = () => {
  const { pokemonName } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokemonDetails(pokemonName))
      .then((response) => {
        const data = response.payload;
        setPokemonDetail(data);
      })
      .catch((error) => {
        console.error("Error getting pokemon details", error);
      });
  }, [dispatch, pokemonName]);

  const handleBackHome = () => {
    setPokemonDetail();

  };

  if (!pokemonDetail) {
    return (
      <div className={styles.containerLoading}>
        <img
          className={styles.imageLoading}
          src={imageLoading}
          alt="loading..."
        />
      </div>
    );
  } else {
    return (
      <div className={styles.sideBarRight}>
        <Link onClick={handleBackHome} to={"/home"}>
          <button className={styles.buttonClose}>X</button>
        </Link>
        <div className={styles.containerID}>
          <h6>ID: {pokemonDetail.id}</h6>
        </div>
        <div className={styles.containerMain}>
          <div className={styles.containerTypes}>
            <h3 className={styles.titleType}>Types:</h3>
            {pokemonDetail.types.map((e) => (
              <div key={e.name} className={styles.typeDetail}>
                <p className={styles.pTypeDetail}>{e.name}</p>
                <img
                  src={e.image}
                  className={styles.imgTypeDetail}
                  alt="pokemon types"
                />
              </div>
            ))}
          </div>
          <div className={styles.pokemonName}>
            <h1>{pokemonDetail.name}</h1>
            <img
              className={styles.pokemonDetailImg}
              src={pokemonDetail.image ? pokemonDetail.image : pokemonDetail.altImage}
              alt="detail-pokemon"
            />
          </div>
          <div className={styles.containerSpecs}>
            <h3 className={styles.specs}>Height:</h3>
            <p>{pokemonDetail.height}</p>
            <h3 className={styles.specs}>Weight:</h3>
            <p>{pokemonDetail.weight}</p>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statsName}>
            <div className={styles.h2}>
              <h2>Stats:</h2>
            </div>
          </div>

          <div className={styles.statsContainer}>
            <div className={styles.statsUnit}>
              <p className={styles.pTittle}>HP:</p>
              <p>{pokemonDetail.hp}</p>
            </div>
            <div className={styles.statsUnit}>
              <p className={styles.pTittle}>Attack:</p>
              <p>{pokemonDetail.attack}</p>
            </div>
            <div className={styles.statsUnit}>
              <p className={styles.pTittle}>SpecialAttack:</p>
              <p>{pokemonDetail.specialAttack}</p>
            </div>
          </div>
          <div className={styles.statsContainer}>
            <div className={styles.statsUnit}>
              <p className={styles.pTittle}>Defense:</p>
              <p>{pokemonDetail.defense}</p>
            </div>
            <div className={styles.statsUnit}>
              <p className={styles.pTittle}>SpecialDefense:</p>
              <p>{pokemonDetail.specialDefense}</p>
            </div>
            <div className={styles.statsUnit}>
              <p className={styles.pTittle}>Speed:</p>
              <p>{pokemonDetail.speed}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Detail;
