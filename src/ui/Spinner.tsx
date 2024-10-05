import styled, { keyframes } from "styled-components";
import { SemanticColors } from '../styles/colors';

import {
  height,
  HeightProps,
  width,
  WidthProps,
  margin,
  MarginProps,
  compose,
} from 'styled-system';

export interface SpinnerProps extends
  HeightProps,
  WidthProps,
  MarginProps { }

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div<SpinnerProps>`
  animation: ${rotate360} 1.5s linear infinite;
  transform: translateZ(0);
  
  border-top: 3px solid ${SemanticColors.border.secondary};
  border-right: 3px solid ${SemanticColors.border.secondary};
  border-bottom: 3px solid ${SemanticColors.border.secondary};
  border-left: 3px solid ${SemanticColors.border.primary};
  background: transparent;
  border-radius: 50%;

  width: 1.5rem;
  height: 1.5rem;

  ${compose(width, height, margin)}
`;
