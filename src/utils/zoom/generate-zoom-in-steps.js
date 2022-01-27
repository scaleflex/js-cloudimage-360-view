export const generateZoomInSteps = (zoomIntenisty) => {
  const transitionStepsFactor = 20;

  return Array.from(Array(transitionStepsFactor))
    .reduce((acc, _, index) => {
      const previousIndex = index - 1;
      const previousValue = previousIndex < 0 ? 1 : acc[index - 1];

      const step = (previousValue) + ((zoomIntenisty - 1) / (transitionStepsFactor));
      const stepFixedValue = +step.toFixed(2);

      (acc || []).push(stepFixedValue);

      return acc;
    }, []);
};
