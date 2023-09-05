import { useParams } from "react-router-dom";

const Detail = () => {
   const { pokemonsid } = useParams();
    return (
        <div>
            <h3>Soy el detail {pokemonsid}</h3>
        </div>
    )
};

export default Detail;