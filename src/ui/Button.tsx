import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import {
  compose,
  margin,
  MarginProps,
  width,
  WidthProps,
  ButtonStyleProps,
  ResponsiveValue,
  variant,
} from 'styled-system';
import { SemanticColors } from '../styles/colors';

export interface ButtonProps
  extends ComponentPropsWithoutRef<'button'>,
  ButtonStyleProps,
  MarginProps,
  WidthProps {
  inverted?: boolean;
  variant?: ResponsiveValue<'primary' | 'secondary'>;
}

const variantStyles = variant({
  variants: {
    primary: {
      color: SemanticColors.button.primary.text,
      background: SemanticColors.button.primary.background,

      '&:hover': {
        color: SemanticColors.button.primary.textHover,
        background: SemanticColors.button.primary.backgroundHover,
      },
    },
    secondary: {
      color: SemanticColors.button.secondary.text,
      background: SemanticColors.button.secondary.background,
      borderColor: SemanticColors.button.secondary.border,

      '&:hover': {
        color: SemanticColors.button.secondary.textHover,
        background: SemanticColors.button.secondary.backgroundHover,
        borderColor: SemanticColors.button.secondary.borderHover,
      },
    },
  },
});

const invertedVariantStyles = variant({
  variants: {
    primary: {
      color: SemanticColors.button.primary.textInverted,
      background: SemanticColors.button.primary.backgroundInverted,

      '&:hover': {
        color: SemanticColors.button.primary.textHoverInverted,
        background: SemanticColors.button.primary.backgroundHoverInverted,
      },
    },
    secondary: {
      color: SemanticColors.button.secondary.textInverted,
      background: SemanticColors.button.secondary.backgroundInverted,
      borderColor: SemanticColors.button.secondary.borderInverted,

      '&:hover': {
        color: SemanticColors.button.secondary.textHoverInverted,
        background: SemanticColors.button.secondary.backgroundHoverInverted,
        borderColor: SemanticColors.button.secondary.borderHoverInverted,
      },
    },
  },
});

export const Button = styled.button<ButtonProps>`
  font-family: Avenir;
  align-items: center;
  background: transparent;
  border-radius: 0.5rem;
  border: 0.0625rem solid transparent;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  text-align: center;
  text-decoration: none;

  font-weight: 600;
  font-size: 1rem;

  height: 2.5rem;
  min-width: 3rem;
  padding: 1.5rem 1.5rem;
  line-height: 1.5rem;

  &:disabled {
    cursor: not-allowed;
    color: COLOR;
    background: COLOR;
    bordercolor: none;
  }

  transition: background ease 200ms, border-color ease 200ms, color ease 200ms,
    fill ease 200ms;

  ${compose(margin, width)}
  ${({ inverted }) => (inverted ? invertedVariantStyles : variantStyles)};
`;

Button.defaultProps = {
  variant: 'primary',
  inverted: false,
};
