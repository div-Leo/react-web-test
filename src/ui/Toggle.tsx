import { useReducer } from "react";
import styled from "styled-components";
import { MarginProps } from "styled-system";

import { SemanticColors } from "../styles/colors";

function _toggle(currentValue: boolean, newValue: boolean) {
  return typeof newValue === "boolean" ? newValue : !currentValue;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToggle(initialValue = false) {
  return useReducer(_toggle, initialValue);
}

type Disabled = {
  disabled?: boolean
}

export interface ToggleProps extends MarginProps, Disabled {
  checked?: boolean
}


const Slide = styled.div<Disabled>`
  font-size: 28px;
  width: 1.75em;
  height: 1em;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background: ${(props) => (props.disabled ? SemanticColors.toggle.disabled.background : SemanticColors.toggle.enabled.background)};
  display: inline-block;
  border-radius: 0.5em;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 1em;
    height: 1em;
    background: ${(props: Disabled) => (props.disabled ? SemanticColors.toggle.disabled.before : SemanticColors.toggle.enabled.before)};
    border-radius: 50%;
    box-shadow: 0 0 0.0625em 0 rgba(0, 0, 0, 0.05),
      0 0.0625em 0.1875em 0 rgba(0, 0, 0, 0.4);
    transform: translateX(0);
    transition: transform 200ms;
  }
  &::after {
    content: "";
    display: block;
    border-radius: 0.5em;
    width: 1em;
    height: 1em;
    background-color: ${(props) => (props.disabled ? SemanticColors.toggle.disabled.after : SemanticColors.toggle.enabled.after)};
    transition: width 200ms;
  }
`;

const Input = styled.input`
  height: 0;
  width: 0;
  margin: 0;
  visibility: hidden;
  &:checked + ${Slide}::before {
    transform: translateX(calc(100% - 0.25em));
  }
  &:checked + ${Slide}::after {
    width: 1.75em;
  }
`;


const Label = styled.label<ToggleProps>`
  display: flex;
  align-items: center;
  cursor: ${(props: ToggleProps) => (props.disabled ? "not-allowed" : "pointer")};
  user-select: none;
`;


export const Toggle: React.FC<ToggleProps> = ({ disabled, checked, ...rest }) => {
  return (
    <Label {...rest} disabled={disabled}>
      <Input type="checkbox" checked={checked} disabled={disabled} />
      <Slide disabled={disabled} />
    </Label>
  );
}

Toggle.defaultProps = {
  disabled: false,
};