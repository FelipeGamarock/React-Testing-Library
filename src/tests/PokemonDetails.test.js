import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const URL_1 = pokemons[0].foundAt[0].map;
const URL_2 = pokemons[0].foundAt[1].map;

describe('Teste o componente PokemonDetails', () => {
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const title = screen.getByRole('heading', { name: /pikachu details/i });
    expect(title).toBeInTheDocument();

    const linkDetail = screen.queryByRole('link', { name: /more details/i });
    expect(linkDetail).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', { name: /summary/i });
    expect(summaryTitle).toBeInTheDocument();

    const text = 'This intelligent Pokémon roasts hard berries with electricity '
    + 'to make them tender enough to eat.';
    const summary = screen.getByText(text);
    expect(summary).toBeInTheDocument();
  });

  it('Teste se existe uma seção com os mapas das localizações do pokémon', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const subTitle = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(subTitle).toBeInTheDocument();

    const maps = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(maps).toHaveLength(2);
    expect(maps[0]).toHaveAttribute('src', URL_1);
    expect(maps[1]).toHaveAttribute('src', URL_2);

    expect(screen.getByText(/kanto viridian forest/i)).toBeInTheDocument();
    expect(screen.getByText(/Kanto Power Plant/i)).toBeInTheDocument();
  });

  it('Testa se o usuário pode favoritar um pokémon na página de detalhes.', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const checkBox = screen.getByRole('checkbox');
    expect(checkBox).toBeInTheDocument();
    const checkBox2 = screen.getByLabelText('Pokémon favoritado?');
    expect(checkBox2).toBeInTheDocument();

    const linkFavorite = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(linkFavorite);
    const allImages = screen.getAllByRole('img');
    const starImage = allImages[1];
    expect(starImage).toHaveAttribute('alt', 'Pikachu is marked as favorite');

    userEvent.click(linkFavorite);
    const images = screen.getAllByRole('img');
    const star = images[1];
    expect(star).not.toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
