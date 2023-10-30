import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";


export const usePokemonGame = ( () => {
    
    const pokemonGame = useContext( PokemonGameContext );

    const changePokemonId = $((value:number) => {
        if(( pokemonGame.pokemonId + value) <= 0) return;
        pokemonGame.pokemonId += value;
      })

    const toggleFromBack = $(() => {
        pokemonGame.showBackImage = !pokemonGame.showBackImage;
    })

    const toggleImage = $(() => {
        pokemonGame.showImage = !pokemonGame.showImage;
    })


    return {
        pokemonId: useComputed$(() => pokemonGame.pokemonId),
        showImage: useComputed$(() => pokemonGame.showImage),
        showBackImage: useComputed$(() => pokemonGame.showBackImage),

        nextPokemon: $(() => changePokemonId(+1)),
        prevPokemon: $(() => changePokemonId(-1)),

        toggleFromBack: toggleFromBack,
        toggleImage: toggleImage,
    }
})