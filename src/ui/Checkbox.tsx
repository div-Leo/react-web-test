import React, { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { MarginProps, margin, compose } from 'styled-system';

import { Text } from './Text';
import { SemanticColors } from '../styles/colors';

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'>, MarginProps {
  label?: ReactNode;
}

type LabelWrapperProps = MarginProps & {
  disabled?: boolean;
  error?: boolean;
  indeterminate?: boolean;
};

const WithTapAreaWrapper = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;

    height: 1rem;
    margin: 0 0.5rem 0 0;
`;

export const Checkbox: FC<CheckboxProps> = ({ disabled, label, ...rest }) => {

  let dynamicLabel: ReactNode = label;
  const styledSystemProps = { ...margin(rest) };

  if (typeof label === 'string') {
    dynamicLabel = (
      <Text onClick={(e) => e.stopPropagation()} fontSize='medium'>
        {label}
      </Text>
    );
  }

  const checkboxRef = React.createRef<HTMLInputElement>();

  return (
    <LabelWrapper
      disabled={disabled}
      {...styledSystemProps}
    >
      <WithTapAreaWrapper>
        <TapArea />
        <Checkmark ref={checkboxRef} type="checkbox" disabled={disabled} {...rest} />
      </WithTapAreaWrapper>
      {dynamicLabel}
    </LabelWrapper>
  );
};


const Checkmark = styled.input`
    appearance: none;
    outline-offset: 0.25rem;
    border: none;

    position: relative;

    width: 1rem;
    height: 1rem;
    padding: 0;
    margin: 0;

    background-color: ${SemanticColors.checkbox.background.default};

    box-shadow: inset 0 0 0 0.125rem ${SemanticColors.checkbox.border.default};
    border-radius: 0.3rem;
    transition: background-color 100ms, box-shadow 100ms;
    cursor: pointer;

    vertical-align: text-bottom;

    &::after {
        content: ' ';

        background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath d='M3.711 8.037a1.051 1.051 0 0 1 1.485-.063l1.411 1.297 4.113-4.806a1.051 1.051 0 1 1 1.597 1.367l-4.63 5.41a1.333 1.333 0 0 1-1.916.116L3.774 9.522a1.051 1.051 0 0 1-.063-1.485z' id='a'/%3E%3C/defs%3E%3Cuse fill='%23FFF' fill-rule='nonzero' xlink:href='%23a'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: cover;
        width: 1rem;
        height: 1rem;

        position: absolute;
        top: 50%;
        left: 45%;

        opacity: 0;
        visibility: hidden;
        transform: translate(-45%, -40%) scale(0.2);
        transition: visibility 175ms, opacity 150ms, scale 175ms, transform 175ms;
    }

    &:checked {
        background-color: ${SemanticColors.checkbox.background.highlighted};
        box-shadow: inset 0 0 0 0.125rem ${SemanticColors.checkbox.border.highlighted};

        &::after {
            opacity: 1;
            visibility: visible;
            transform: translate(-45%, -50%) scale(1);
        }
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${SemanticColors.checkbox.background.disabled};
        box-shadow: inset 0 0 0 0.125rem ${SemanticColors.checkbox.border.disabled};

        &:hover {
            box-shadow: inset 0 0 0 0.125rem ${SemanticColors.checkbox.border.disabled};
        }

        &:active {
            background-color: ${SemanticColors.checkbox.background.disabled};
        }
    }
`;

const TapArea = styled.div`
    position: absolute;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 0.3rem;
    background-color: transparent;
    top: -0.375rem;
    left: -0.375rem;
    transition: background-color 125ms;
`;

const hoverStyle = ({ disabled }: LabelWrapperProps) => {
  if (disabled) {
    return css`
            cursor: not-allowed;

            & > ${/* sc-selector */ TapArea}:active {
                background-color: transparent;
            }
        `;
  }
  return css`
        cursor: pointer;

        & ${/* sc-selector */ TapArea}:not(:active) {
            background-color: ${SemanticColors.checkbox.background.hover};
        }

        & ${/* sc-selector */ Checkmark}:not(:checked) {
            box-shadow: inset 0 0 0 0.125rem ${SemanticColors.checkbox.border.default};
            background-color: ${SemanticColors.checkbox.background.default};
        }
    `;
};

const LabelWrapper = styled.label<LabelWrapperProps>`
    display: inline-flex;
    position: relative;
    user-select: none;
    line-height: 1;
    align-items: center;
    color: ${SemanticColors.checkbox.text.primary};

    &:hover {
        ${hoverStyle}
    }

    ${compose(margin)}
`;