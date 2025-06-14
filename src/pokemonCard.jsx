import { useEffect, useRef } from "react";
import AOS, { init } from 'aos';
import 'aos/dist/aos.css'

export const PokemonCard = ({ pokemonData }) => {
    const clickSound = useRef(null);


    useEffect(() => {
        init({
            duration: 1000,
            easing: "ease-in-out",
            once: false,
        });
    }, [])

    if (!clickSound.current) {
        clickSound.current = new Audio(pokemonData.cries.latest);
    }

    const pokemonCry = () => {
        clickSound.current.play();
    };

    return (
        <li data-aos="zoom-in-up" className="pokemon-card">
            <figure>
                <img
                    src={pokemonData.sprites.other.dream_world.front_default}
                    alt={pokemonData.name}
                    className="pokemon-image"
                />
            </figure>
            <h1 className="pokemon-name">{pokemonData.name}</h1>
            <div className="pokemon-info pokemon-highlight">
                <p>
                    {pokemonData.types.map((curType) => curType.type.name).join(", ")}
                </p>
            </div>

            <div className="grid-three-cols">
                <p className="pokemon-info">
                    <span> Height:</span> {pokemonData.height}
                </p>
                <p className="pokemon-info">
                    <span> Weight:</span> {pokemonData.weight}
                </p>
                <p className="pokemon-info">
                    <span> Speed:</span> {pokemonData.stats[5].base_stat}
                </p>
            </div>

            <div className="grid-three-cols">
                <div className="pokemon-info">
                    <p>{pokemonData.base_experience}</p>
                    <span> Experience:</span>
                </div>
                <div className="pokemon-info">
                    <p>{pokemonData.stats[1].base_stat}</p>
                    <span>Attack:</span>
                </div>
                <div className="pokemon-info">
                    <p>
                        {pokemonData.abilities
                            .map((abilityInfo) => abilityInfo.ability.name)
                            .slice(0, 1)
                            .join(", ")}
                    </p>
                    <span> Abilities: </span>
                </div>
            </div>
            <button onClick={pokemonCry} className="play-sound-btn">
                Play Sound
            </button>
        </li>
    );
};
