function Search() {
    
    async function handleSearch(searchQuery) {
        const params = new URLSearchParams(searchQuery);
        const response = await fetch(`/search?${params.toString()}`);
        const data = await response.json();
        console.log(data);
    }
        

    return (
        <div>
            <div className="container">
                <SearchForm onSearch={handleSearch} />
            </div>
        </div>
    );
}