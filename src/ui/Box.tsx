import styled from 'styled-components';
import shouldForwardProp from '@styled-system/should-forward-prop';
import {
  background,
  BackgroundProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
} from 'styled-system';

export interface BoxProps
  extends SpaceProps,
    LayoutProps,
    PositionProps,
    FlexboxProps,
    BackgroundProps,
    TextAlignProps {}

export const Box = styled('div').withConfig({
  shouldForwardProp: shouldForwardProp,
})<BoxProps>`
  ${compose(space, layout, position, flexbox, background, textAlign)}
`;
