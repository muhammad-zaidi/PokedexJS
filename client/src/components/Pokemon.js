import React, { useState } from 'react';
import mockData from '../mockData';
import { Typography, Link } from '@material-ui/core';
import { toFirstCharUppercase } from '../constants';

export const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(mockData[`${pokemonId}`]);

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <Typography variant='h1'>
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} />
        </Typography>
        <img style={{ width: '300px', height: '300px' }} src={fullImageUrl} />
        <Typography variant='h2'>Pokemon Info</Typography>
        <Typography variant='h5'>
          {'Species: '}
          <Link href={species.url}>{toFirstCharUppercase(species.name)} </Link>
        </Typography>
        <Typography variant='h5'>Height: {height} </Typography>
        <Typography variant='h5'>Weight: {weight} </Typography>
        <Typography variant='h2'> Types:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return (
            <Typography variant='h5' key={name}>
              {' '}
              {`${toFirstCharUppercase(name)}`}
            </Typography>
          );
        })}
      </>
    );
  };
  return <> {generatePokemonJSX()}</>;

  return <div>{`This is the pokemon page for Pokemon #${pokemonId}`} </div>;
};

export default Pokemon;
