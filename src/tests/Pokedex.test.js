import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokedex', () => {
  it('Testa se a página contém um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      level: 2, name: /Encountered pokémons/i,
    });
    expect(title).toBeInTheDocument();
  });

  it('Testa se mostra o outro Pokémon quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonNext);
    let pokemonName = screen.getByText(/Charmander/i);
    expect(pokemonName).toBeInTheDocument();

    userEvent.click(buttonNext);
    pokemonName = screen.getByText(/Caterpie/i);
    expect(pokemonName).toBeInTheDocument();

    userEvent.click(buttonNext);
    pokemonName = screen.getByText(/Ekans/i);
    expect(pokemonName).toBeInTheDocument();

    userEvent.click(buttonNext);
    pokemonName = screen.getByText(/Alakazam/i);
    expect(pokemonName).toBeInTheDocument();

    userEvent.click(buttonNext);
    pokemonName = screen.getByText(/Mew/i);
    expect(pokemonName).toBeInTheDocument();

    userEvent.click(buttonNext);
    pokemonName = screen.getByText(/Rapidash/i);
    expect(pokemonName).toBeInTheDocument();

    userEvent.click(buttonNext);
    pokemonName = screen.getByText(/Snorlax/i);
    expect(pokemonName).toBeInTheDocument();

    userEvent.click(buttonNext);
    pokemonName = screen.getByText(/Dragonair/i);
    expect(pokemonName).toBeInTheDocument();

    userEvent.click(buttonNext);
    pokemonName = screen.getByText(/Pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getAllByRole('link', { name: /more details/i });
    expect(linkDetails).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons).toHaveLength(types.length);

    const eletricButton = screen.getByRole('button', { name: types[0] });
    expect(eletricButton).toBeInTheDocument();

    const fireButton = screen.getByRole('button', { name: types[1] });
    expect(fireButton).toBeInTheDocument();

    const bugButton = screen.getByRole('button', { name: types[2] });
    expect(bugButton).toBeInTheDocument();

    const poisonButton = screen.getByRole('button', { name: types[3] });
    expect(poisonButton).toBeInTheDocument();

    const phychicButton = screen.getByRole('button', { name: types[4] });
    expect(phychicButton).toBeInTheDocument();

    const normalButton = screen.getByRole('button', { name: types[5] });
    expect(normalButton).toBeInTheDocument();

    const dragonButton = screen.getByRole('button', { name: types[6] });
    expect(dragonButton).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonButton);
    let pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).not.toHaveTextContent('Electric');

    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);
    pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
  });
});
