import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumb from './Breadcrumb';
import { BrowserRouter } from 'react-router-dom';


test('renders learn react link', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Breadcrumb path = "/areas/river-north"/>
    </BrowserRouter>
  );
});
