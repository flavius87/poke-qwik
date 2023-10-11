import { createContextId } from '@builder.io/qwik';

export interface PokemonGameState {
    pokemonId: number;
    showBackImage: boolean;
    showImage: boolean; 
}

//https://qwik.builder.io/docs/components/context/#context

export const PokemonGameContext = createContextId<PokemonGameState>('docs.theme-context');