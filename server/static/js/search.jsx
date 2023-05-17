function Search() {

    const [results, setResults] = React.useState([]);


    return (
        <div>
            <div className="container">
                <SearchForm />
            </div>
        </div>
    );
}