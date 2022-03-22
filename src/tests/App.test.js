import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente App.js', () => {
  it('Testa se o topo da aplicação contém os links de navegação fixos', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Testa se a aplicação é carregada pra a URL / ao clicar no link Home.', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it('Testa se a aplicação é carregada pra a URL /about ao clicar no link About.', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('Faz a app ser carregada pra a URL /favorites ao clica em Favorite Pokemons', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorite);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('Faz a app ser carregada pra a Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/notfound');

    const notfound = screen.getByRole('heading', {
      level: 2, name: /Page requested not found/i,
    });

    expect(notfound).toBeInTheDocument();
  });
});
