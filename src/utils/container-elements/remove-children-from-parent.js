export const removeChildrenFromParent = (parent, children) => {
  if (parent && children) {
    try {
      children.forEach((child) => {
        parent.removeChild(child);
      })
    } catch {}
  }
}