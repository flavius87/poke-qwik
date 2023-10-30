import { $, component$, useContext, useOnDocument, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonListContext } from "~/context";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";


export default component$(()=> {
    const pokemonState = useContext( PokemonListContext );

    // Documentación https://qwik.builder.io/docs/components/tasks/#usevisibletask Solo el cliente
    {/*useVisibleTask$( async({ track }) => {
        track( () => pokemonState.currentPage );

        const pokemons = await getSmallPokemons( pokemonState.currentPage * 10 );
        pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]; 
    });*/}

    //Ejecución del lado del servidor y del cliente - Documentación: https://qwik.builder.io/docs/components/tasks/#usetask
    useTask$( async({ track }) => {
        track( () => pokemonState.currentPage );

        const pokemons = await getSmallPokemons( pokemonState.currentPage * 10, 30 );
        pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]; 

        pokemonState.isLoading = false;
    });

    useOnDocument('scroll', $(() => {
        const maxScroll = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight;
        
        if( (currentScroll + 200) >= maxScroll && !pokemonState.isLoading ){
            pokemonState.isLoading = true;
            pokemonState.currentPage++;
        }
    }))

    return (
        <>
        <div class="flex flex-col">
            <span class="my-5 text-5xl">Status</span>
            <span>Página actual: { pokemonState.currentPage }</span>
            <span>Esta cargando:</span>
        </div>

        <div class="mt-10">
            {/*<button onClick$={()=> pokemonState.currentPage-- } class="btn btn-primary mr-2">Anteriores</button>*/}
           {/* <button onClick$={()=> pokemonState.currentPage++ } class="btn btn-primary mr-2">Siguiente</button>*/}
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
            {
                pokemonState.pokemons.map(({name, id}) =>
                <div key={name} class="m-5 flex flex-col justify-center items-center">
                  <PokemonImage id={id}></PokemonImage>
                <span class="capitalize">{ name }</span>
                </div>
                )
            }
        </div>
        </>
    )
});


export const head: DocumentHead = {
    title: "Client List"
  };