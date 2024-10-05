import React, { ReactNode, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { compose, width, WidthProps } from 'styled-system';
import { SemanticColors } from '../styles/colors';

type DismissFunc = () => void;

const DismissContext = React.createContext<DismissFunc>(() => null);

// eslint-disable-next-line react-refresh/only-export-components
export const useModalDismiss = (): DismissFunc => {
  const dismiss = useContext(DismissContext);

  if (dismiss === undefined) {
    throw new Error('useModalDismiss must be used within a <Modal />');
  }

  return dismiss;
};

export interface ModalProps extends WidthProps {
  onClose?: () => void;
  children?: ReactNode | ((dismiss: DismissFunc) => ReactNode);
}

const PreventBackgroundScroll = createGlobalStyle`
    body {
        overflow: hidden;
    }
`;

const TopRightXIcon = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;
  width: 1.25rem;
  height: 1.25rem;
  cursor pointer;

  &:before, 
  &:after {
    position: absolute;
    top: 0.5rem;
    content: '';
    width: 100%;
    border-top: 0.125rem solid ${SemanticColors.icon.secondary};
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const DimmingFade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  background: ${SemanticColors.background.inverted};
  opacity: 0.5;
`;

const CenteredCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
  box-sizing: border-box;
  background-color: ${SemanticColors.background.primary};
  border-radius: 0.5rem;
  padding: 3.5rem 2.25rem 2.25rem 2.25rem;
  box-shadow: 0 0 0.75rem 0.25rem rgba(0, 0, 0, 0.12);

  ${compose(width)};
`;

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  ...rest
}: ModalProps) => {
  const handleClose: DismissFunc = () => {
    if (onClose) onClose();
  };

  const handleDimmingClick = () => {
    handleClose();
  };

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(handleClose);
    }
    return children;
  };

  return (
    <DismissContext.Provider value={handleClose}>
      <DimmingFade onClick={handleDimmingClick} />
      <CenteredCard {...rest}>
        {<TopRightXIcon onClick={handleClose} />}
        {renderChildren()}
      </CenteredCard>
      <PreventBackgroundScroll />
    </DismissContext.Provider>
  );
};

Modal.defaultProps = {
  width: ['20rem', '25rem'],
};
