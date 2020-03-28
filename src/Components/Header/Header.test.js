import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
  const { getByText } = render(<BrowserRouter><Header /></BrowserRouter>);
});
