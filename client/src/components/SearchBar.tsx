import React, {useState} from "react";
import {
    fetchFacilitiesWithPollutionAsync,
    fetchFacilitiesWithPollutionByNameAsync
} from "../features/pollution/pollutionSlice";
import {useAppDispatch} from "../app/store/configureStore";

export const SearchBar = () => {
    const dispatch = useAppDispatch();

    const clearSearch = async () => {
        setSearchTerm('');
        await dispatch(fetchFacilitiesWithPollutionAsync());
    }

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        if (searchTerm.trim()) {
            await dispatch(fetchFacilitiesWithPollutionByNameAsync(searchTerm));
        } else {
            await dispatch(fetchFacilitiesWithPollutionAsync());
        }
    };
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by facilitiy name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={clearSearch}>Clear</button>
        </div>
    )
}