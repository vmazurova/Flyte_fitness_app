import React from 'react';
import { render, screen } from '@testing-library/react';
import { PlaceholderButton } from '..';
import '@testing-library/jest-dom';
describe('PlaceholderButton', function () {
  it('should render a placeholder', function () {
    render( /*#__PURE__*/React.createElement(PlaceholderButton, {
      "data-testid": "endless"
    }));
    expect(screen.getByTestId('endless')).toBeInTheDocument();
  });
  it('should render size', function () {
    render( /*#__PURE__*/React.createElement(PlaceholderButton, {
      "data-testid": "endless",
      xs: 6
    }));
    expect(screen.getByTestId('endless')).toHaveClass('col-6');
  });
});