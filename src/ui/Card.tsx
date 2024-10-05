import styled from 'styled-components';
import {
  borderRadius,
  BorderRadiusProps,
  compose,
  height,
  HeightProps,
  padding,
  PaddingProps,
  ResponsiveValue,
  space,
  SpaceProps,
  variant,
  width,
  WidthProps,
} from 'styled-system';
import { SemanticColors } from '../styles/colors';

export interface CardProps
  extends BorderRadiusProps,
  HeightProps,
  SpaceProps,
  WidthProps,
  PaddingProps {
  level?: ResponsiveValue<0 | 100 | 200 | 300>;
  highlighted?: boolean;
}

const levelVariant = variant({
  prop: 'level',
  variants: {
    0: {
      boxShadow: 'none',
    },
    100: {
      boxShadow: '0 0.0625rem 0.25rem 0 rgba(0,0,0,0.1)',
    },
    200: {
      boxShadow: '0 0 0.5rem 0.1875rem rgba(0,0,0,0.08)',
    },
    300: {
      boxShadow: '0 0 0.75rem 0.25rem rgba(0,0,0,0.12)',
    },
  },
});

export const Card = styled.div<CardProps>`
  overflow: auto;
  box-sizing: border-box;
  background-color: ${SemanticColors.background.primary};
  border-radius: 0.5rem;
  padding: 1rem;

  ${({ highlighted }) => highlighted && `
    border: 3px solid ${SemanticColors.border.highlight};
  `}

  transition: border ease 200ms;

  ${compose(levelVariant, borderRadius, height, space, width, padding)}
`;
