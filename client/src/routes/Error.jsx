import { useRouteError } from "react-router-dom";


const Error = () => {
    const error = useRouteError();
    return(
        <div>
            <h2>Error:</h2>
            {error.statusText || error.message}
        </div>
    )
}

export default Error;