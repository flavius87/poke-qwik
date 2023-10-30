import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
    const id = Number(params.id);
    if(isNaN(id)) throw redirect(301, "/");
    if(id <= 0) throw redirect(301, "/");
    if(id > 1000) throw redirect(301, "/");

    return id;
})

export default component$(() => {

    //const location = useLocation();

    const pokemonId = usePokemonId();
    //const pokemonGame = useContext(PokemonGameContext);
    const {
        showImage,
        showBackImage,
        toggleFromBack,
        toggleImage,
      } = usePokemonGame();
    

    return <>
            <span class="text-5xl">Pokemon: { pokemonId }</span>
            <PokemonImage 
            id={ pokemonId.value }
            isVisible={ showImage.value }
            backImage={ showBackImage.value }
            ></PokemonImage>
            <div class="mt-2">
                <button onClick$={ toggleFromBack } class="btn btn-primary mr-2">Voltear</button>
                <button onClick$={ toggleImage } class="btn btn-primary mr-2">Revelar</button>
            </div>
           </>
});