import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente NotFound', () => {
  it('Testa se página contém um h2 com o texto Page requested not found 😭;', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found Crying emoji/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(image.src).toBe(url);
  });
});
