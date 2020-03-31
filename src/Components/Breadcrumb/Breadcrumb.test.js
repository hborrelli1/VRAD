import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumb from './Breadcrumb';
import { BrowserRouter } from 'react-router-dom';


test('display the area links', () => {
  const { getByText} = render(
    <BrowserRouter>
      <Breadcrumb key = "hjkhjk" path = "/areas/river-north"/>
    </BrowserRouter>
  );
  expect(getByText('areas')).toBeInTheDocument()
  expect(getByText('river-north')).toBeInTheDocument()

});
test('display the nav links', () => {
  const { getByText} = render(
    <BrowserRouter>
      <Breadcrumb key = "hjksk" path = "/areas/river-north/woot"/>
    </BrowserRouter>
  );
  expect(getByText('areas')).toBeInTheDocument()
  expect(getByText('river-north')).toBeInTheDocument()
  expect(getByText('woot')).toBeInTheDocument()
});
