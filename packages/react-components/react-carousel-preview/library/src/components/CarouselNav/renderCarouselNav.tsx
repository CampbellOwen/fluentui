/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselNavState, CarouselNavSlots } from './CarouselNav.types';
import { CarouselNavContextProvider, CarouselNavContextValues } from './CarouselNavContext';

/**
 * Render the final JSX of CarouselNav
 */
export const renderCarouselNav_unstable = (state: CarouselNavState, contextValues: CarouselNavContextValues) => {
  assertSlots<CarouselNavSlots>(state);
  const { totalSlides, renderNavButton } = state;

  return (
    <state.root>
      {new Array(totalSlides).fill(null).map((_, index) => (
        <CarouselNavContextProvider
          value={{ ...contextValues.carouselNav, index }}
          key={`CarouselNavContextProvider-${index}`}
        >
          {renderNavButton(index)}
        </CarouselNavContextProvider>
      ))}
    </state.root>
  );
};
