import { createLocalTheme } from '../../../../styling/GlobalTheme';
import styled from 'styled-components';
import React, { FunctionComponent, ReactElement } from 'react';
import { NavLink } from 'remix';

interface LinkProps {
  text: string;
  to: string;
}

const { from } = createLocalTheme(({ globalTheme }) => ({
  text: {
    size: globalTheme.textSizes.title,
    color: globalTheme.backgroundColor
  },
  rightMargin: globalTheme.gap(1)
}));

const StyledLink = styled(NavLink)`
  font-size: ${from(theme => theme.text.size)};
  color: ${from(theme => theme.text.color)};
  margin-right: ${from(theme => theme.rightMargin)};
  text-decoration: none;
  cursor: pointer;
`;

const Brand: FunctionComponent<LinkProps> = function ({
  text,
  to
}): ReactElement {
  return (
    <StyledLink to={ to }>
      { text }
    </StyledLink>
  );
};

export {
  Brand
};
