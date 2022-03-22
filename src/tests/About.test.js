import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About.', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const text1 = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing/i,
    );
    const text2 = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img', { name: /pokédex/i });

    expect(image.src).toBe(url);
  });
});
