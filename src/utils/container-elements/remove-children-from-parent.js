export const removeChildrenFromParent = (parent, children) => {
  if (parent && children) {
    try {
      children.forEach((child) => {
        parent.removeChild(child);
      });
    // eslint-disable-next-line no-empty
    } catch { }
  }
};
