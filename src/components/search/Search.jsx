import { useState } from "react";
import { geo_url, geo_options } from "../../api";
import { AsyncPaginate } from 'react-select-async-paginate';


const Search = ( {onSearchChange} ) => {

    const [search, setSearch] = useState(null);

    const handleChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = (inputValue) => {

        return fetch(`${geo_url}?minPopulation=100000&namePrefix=${inputValue}`, geo_options)

        .then((response) => {
            if (!response.ok) {
                throw new Error("Can not fetch location");
            } else {
                return response.json()
            }
        })

        .then((response) => {
            return {
                options: response.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name} ${city.countryCode}`,
                    };
                })
            };
        })
        .catch((error) => console.log(`Error occured: ${error}`));
    };
    
    return(
        <AsyncPaginate 
            placeholder="Search city"
            debounceTimeout={1000}
            value={search}
            onChange={handleChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;