import React, { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

import { SemanticColors } from '../styles/colors';

export interface LinkProps extends ComponentPropsWithoutRef<'a'> {
  selected?: boolean;
}

const UnderLine = styled.div`
  background-color: transparent;
  height: 0.1875rem;
  margin-top: 0.5rem;
`;

const InnerLink = styled.a<LinkProps>`
  color: ${SemanticColors.tabBar.default};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  margin-right: 1.5rem;
  text-decoration: none;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: ${SemanticColors.tabBar.hover};
  }
  ${({ selected }) => selected
    && `
        color: ${SemanticColors.tabBar.active};
        
        ${UnderLine} {
            background-color: ${SemanticColors.tabBar.active};
        }
    `}
`;

export const Link: React.FC<LinkProps> = ({
  children,
  selected,
  ...rest
}: LinkProps) => (
  <InnerLink {...rest} selected={selected}>
    {children}
    <UnderLine />
  </InnerLink>
);
