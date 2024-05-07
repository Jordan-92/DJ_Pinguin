// pages/search.tsx
"use client"
import { useState } from 'react';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://www.shazam.com/services/amapi/v1/catalog/BE/search?types=songs&term=eminem`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <h1>Search Page</h1>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <div>
                {searchResults.map((result: any, index: number) => (
                    <div key={index}>
                        <p>{result}</p>
                        <p>{result.title}</p>
                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;