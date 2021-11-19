import {
  border,
  borderLeft,
  borderBottom,
  borderRight,
  borderTop,
  borderColor,
  borderStyle,
  borderRadius,
  borderWidth,
  gap,
  margin,
  padding,
} from './shorthands/index';

export const shorthands = {
  border,
  borderLeft,
  borderBottom,
  borderRight,
  borderTop,
  borderColor,
  borderStyle,
  borderRadius,
  borderWidth,
  gap,
  margin,
  padding,
};

export { createDOMRenderer } from './renderer/createDOMRenderer';
export { styleBucketOrdering } from './renderer/getStyleSheetForBucket';
export { rehydrateRendererCache } from './renderer/rehydrateRendererCache';

export { mergeClasses } from './mergeClasses';
export { makeStaticStyles } from './makeStaticStyles';
export { makeStyles } from './makeStyles';
export { resolveStyleRulesForSlots } from './resolveStyleRulesForSlots';

// Private exports, are used by build time transforms
export { createCSSVariablesProxy, resolveProxyValues } from './runtime/createCSSVariablesProxy';
export { resolveStyleRules } from './runtime/resolveStyleRules';
export { __styles } from './__styles';

export * from './constants';
export type {
  // Static styles
  MakeStaticStylesStyle,
  MakeStaticStyles,
  // Styles
  MakeStylesAnimation,
  MakeStylesStyle,
  MakeStylesStyleRule,
  MakeStylesStyleFunctionRule,
  // Internal types
  CSSClasses,
  CSSClassesMapBySlot,
  CSSRulesByBucket,
  StyleBucketName,
  // Util
  MakeStaticStylesOptions,
  MakeStylesOptions,
  MakeStylesRenderer,
} from './types';
