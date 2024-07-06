'use client';

import { useEffect } from 'react';

const Home = () => {

    async function fetchLandingRecipes() {
        const response = await fetch("http://localhost:5000/landing");
        const data = await response.json();
        const { recipes } = await data;
        console.log(recipes)
    }


    useEffect(() => {
        fetchLandingRecipes()
    }, [])

    return (
        <div>
            This should return this component using entry route ("/")
        </div>
    )
}
export default Home;