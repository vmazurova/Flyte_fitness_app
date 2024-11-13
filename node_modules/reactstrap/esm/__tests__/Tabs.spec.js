import React from 'react';
import { screen, render } from '@testing-library/react';
import { TabContent, TabPane } from '..';
import '@testing-library/jest-dom';
var activeTab = '1';
describe('Tabs', function () {
  it('should render', function () {
    render( /*#__PURE__*/React.createElement(TabContent, {
      activeTab: "1"
    }, /*#__PURE__*/React.createElement(TabPane, {
      tabId: "1"
    }, "Destiny"), /*#__PURE__*/React.createElement(TabPane, {
      tabId: "2"
    }, "Death")));
    expect(screen.getByText('Destiny')).toBeInTheDocument();
    expect(screen.getByText('Death')).toBeInTheDocument();
  });
  it('should have tab1 as active', function () {
    render( /*#__PURE__*/React.createElement(TabContent, {
      activeTab: "1"
    }, /*#__PURE__*/React.createElement(TabPane, {
      tabId: "1"
    }, "Dream"), /*#__PURE__*/React.createElement(TabPane, {
      tabId: "2"
    }, "Destruction")));
    expect(screen.getByText('Dream')).toHaveClass('active');
    expect(screen.getByText('Destruction')).not.toHaveClass('active');
  });
  it('should switch to tab2 as active', function () {
    render( /*#__PURE__*/React.createElement(TabContent, {
      activeTab: "2"
    }, /*#__PURE__*/React.createElement(TabPane, {
      tabId: "1"
    }, "Desire"), /*#__PURE__*/React.createElement(TabPane, {
      tabId: "2"
    }, "Despair")));
    expect(screen.getByText('Desire')).not.toHaveClass('active');
    expect(screen.getByText('Despair')).toHaveClass('active');
  });
  it('should show no active tabs if active tab id is unknown', function () {
    render( /*#__PURE__*/React.createElement(TabContent, {
      activeTab: "3"
    }, /*#__PURE__*/React.createElement(TabPane, {
      tabId: "1"
    }, "Delirium"), /*#__PURE__*/React.createElement(TabPane, {
      tabId: "2"
    }, "Delight")));
    expect(screen.getByText('Delirium')).not.toHaveClass('active');
    expect(screen.getByText('Delight')).not.toHaveClass('active');
    /* Not sure if this is what we want. Toggling to an unknown tab id should
      render all tabs as inactive and should show no content.
      This could be a warning during development that the user is not having a proper tab ids.
      NOTE: Should this be different?
    */
  });

  it('should render custom TabContent tag', function () {
    render( /*#__PURE__*/React.createElement(TabContent, {
      tag: "main",
      activeTab: activeTab,
      "data-testid": "endless"
    }, /*#__PURE__*/React.createElement(TabPane, {
      tabId: "1"
    }, "Tab Content 1"), /*#__PURE__*/React.createElement(TabPane, {
      tabId: "2"
    }, "TabContent 2")));
    expect(screen.getByTestId('endless').tagName).toBe('MAIN');
  });
  it('should render custom TabPane tag', function () {
    render( /*#__PURE__*/React.createElement(TabPane, {
      tag: "main",
      tabId: "1"
    }, "Tab Content 1"));
    expect(screen.getByText('Tab Content 1').tagName).toBe('MAIN');
  });
});