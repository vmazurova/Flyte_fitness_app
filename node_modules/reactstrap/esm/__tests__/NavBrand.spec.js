import React from 'react';
import { render, screen } from '@testing-library/react';
import { NavbarBrand } from '..';
import { testForChildrenInComponent, testForCustomClass, testForDefaultClass, testForDefaultTag } from '../testUtils';
describe('NavbarBrand', function () {
  it('should render .navbar-brand markup', function () {
    testForDefaultClass(NavbarBrand, 'navbar-brand');
  });
  it('should render custom tag', function () {
    testForDefaultTag(NavbarBrand, 'a');
  });
  it('sholid render children', function () {
    testForChildrenInComponent(NavbarBrand);
  });
  it('should pass additional classNames', function () {
    testForCustomClass(NavbarBrand);
  });
});