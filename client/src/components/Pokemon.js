import React from 'react';

export const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  return <div>{`This is the pokemon page for Pokemon #${pokemonId}`} </div>;
};

export default Pokemon;
