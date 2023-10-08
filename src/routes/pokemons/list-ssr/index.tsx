import { component$, useComputed$ } from "@builder.io/qwik";
import { Link, type DocumentHead, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
import type { SmallPokemon } from "~/interfaces";

export const usePokemonList = routeLoader$<SmallPokemon[]>(async( {query, redirect, pathname} ) => {

    const offset = Number( query.get('offset') || '0' );
    if ( isNaN(offset) ) redirect(301, pathname);
    if ( offset < 0 ) redirect(301, pathname);

    return await getSmallPokemons(offset);

    //const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${ offset }`);
    //const data = await resp.json() as PokemonListResponse;

    //return data.results;
});

export default component$(()=> {

    const pokemonRes = usePokemonList();
    const location = useLocation();

    //Propiedad computada
    const currentOffset = useComputed$<number>(() => {
        //const offsetString = location.url.searchParams.get('offset');
        const offsetString = new URLSearchParams(location.url.search);
        return Number (offsetString.get('offset') || 0);
    })

  
});

export const head: DocumentHead = {
    title: "SSR List"
};