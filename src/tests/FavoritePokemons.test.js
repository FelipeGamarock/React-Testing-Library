import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  it('Testa se exibe "no favorite pokemon found" se n tiver pokemon favoritado', () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText(/no favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const favoriteButton = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoriteButton);

    history.push('/favorites');
    const allImages = screen.getAllByRole('link', { name: /more details/i });
    expect(allImages).toHaveLength(1);
  });
});
