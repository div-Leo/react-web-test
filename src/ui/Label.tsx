import styled from 'styled-components';
import {
  compose,
  fontSize,
  FontSizeProps,
  margin,
  MarginProps,
  ResponsiveValue,
  variant,
} from 'styled-system';
import { SemanticColors } from '../styles/colors';

export interface LabelProps extends FontSizeProps, MarginProps {
  variant?: ResponsiveValue<'default' | 'info'>;
}

const variantStyles = variant({
  variants: {
    default: {
      color: SemanticColors.label.text,
      backgroundColor: SemanticColors.label.secondary,
    },
    info: {
      color: SemanticColors.label.text,
      backgroundColor: SemanticColors.label.primary,
    },
  },
});

export const Label = styled.span<LabelProps>`
  display: inline-block;
  box-sizing: border-box;
  font-size: 0.825rem;
  border-radius: 1rem;
  font-weight: 600;
  padding: 0.125rem 1rem;

  ${compose(variantStyles, margin, fontSize)}
`;

Label.defaultProps = {
  variant: 'default',
};
