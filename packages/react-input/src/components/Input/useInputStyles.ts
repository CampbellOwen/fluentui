import { macros, makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { InputState } from './Input.types';
import type { Theme } from '@fluentui/react-theme';

// TODO(sharing) use theme values once available
const horizontalSpacing = {
  xxs: '2px',
  xs: '4px',
  sNudge: '6px',
  s: '8px',
  mNudge: '10px',
  m: '12px',
};
const contentSizes = {
  // TODO(sharing) shouldn't these be in the theme?
  body1: (theme: Theme) => ({
    fontSize: theme.fontSizeBase300,
    lineHeight: theme.lineHeightBase300,
  }),
  caption1: (theme: Theme) => ({
    fontSize: theme.fontSizeBase200,
    lineHeight: theme.lineHeightBase200,
  }),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  400: (theme: Theme) => ({
    fontSize: theme.fontSizeBase400,
    lineHeight: theme.lineHeightBase400,
  }),
};
// TODO(sharing) should these be shared somewhere?
const fieldHeights = {
  small: '24px',
  medium: '32px',
  large: '40px',
};

const useRootStyles = makeStyles({
  base: theme => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'no-wrap',
    gap: horizontalSpacing.xxs,
    fontFamily: theme.fontFamilyBase,
    // used for all but underline
    ...macros.borderRadius(theme.borderRadiusMedium),
    boxSizing: 'border-box',
    '*, *:before, *:after': {
      boxSizing: 'border-box',
    },
  }),
  small: theme => ({
    minHeight: fieldHeights.small,
    ...macros.padding('0', horizontalSpacing.sNudge),
    ...contentSizes.caption1(theme),
  }),
  medium: theme => ({
    minHeight: fieldHeights.medium,
    ...macros.padding('0', horizontalSpacing.mNudge),
    ...contentSizes.body1(theme),
  }),
  large: theme => ({
    minHeight: fieldHeights.large,
    ...macros.padding('0', horizontalSpacing.m),
    ...contentSizes[400](theme),
    gap: horizontalSpacing.sNudge,
  }),
  inline: {
    display: 'inline-flex',
  },
  outline: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
    ...macros.border('1px', 'solid', theme.colorNeutralStroke1),
    borderBottomColor: theme.colorNeutralStrokeAccessible,
  }),
  underline: theme => ({
    backgroundColor: theme.colorTransparentBackground,
    // corners look strange if rounded
    ...macros.borderRadius(0),
    ...macros.border('bottom', '1px', 'solid', theme.colorNeutralStrokeAccessible),
  }),
  filled: theme => ({
    boxShadow: theme.shadow2, // optional shadow for filled appearances
  }),
  filledDarker: theme => ({
    backgroundColor: theme.colorNeutralBackground3,
  }),
  filledLighter: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
  }),
  disabled: theme => ({
    cursor: 'not-allowed',
    ...macros.border('1px', 'solid', 'theme.colorNeutralStrokeDisabled'),
    // because underline doesn't usually have a radius
    ...macros.borderRadius(theme.borderRadiusMedium),
  }),
});

const useInputElementStyles = makeStyles({
  base: theme => ({
    flexGrow: 1,
    ...macros.borderStyle('none'), // input itself never has a border (this is handled by inputWrapper)
    ...macros.padding('0', horizontalSpacing.xxs),
    color: theme.colorNeutralForeground1,
    // Use literal "transparent" (not from the theme) to always let the color from the root show through
    backgroundColor: 'transparent',

    '::placeholder': {
      color: theme.colorNeutralForeground4,
      opacity: 1, // browser style override
    },
    ':focus-visible': {
      outlineStyle: 'none', // disable default browser outline
    },
  }),
  small: theme => ({
    // This is set on root but doesn't inherit
    ...contentSizes.caption1(theme),
  }),
  medium: theme => ({
    ...contentSizes.body1(theme),
  }),
  large: theme => ({
    ...contentSizes[400](theme),
    ...macros.padding('0', horizontalSpacing.sNudge),
  }),
  disabled: theme => ({
    color: theme.colorNeutralForegroundDisabled,
    backgroundColor: theme.colorTransparentBackground,
    cursor: 'not-allowed',
    '::placeholder': {
      color: theme.colorNeutralForegroundDisabled,
    },
  }),
});

const useContentStyles = makeStyles({
  base: theme => ({
    color: theme.colorNeutralForeground3, // "icon color" in design spec
    // special case styling for icons (most common case) to ensure they're centered vertically
    '> span > svg': { display: 'block' },
  }),
  disabled: theme => ({
    color: theme.colorNeutralForegroundDisabled,
  }),
});

/**
 * Apply styling to the Input slots based on the state
 */
export const useInputStyles = (state: InputState): InputState => {
  const { fieldSize = 'medium', appearance = 'outline' } = state;
  const disabled = state.input.disabled;
  const filled = appearance.startsWith('filled');

  const rootStyles = useRootStyles();
  const inputStyles = useInputElementStyles();
  const contentStyles = useContentStyles();

  state.root.className = mergeClasses(
    rootStyles.base,
    rootStyles[fieldSize],
    rootStyles[appearance],
    state.inline && rootStyles.inline,
    filled && rootStyles.filled,
    disabled && rootStyles.disabled,
    state.root.className,
  );

  state.input.className = mergeClasses(
    inputStyles.base,
    inputStyles[fieldSize],
    disabled && inputStyles.disabled,
    state.input.className,
  );

  const contentClasses = [contentStyles.base, disabled && contentStyles.disabled];
  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(...contentClasses, state.contentBefore.className);
  }
  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(...contentClasses, state.contentAfter.className);
  }

  return state;
};
