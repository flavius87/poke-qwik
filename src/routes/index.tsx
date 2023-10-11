import { $, component$, useContext } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";



export default component$(() => {

  const nav = useNavigate();


  //const pokemonId = useSignal(1); // primitivos: boolean, numbers, strings
  //const showBackImage = useSignal(false);
  //const showImage = useSignal(false);

  const pokemonGame = useContext( PokemonGameContext );

  const changePokemonId = $((value:number) => {
    if(( pokemonGame.pokemonId + value) <= 0) return;
    pokemonGame.pokemonId += value;
  })

  const goToPokemon = $(() =>{
    nav(`/pokemon/${ pokemonGame.pokemonId }/`); // Al ser un useStore no hace falta colocar .value como en el caso de las señales
  });

  return (
    <>
     <span class="text-2xl">Buscador simple</span>
     <span class="text-9xl">{ pokemonGame.pokemonId }</span>

    {/*<Link href={`/pokemon/${ pokemonId.value }/`}>*/}
    <div onClick$={() => goToPokemon()}>
        <PokemonImage 
        id={ pokemonGame.pokemonId } 
        backImage={ pokemonGame.showBackImage } 
        isVisible={ pokemonGame.showImage } />
    </div>
    <div class="mt-2">
        <button onClick$={ () => changePokemonId(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={ () => changePokemonId(+1) } class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={ () => pokemonGame.showBackImage = !pokemonGame.showBackImage } class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={ () => pokemonGame.showImage = !pokemonGame.showImage } class="btn btn-primary mr-2">Revelar</button>
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
