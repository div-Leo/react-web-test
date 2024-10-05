import { ComponentPropsWithoutRef, FC, useId } from 'react';
import styled, { css } from 'styled-components';
import { compose, margin, MarginProps, width, WidthProps } from 'styled-system';
import { SemanticColors } from '../styles/colors';
interface BaseSelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'size'> {
  error?: boolean;
}

export interface SelectProps extends BaseSelectProps, WidthProps, MarginProps {
  placeholder?: string;
}

const ANIMATION_DURATION = 100;

const SelectWrapper = styled.div<WidthProps & MarginProps>`
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    min-width: 250px;

    ${compose(margin, width)}
`;

export const Select: React.FC<SelectProps> = ({ children, placeholder, error, ...rest }: SelectProps) => {
  const styledSystemProps = { ...margin(rest), ...width(rest) };

  const id = useId();

  return (
    <SelectWrapper {...styledSystemProps}>
      <SelectInput id={id} error={error} {...rest}>
        {placeholder ? <option disabled value="">{placeholder}</option> : undefined}
        {children}
      </SelectInput>
    </SelectWrapper>
  );
};

const getErrorStyles = ({ error }: BaseSelectProps) => {
  if (error) {
    return css`
      border-color: ${SemanticColors.select.border.error};
      box-shadow: inset 0 0 0 0.0625rem ${SemanticColors.select.border.error};
    `
  }

  return undefined;
};

const disabledStyles = css<BaseSelectProps>`
    border-color: ${SemanticColors.select.border.disabled};
    color: ${SemanticColors.select.text.disabled};
    cursor: not-allowed;
`;

const SelectInput: FC<BaseSelectProps> = styled.select<BaseSelectProps>`
    margin: 0;
    box-sizing: border-box;
    background: ${SemanticColors.select.background.primary};
    color: ${SemanticColors.select.text.primary};
    font-size: 1rem;
    transition: box-shadow ${ANIMATION_DURATION}ms, border ${ANIMATION_DURATION}ms;
    outline: none;
    appearance: none;
    width: 100%;
    height: 2.75rem;
    padding: 0.75rem;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    border-radius: 0.3rem;
    border: 0.1rem solid ${SemanticColors.select.border.primary};
    
    &:active, 
    &:focus {
      border-color: ${SemanticColors.select.border.highlighted};
      box-shadow: inset 0 0 0 0.1rem ${SemanticColors.select.border.highlighted};

  }}
    ${getErrorStyles}
    ${p => (p.disabled ? disabledStyles : undefined)}
    &:-moz-focusring {
        outline: none;
        text-shadow: none;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-text-fill-color: ${SemanticColors.select.text.highlighted};
        transition: background-color 99999999ms ease 99999999ms;
    }
`;

