import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const PIKACHU = pokemons[0];

describe('Teste o componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(PIKACHU.name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(PIKACHU.type);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const weight = PIKACHU.averageWeight.value;
    const unit = PIKACHU.averageWeight.measurementUnit;
    expect(pokemonWeight).toHaveTextContent(`Average weight: ${weight} ${unit}`);

    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImage.src).toBe(PIKACHU.image);
  });

  it('Testa se o card do Pokémon na Pokédex contém um link de navegação '
  + 'para exibir detalhes sobre o pokemon', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    const pikachuId = PIKACHU.id;
    expect(linkDetails).toHaveAttribute('href', `/pokemons/${pikachuId}`);
  });

  it('Testa se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
  + ' da aplicação.', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const { location: { pathname } } = history;
    expect(pathname).not.toBe('/');
  });

  it('Testa se a URL exibida no navegador muda para /pokemon/<id>, '
  + 'onde <id> é o id do Pokémon clicado', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const { location: { pathname } } = history;
    const pikachuId = PIKACHU.id;
    expect(pathname).toBe(`/pokemons/${pikachuId}`);
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const linkFavorite = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(linkFavorite);

    const allImages = screen.getAllByRole('img');
    const starImage = allImages[1];
    const pikachuName = PIKACHU.name;
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
    expect(starImage).toHaveAttribute('alt', `${pikachuName} is marked as favorite`);
  });
});
