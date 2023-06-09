const { useState, useEffect } = React;

function Joke() {
    const [joke, setJoke] = useState(null);
  
    useEffect(() => {
      async function fetchJoke() {
        const response = await fetch('/joke');
        const data = await response.json();
        setJoke(data.joke);
      }
  
      fetchJoke();
    }, []);
  
    return (
      <Typography
        variant="h4"
        style={{
          fontFamily: 'Caveat, cursive',
          fontSize: '24px',
          fontStyle: 'italic',
        }}
      >
        {joke}
      </Typography>
    );
  }