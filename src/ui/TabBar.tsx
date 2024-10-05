import React from 'react';
import styled from 'styled-components';

import { margin, MarginProps } from 'styled-system';
import { SemanticColors } from '../styles/colors';

import { Link, LinkProps } from './Link'

const StyledTabBar = styled.nav<MarginProps>`
  display: flex;
  border-bottom: 1px solid ${SemanticColors.border.primary};
  ${margin}
`;

type TabBarType = typeof StyledTabBar & { Link: React.FC<LinkProps> };

export const TabBar = StyledTabBar as TabBarType;
TabBar.Link = Link;

