import { $, component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";



export default component$(() => {

  const nav = useNavigate();
  const {
    pokemonId,
    showImage,
    showBackImage,
    prevPokemon,
    nextPokemon,
    toggleFromBack,
    toggleImage,
  } = usePokemonGame();

  const goToPokemon = $((id : number) =>{
    nav(`/pokemon/${ id }/`); // Al ser un useStore no hace falta colocar .value como en el caso de las señales
  });

  return (
    <>
     <span class="text-2xl">Buscador simple</span>
     <span class="text-9xl">{ pokemonId }</span>

    {/*<Link href={`/pokemon/${ pokemonId.value }/`}>*/}
    <div onClick$={() => goToPokemon( pokemonId.value )}>
        <PokemonImage 
        id={ pokemonId.value } 
        backImage={ showBackImage.value } 
        isVisible={ showImage.value } />
    </div>
    <div class="mt-2">
        <button onClick$={ prevPokemon } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={ nextPokemon } class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={ toggleFromBack } class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={ toggleImage } class="btn btn-primary mr-2">Revelar</button>
     </div>


    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Mi primera aplicación en qwik",
    },
  ],
};
