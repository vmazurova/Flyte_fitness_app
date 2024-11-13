import React from 'react';
import { render, screen } from '@testing-library/react';
import { PaginationLink } from '..';
import { testForCustomTag, testForDefaultClass, testForDefaultTag } from '../testUtils';
describe('PaginationLink', function () {
  it('should render default `a` tag when `href` is present', function () {
    render( /*#__PURE__*/React.createElement(PaginationLink, {
      href: "#",
      "data-testid": "endless"
    }));
    expect(screen.getByTestId('endless').tagName).toBe('A');
  });
  it('should render default `button` tag when no `href` is present', function () {
    testForDefaultTag(PaginationLink, 'button');
  });
  it('should render custom tag', function () {
    testForCustomTag(PaginationLink, {}, 'span');
  });
  it('should render with "page-link" class', function () {
    testForDefaultClass(PaginationLink, 'page-link');
  });
  it('should render previous', function () {
    render( /*#__PURE__*/React.createElement(PaginationLink, {
      previous: true
    }));
    expect(screen.getByLabelText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toHaveClass('visually-hidden');
    expect(screen.getByText("\u2039")).toHaveAttribute('aria-hidden', 'true');
  });
  it('should render next', function () {
    render( /*#__PURE__*/React.createElement(PaginationLink, {
      next: true
    }));
    expect(screen.getByLabelText('Next')).toBeInTheDocument();
    expect(screen.getByText('Next')).toHaveClass('visually-hidden');
    expect(screen.getByText("\u203A")).toHaveAttribute('aria-hidden', 'true');
  });
  it('should render default previous caret with children as an empty array', function () {
    render( /*#__PURE__*/React.createElement(PaginationLink, {
      previous: true,
      children: []
    }));
    expect(screen.getByLabelText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toHaveClass('visually-hidden');
    expect(screen.getByText("\u2039")).toHaveAttribute('aria-hidden', 'true');
  });
  it('should render default next caret with children as an empty array', function () {
    render( /*#__PURE__*/React.createElement(PaginationLink, {
      next: true,
      children: []
    }));
    expect(screen.getByLabelText('Next')).toBeInTheDocument();
    expect(screen.getByText('Next')).toHaveClass('visually-hidden');
    expect(screen.getByText("\u203A")).toHaveAttribute('aria-hidden', 'true');
  });
  it('should render custom aria label', function () {
    render( /*#__PURE__*/React.createElement(PaginationLink, {
      next: true,
      "aria-label": "Yo"
    }));
    expect(screen.getByLabelText('Yo')).toBeInTheDocument();
    expect(screen.getByText('Yo')).toHaveClass('visually-hidden');
  });
  it('should render custom caret specified as a string', function () {
    render( /*#__PURE__*/React.createElement(PaginationLink, {
      next: true
    }, "Yo"));
    expect(screen.getByText('Yo')).toBeInTheDocument();
  });
  it('should render custom caret specified as a component', function () {
    render( /*#__PURE__*/React.createElement(PaginationLink, {
      next: true
    }, /*#__PURE__*/React.createElement("span", null, "Yo")));
    expect(screen.getByText('Yo')).toBeInTheDocument();
    expect(screen.getByText('Yo').tagName).toBe('SPAN');
  });
  it('should render first', function () {
    render( /*#__PURE__*/React.createElement(PaginationLink, {
      first: true
    }));
    expect(screen.getByLabelText('First')).toBeInTheDocument();
    expect(screen.getByText('First')).toHaveClass('visually-hidden');
    expect(screen.getByText("\xAB")).toHaveAttribute('aria-hidden', 'true');
  });
  it('should render last', function () {
    render( /*#__PURE__*/React.createElement(PaginationLink, {
      last: true
    }));
    expect(screen.getByLabelText('Last')).toBeInTheDocument();
    expect(screen.getByText('Last')).toHaveClass('visually-hidden');
    expect(screen.getByText("\xBB")).toHaveAttribute('aria-hidden', 'true');
  });
  it('should render default first caret with children as an empty array', function () {
    render( /*#__PURE__*/React.createElement(PaginationLink, {
      first: true,
      children: []
    }));
    expect(screen.getByLabelText('First')).toBeInTheDocument();
    expect(screen.getByText('First')).toHaveClass('visually-hidden');
    expect(screen.getByText("\xAB")).toHaveAttribute('aria-hidden', 'true');
  });
  it('should render default last caret with children as an empty array', function () {
    render( /*#__PURE__*/React.createElement(PaginationLink, {
      last: true,
      children: []
    }));
    expect(screen.getByLabelText('Last')).toBeInTheDocument();
    expect(screen.getByText('Last')).toHaveClass('visually-hidden');
    expect(screen.getByText("\xBB")).toHaveAttribute('aria-hidden', 'true');
  });
});