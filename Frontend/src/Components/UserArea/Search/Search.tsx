import { useParams } from "react-router-dom";
import "./Search.css";

function Search(): JSX.Element {

    const searchValue = useParams().searchValue
    return (
        <div className="Search">
            <h2>Search</h2>
        </div>
    );
}

export default Search;
