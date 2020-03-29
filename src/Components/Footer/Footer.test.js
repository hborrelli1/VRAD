import React from 'react';
import Footer from './Footer';
import { render } from '@testing-library/react';

describe('Foooter Test', () => {
  test('should render info to the DOM', () => {
      const { getByText } = render(
        <Footer />
      );

      const footerEl = getByText('Built by:');
      expect(footerEl).toBeInTheDocument();
  });
});
