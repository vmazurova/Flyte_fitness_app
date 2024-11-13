import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { testForCustomTag, testForDefaultClass, testForDefaultTag } from '../testUtils';
import { Progress } from '..';
describe('Progress', function () {
  it('should render with "div" tag by default', function () {
    testForDefaultTag(Progress, 'div');
  });
  it('should render with "progress" class', function () {
    testForDefaultClass(Progress, 'progress');
  });
  it('should render with "value" 0 by default', function () {
    render( /*#__PURE__*/React.createElement(Progress, null));
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });
  it('should render with "max" 100 by default', function () {
    render( /*#__PURE__*/React.createElement(Progress, null));
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
  });
  it('should render with "style" on the parent element', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      style: {
        height: '20px'
      },
      "data-testid": "sandman"
    }));
    expect(getComputedStyle(screen.getByTestId('sandman')).getPropertyValue('height')).toBe('20px');
  });
  it('should render with "style" on the progress bar element if bar=true', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      style: {
        height: '20px'
      }
    }));
    expect(getComputedStyle(screen.getByRole('progressbar')).getPropertyValue('height')).toBe('20px');
  });
  it('should render "barStyle" on the progress bar element', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      style: {
        height: '20px'
      },
      barStyle: {
        height: '10px'
      }
    }));
    expect(getComputedStyle(screen.getByRole('progressbar')).getPropertyValue('height')).toBe('10px');
  });
  it('should render with the given "value" when passed as string prop', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      value: "10"
    }));
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '10');
  });
  it('should render with the given "value" when passed as number prop', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      value: 10
    }));
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '10');
  });
  it('should render with the given "max" when passed as string prop', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      max: "10"
    }));
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '10');
  });
  it('should render with the given "max" when passed as number prop', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      max: 10
    }));
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '10');
  });
  it('should render with "progress-bar-striped" class when striped prop is truthy', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      striped: true
    }));
    expect(screen.getByRole('progressbar')).toHaveClass('progress-bar-striped');
  });
  it('should render with "progress-bar-striped" and "progress-bar-animated" classes when animated prop is truthy', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      animated: true
    }));
    expect(screen.getByRole('progressbar')).toHaveClass('progress-bar-striped');
    expect(screen.getByRole('progressbar')).toHaveClass('progress-bar-animated');
  });
  it('should render with "bg-${color}" class when color prop is defined', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      color: "yo"
    }));
    expect(screen.getByRole('progressbar')).toHaveClass('bg-yo');
  });
  it('should render additional classes', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      className: "other",
      "data-testid": "sandman"
    }));
    expect(screen.getByTestId('sandman')).toHaveClass('other');
    expect(screen.getByTestId('sandman')).toHaveClass('progress');
  });
  it('should render additional classes on the inner progress bar', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      barClassName: "other",
      "data-testid": "sandman"
    }));
    expect(screen.getByTestId('sandman')).toHaveClass('progress');
    expect(screen.getByTestId('sandman')).not.toHaveClass('other');
    expect(screen.getByRole('progressbar')).toHaveClass('other');
  });
  it('should render custom tag', function () {
    testForCustomTag(Progress);
  });
  it('should render only the .progress when "multi" is passed', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      multi: true,
      "data-testid": "sandman"
    }));
    expect(screen.getByTestId('sandman')).toHaveClass('progress');
    expect(screen.getByTestId('sandman')).not.toHaveClass('progress-bar');
  });
  it('should render only the .progress-bar when "bar" is passed', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      bar: true
    }));
    expect(screen.getByRole('progressbar')).toHaveClass('progress-bar');
    expect(screen.getByRole('progressbar')).not.toHaveClass('progress');
  });
  it('should render additional classes', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      className: "yo",
      "data-testid": "sandman"
    }));
    expect(screen.getByTestId('sandman')).toHaveClass('progress-bar');
    expect(screen.getByTestId('sandman')).toHaveClass('yo');
    expect(screen.getByTestId('sandman')).not.toHaveClass('progress');
  });
  it('should render additional classes using the barClassName', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      barClassName: "yo",
      "data-testid": "sandman"
    }));
    expect(screen.getByTestId('sandman')).toHaveClass('progress-bar');
    expect(screen.getByTestId('sandman')).toHaveClass('yo');
    expect(screen.getByTestId('sandman')).not.toHaveClass('progress');
  });
  it('should render the children (label)', function () {
    render( /*#__PURE__*/React.createElement(Progress, null, "0%"));
    expect(screen.getByText('0%')).toBeInTheDocument();
    // expect(wrapper.text()).toBe('0%');
  });

  it('should render the children (label) (multi)', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      multi: true
    }, /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      value: "15"
    }, "15%"), /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      color: "success",
      value: "30"
    }, "30%"), /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      color: "info",
      value: "25"
    }, "25%"), /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      color: "warning",
      value: "20"
    }, "20%"), /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      color: "danger",
      value: "5"
    }, "5%")));
    expect(screen.getByText('15%')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
  });
  it('should render nested progress bars', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      multi: true,
      "data-testid": "sandman"
    }, /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      value: "15"
    }), /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      color: "success",
      value: "30"
    }), /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      color: "info",
      value: "25"
    }), /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      color: "warning",
      value: "20"
    }), /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      color: "danger",
      value: "5"
    })));
    expect(screen.getByTestId('sandman')).toHaveClass('progress');
    expect(screen.getAllByRole('progressbar').length).toBe(5);
  });
  it('should render nested progress bars and id attribute', function () {
    render( /*#__PURE__*/React.createElement(Progress, {
      multi: true,
      "data-testid": "sandman"
    }, /*#__PURE__*/React.createElement(Progress, {
      bar: true,
      id: "ruh-roh"
    })));
    expect(screen.getByRole('progressbar')).toHaveAttribute('id', 'ruh-roh');
    expect(screen.getByTestId('sandman')).toHaveClass('progress');
  });
});