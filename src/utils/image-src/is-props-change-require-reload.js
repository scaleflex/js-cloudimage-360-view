import { PROPS_REQUIRE_RELOAD } from "../../constants/props-require-reload";

export const isPropsChangeRequireReload = (currentProps, changedProps) => (
  Object.keys(changedProps)
    .reduce((acc, current) => {
      const isPropChanged = currentProps[current] !== changedProps[current];
      const isSrcProp = PROPS_REQUIRE_RELOAD.includes(current);

      if (isSrcProp && isPropChanged) {
        acc = true;
      }

      return acc;
    }, false)
);