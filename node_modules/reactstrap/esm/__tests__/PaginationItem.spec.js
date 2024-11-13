import React from 'react';
import { render, screen } from '@testing-library/react';
import { PaginationItem } from '..';
import { testForCustomTag, testForDefaultClass, testForDefaultTag } from '../testUtils';
describe('PaginationItem', function () {
  it('should render default tag', function () {
    testForDefaultTag(PaginationItem, 'li');
  });
  it('should render custom tag', function () {
    testForCustomTag(PaginationItem);
  });
  it('should render with "page-item" class', function () {
    testForDefaultClass(PaginationItem, 'page-item');
  });
  it('should render active state', function () {
    render( /*#__PURE__*/React.createElement(PaginationItem, {
      active: true
    }, "hello"));
    expect(screen.getByText('hello')).toHaveClass('active');
  });
  it('should render disabled state', function () {
    render( /*#__PURE__*/React.createElement(PaginationItem, {
      disabled: true
    }, "hello"));
    expect(screen.getByText('hello')).toHaveClass('disabled');
  });
});