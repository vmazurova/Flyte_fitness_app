import React from 'react';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { NavLink } from '..';
import { testForChildrenInComponent, testForCustomClass, testForCustomTag, testForDefaultClass } from '../testUtils';
describe('NavLink', function () {
  it('should render .nav-link markup', function () {
    testForDefaultClass(NavLink, 'nav-link');
  });
  it('should render custom tag', function () {
    testForCustomTag(NavLink);
  });
  it('should render children', function () {
    testForChildrenInComponent(NavLink);
  });
  it('should pass additional classNames', function () {
    testForCustomClass(NavLink);
  });
  it('should render active class', function () {
    render( /*#__PURE__*/React.createElement(NavLink, {
      active: true
    }, "Yo!"));
    expect(screen.getByText('Yo!')).toHaveClass('active');
  });
  it('should render disabled markup', function () {
    render( /*#__PURE__*/React.createElement(NavLink, {
      disabled: true
    }, "Yo!"));
    expect(screen.getByText('Yo!')).toHaveAttribute('disabled');
  });
  it('handles onClick prop', function () {
    var onClick = jest.fn();
    render( /*#__PURE__*/React.createElement(NavLink, {
      onClick: onClick
    }, "testing click"));
    user.click(screen.getByText(/testing click/i));
    expect(onClick).toHaveBeenCalled();
  });
  it('handles onClick events', function () {
    render( /*#__PURE__*/React.createElement(NavLink, null, "hello"));
    var node = screen.getByText(/hello/i);
    var click = createEvent.click(node);
    fireEvent(node, click);
    expect(click.defaultPrevented).toBeFalsy();
  });
  it('prevents link clicks via onClick for dropdown nav-items', function () {
    render( /*#__PURE__*/React.createElement(NavLink, {
      href: "#"
    }, "hello"));
    var node = screen.getByText(/hello/i);
    var click = createEvent.click(node);
    fireEvent(node, click);
    expect(click.defaultPrevented).toBeTruthy();
  });
  it('is not called when disabled', function () {
    var onClick = jest.fn();
    render( /*#__PURE__*/React.createElement(NavLink, {
      onClick: onClick,
      disabled: true
    }, "testing click"));
    user.click(screen.getByText(/testing click/i));
    expect(onClick).not.toHaveBeenCalled();
  });
});