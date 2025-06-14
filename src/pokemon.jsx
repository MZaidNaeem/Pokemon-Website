import { useState } from "react";
import { Fragment, useEffect } from "react";
import { PokemonCard } from "./pokemonCard";


export const Pokemon = () => {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=200";

    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pokemonResult, setpokemonResult] = useState([]);
    const [search, setSearch] = useState("");
    const [searchItems, setSearchItems] = useState(pokemonResult);
    let pokemonFetch = async () => {
        try {
            let res = await fetch(API);
            let data = await res.json();
            const results = await Promise.all(data.results.map(async (curElm) => {
                let res1 = await fetch(curElm.url);
                let data1 = await res1.json();
                return data1;
            }));

            setpokemonResult(results);
            setSearchItems(results);
            setPokemon(data.results)
            setLoading(false);
            setError(null);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }


    useEffect(() => {
        if (search.trim() == "") {
            setSearchItems(pokemonResult)
        }
        else {
            let item = pokemonResult.filter((curElm) => {
                return curElm.name.startsWith(search.toLowerCase());
            })
            setSearchItems(item);
        }
    }, [search])


    useEffect(() => {
        document.title = "Pokémon";
        pokemonFetch();
    }, []);

    useEffect(() => {
        console.log(pokemonResult);
    }, [pokemonResult])

    if (loading) {
        return <h1>Loading....</h1>
    }

    if (error) {
        return <h2> Error: {error} </h2>;
    }


    if (pokemon) {
        return (<>
            <section className="container">
                <header>
                    <h1>Lets Catch Pokémon</h1>
                </header>
                <div className="pokemon-search">
                    <input
                        type="text"
                        placeholder="search Pokemon"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <ul className="cards">
                    {searchItems.map((curElm, index) => {
                        return <PokemonCard pokemonData={curElm} key={index}></PokemonCard>
                    })}
                </ul>
                <br />
                <br />
                <br />

            </section>
        </>);
    }
}


