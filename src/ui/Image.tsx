import styled from 'styled-components';
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
} from 'styled-system';

export interface ImageProps
  extends SpaceProps,
  LayoutProps,
  PositionProps,
  FlexboxProps,
  BackgroundProps { }

export const Image = styled.img.attrs({ loading: "lazy" }) <ImageProps>`
  ${compose(space, layout, position, flexbox, background)}
`;
