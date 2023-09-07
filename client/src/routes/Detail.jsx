import { useEffect, useState} from "react"
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//import { fetchPokemonDetails } from "../redux/actions";
import imageLoading from "../assets/images/Poké_Ball_icon.svg.png";
import { fetchPokemonDetails } from "../redux/actions";
 
const Detail = () => {
   const {pokemonName} = useParams();
   const [pokemonDetail, setPokemonDetail] = useState()
   //const [pokemones, setPokemones]= useState();

   const dispatch = useDispatch();

   useEffect(() => {
    dispatch(fetchPokemonDetails(pokemonName))
    .then((response)=>{
        const data  = response.payload
        setPokemonDetail(data)
    })
    .catch((error) => {
        console.error("Error al obtener detalles del pokemon", error)
    })
   }, [dispatch, pokemonName]);

if(!pokemonDetail) {
    return (
        <div>
            <img width="100" src={imageLoading} alt="loading..."/>
        </div>
    );
} else {
 return (
        <div>
            <h3>Soy el detail de:{pokemonName}</h3>
            <div>
                <h2>{pokemonDetail.name}</h2>
                <img src={pokemonDetail.img} alt="detail-pokemon"/>
            </div>
        </div>
    )   
}
    
};

export default Detail;