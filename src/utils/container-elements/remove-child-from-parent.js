export const removeChildFromParent = (parent, child) => {
  if (parent && child) {
    try {
      parent.removeChild(child);
    } catch {}
  }
}