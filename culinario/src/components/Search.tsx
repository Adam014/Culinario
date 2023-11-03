import React from "react"

interface SearchProps {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ setSearchTerm }) => {

    return (
        <div className="search-recipe">
            <input placeholder="Search recipe, ingredient..." onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
    )
}

export default Search;