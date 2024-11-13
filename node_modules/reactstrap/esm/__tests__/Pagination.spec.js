import React from 'react';
import { screen, render } from '@testing-library/react';
import { Pagination } from '..';
import { testForChildrenInComponent } from '../testUtils';
describe('Pagination', function () {
  it('should render "nav" tag by default', function () {
    render( /*#__PURE__*/React.createElement(Pagination, {
      "data-testid": "test"
    }));
    var node = screen.getByLabelText('pagination');
    expect(node.tagName.toLowerCase()).toMatch('nav');
  });
  it('should render default list tag', function () {
    render( /*#__PURE__*/React.createElement(Pagination, null));
    expect(screen.getByLabelText('pagination').querySelector('ul')).toBeInTheDocument();
  });
  it('should render custom tag', function () {
    render( /*#__PURE__*/React.createElement(Pagination, {
      tag: "main"
    }));
    expect(screen.getByLabelText('pagination').tagName.toLowerCase()).toBe('main');
  });
  it('should render with "pagination" class', function () {
    render( /*#__PURE__*/React.createElement(Pagination, {
      "data-testid": "pagination"
    }));
    expect(screen.getByTestId('pagination')).toHaveClass('pagination');
  });
  it('should render children', function () {
    testForChildrenInComponent(Pagination);
  });
  describe('should render pagination at different sizes', function () {
    it('should render with sm', function () {
      render( /*#__PURE__*/React.createElement(Pagination, {
        size: "sm",
        "data-testid": "pagination"
      }));
      expect(screen.getByTestId('pagination')).toHaveClass('pagination-sm');
    });
    it('should render lg', function () {
      render( /*#__PURE__*/React.createElement(Pagination, {
        size: "lg",
        "data-testid": "pagination"
      }));
      expect(screen.getByTestId('pagination')).toHaveClass('pagination-lg');
    });
  });
});