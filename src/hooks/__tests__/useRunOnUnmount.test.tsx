import { act, useState } from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import {useRunOnUnmount} from '../useRunOnUnmount';


describe('useRunOnUnmount', () => {
  afterEach(cleanup);

  it('should call the callback only on unmount', () => {
    const callback = jest.fn();

    const Component = () => {
      useRunOnUnmount(callback);
      return <div>Test Component</div>;
    };

    const { unmount } = render(<Component />);
    
    expect(callback).not.toHaveBeenCalled();
    unmount();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should have access to the latest state value on unmount', () => {
    let latestStateOnUnmount = null;
    const Component = () => {
      const [state, setState] = useState(0);

      useRunOnUnmount(() => {
        latestStateOnUnmount = state;
      });

      return (
        <div>
          <button onClick= {() => setState(1)}> 
            Update State 
          </button>
        </div>
      );
    };

    const { unmount, getByText } = render(<Component />);

    act(() => {
      getByText('Update State').click();
    });
    expect(latestStateOnUnmount).toBe(null);

    unmount();
    expect(latestStateOnUnmount).toBe(1);
  });

  it('should not call the callback when state or props change', () => {
    const callback = jest.fn();

    const Component = () => {
      const [state, setState] = useState(0);

      useRunOnUnmount(callback);

      return (
        <div>
          <button onClick= {() => setState((prev) => prev + 1)}> 
            Increment 
          </button>
          < div > State: { state } </div>
        </div>
      );
    };

    const { getByText, unmount } = render(<Component />);
    act(() => {
      getByText('Increment').click();
      getByText('Increment').click();
    });

    expect(callback).not.toHaveBeenCalled();

    unmount();
    expect(callback).toHaveBeenCalledTimes(1);
    });
});
