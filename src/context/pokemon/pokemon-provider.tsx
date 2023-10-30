import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { PokemonGameContext, PokemonListContext  } from '~/context';
import type { PokemonGameState, PokemonListState } from '~/context';


export const PokemonProvider = component$(() => {
    const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    showImage: true,
    showBackImage: false
  });

  //Estado inicial de ese Pokemon List Context
  
    const pokemonList = useStore<PokemonListState>({
      currentPage: 1,
      isLoading: false,
      pokemons: []
    });
  
  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);
  
  useVisibleTask$(() => {
    if( localStorage.getItem('pokemon-game')){
      const {
        pokemonId = 10,
        showImage = true,
        showBackImage = false
      } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;

      pokemonGame.pokemonId = pokemonId;
      pokemonGame.showBackImage = showImage;
      pokemonGame.showBackImage = showBackImage;

    }
  })

  useVisibleTask$(( {track} ) => {
    track( () => [pokemonGame.showImage, pokemonGame.showBackImage, pokemonGame.pokemonId]);
    localStorage.setItem('pokemon-game', JSON.stringify( pokemonGame ));
  })

    return <Slot />;
});