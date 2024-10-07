import React, { useState } from "react";

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const clearSearch = () => {
        setSearchTerm('');
        onSearch('');
    }

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by facility or pollution name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={clearSearch}>Clear</button>
        </div>
    );
};