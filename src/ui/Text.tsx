import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import {
  compose,
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  margin,
  MarginProps,
  ResponsiveValue,
  textAlign,
  TextAlignProps,
  variant,
} from 'styled-system';
import { SemanticColors } from '../styles/colors';

export interface TextProps
  extends ComponentPropsWithoutRef<'span'>,
  MarginProps,
  FontSizeProps,
  FontFamilyProps,
  FontWeightProps,
  TextAlignProps {
  variant?: ResponsiveValue<'primary' | 'secondary' | 'weak'>;
}

const variantStyles = variant({
  variants: {
    primary: {
      color: SemanticColors.text.primary,
    },
    secondary: {
      color: SemanticColors.text.secondary,
    },
    weak: {
      color: SemanticColors.text.weak,
    },
  },
});

export const Text = styled.span<TextProps>`
  font-size: 1rem;
  font-family: Avenir;
  line-height: 1.4;
  margin: 0;

  ${compose(variantStyles, margin, fontSize, fontWeight, fontFamily, textAlign)}
`;

Text.defaultProps = {
  variant: 'primary',
};
