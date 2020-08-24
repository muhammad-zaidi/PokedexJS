import React, { useState, useEffect } from 'react';
import { Typography, Link, CircularProgress, Button } from '@material-ui/core';
import { toFirstCharUppercase } from '../constants';
import axios from 'axios';

export const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  // 1. When pokemon == undefined, so we are getting info
  // > Show loading progress
  // 2. pokemon = good data, means we got the info,
  // > Return the info of the pokemon
  // 3. Pokemon = bad data (wrong id)
  // > Return pokemon not found

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
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
      {pokemon !== undefined && (
        <Button variant='contained' onClick={() => history.push('/')}>
          back to pokedex
        </Button>
      )}
    </>
  );

  return <div>{`This is the pokemon page for Pokemon #${pokemonId}`} </div>;
};

export default Pokemon;
