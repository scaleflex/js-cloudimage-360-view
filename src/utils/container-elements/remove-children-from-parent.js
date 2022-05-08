export const removeChildrenFromParent = (parent, children) => {
  if (parent && children) {
    children.forEach((child) => {
      try {
        parent.removeChild(child);
        // eslint-disable-next-line no-empty
      } catch { }
    });
  }
};
