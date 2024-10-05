import { ComponentPropsWithoutRef, FC, useId } from 'react';
import styled, { css } from 'styled-components';
import { compose, margin, MarginProps, width, WidthProps } from 'styled-system';
import { SemanticColors } from '../styles/colors';


interface BaseInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'width'> {
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
}

export interface InputProps extends BaseInputProps, WidthProps, MarginProps {
  placeholder?: string;
}


const ANIMATION_DURATION = 100;

const InputWrapper = styled.div<WidthProps & MarginProps>`
    display: inline-block;
    position: relative;
    box-sizing: border-box;

    ${compose(margin, width)}
`;

const getErrorStyles = ({ error }: BaseInputProps) => {
  if (error) {
    return css`
      border-color: ${SemanticColors.input.border.error};
      box-shadow: inset 0 0 0 0.0625rem ${SemanticColors.input.border.error};
    `
  }

  return undefined;
};

const disabledStyles = css<BaseInputProps>`
    border-color: ${SemanticColors.input.border.disabled};
    color: ${SemanticColors.input.text.disabled};
    cursor: not-allowed;

    &:active,
    &:focus {
      border-color: ${SemanticColors.input.border.disabled};
      color: ${SemanticColors.input.text.disabled};
      box-shadow: none;
    }
`;

const InnerInput: FC<BaseInputProps> = styled.input.attrs({ type: 'text' }) <BaseInputProps>`
    margin: 0;
    box-sizing: border-box;
    background: ${SemanticColors.input.background.primary};
    color: ${SemanticColors.input.text.primary};
    font-size: 1rem;
    transition: box-shadow ${ANIMATION_DURATION}ms, border ${ANIMATION_DURATION}ms;
    outline: none;
    appearance: none;
    width: 100%;
    height: 2.5rem;
    padding: 0.75rem;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    border-radius: 0.3rem;
    border: 0.1rem solid ${SemanticColors.input.border.primary};
    
    &:active, 
    &:focus {
      border-color: ${SemanticColors.input.border.highlighted};
      box-shadow: inset 0 0 0 0.1rem ${SemanticColors.input.border.highlighted};
    }
    
    ${getErrorStyles}
    
    &:-moz-focusring {
        outline: none;
        text-shadow: none;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-text-fill-color: ${SemanticColors.input.text.highlighted};
        transition: background-color 99999999ms ease 99999999ms;
    }

    ${p => (p.disabled ? disabledStyles : undefined)}
`;

export const Input: React.FC<InputProps> = ({ placeholder, error, ...rest }: InputProps) => {
  const styledSystemProps = { ...margin(rest), ...width(rest) };

  const id = useId();

  return (
    <InputWrapper {...styledSystemProps}>
      <InnerInput id={id} error={error} placeholder={placeholder} {...rest} />
    </InputWrapper>
  );
};
