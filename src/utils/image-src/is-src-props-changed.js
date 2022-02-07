import { IMAGE_SRC_PROPS } from "../../constants/image-src-props";

export const isSrcPropsChanged = (currentProps, changedProps) => (
  Object.keys(changedProps)
    .reduce((acc, current) => {
      const isPropChanged = currentProps[current] !== changedProps[current];
      const isSrcProp = IMAGE_SRC_PROPS.includes(current);

      if (isSrcProp && isPropChanged) {
        acc = true;
      }

      return acc;
    }, false)
);