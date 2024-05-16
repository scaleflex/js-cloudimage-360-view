import "core-js/features/array/for-each";
import "core-js/features/array/filter";
import "core-js/features/array/includes";
import CI360Viewer from "./ci360.service";
import { isTrue } from "./ci360.utils";

function generateContainerId(view) {
  if (!view.id) {
    const uniqueId = Math.floor(Math.random() * 10000);
    view.id = `cloudimage-360-view-${uniqueId}`;
  }
  return view;
}

function init() {
  const viewers = Array.from(
    document.querySelectorAll(".cloudimage-360:not(.initialized)")
  )
    .map((view) => {
      const containerWithId = generateContainerId(view);
      if (!isTrue(containerWithId, "hotspots")) {
        return new CI360Viewer(containerWithId);
      }
      return null;
    })
    .filter(Boolean);

  window.CI360._viewers = viewers;
}

function destroy() {
  if (isNoViewers()) return;

  window.CI360._viewers.forEach((viewer) => viewer.destroy());
  window.CI360._viewers = [];
}

function getActiveIndexByID(id, orientation) {
  if (isNoViewers()) return null;

  const currentViewer = window.CI360._viewers.find(
    (viewer) => viewer.id === id
  );
  if (!currentViewer) return null;

  return orientation === "y"
    ? currentViewer.activeImageY - 1
    : currentViewer.activeImageX - 1;
}

function add(id) {
  const view360Array = Array.from(
    document.querySelectorAll(".cloudimage-360:not(.initialized)")
  );

  if (view360Array.length && id) {
    const newViewContainer = view360Array.find((viewer) => viewer.id === id);
    if (newViewContainer) {
      window.CI360._viewers.push(new CI360Viewer(newViewContainer));
    }
  }
}

function update(id = null, forceUpdate = false, hotSpotConfigs = null) {
  const activeViews = window.CI360._viewers;

  if (id) {
    const currentActiveView = activeViews.find((viewer) => viewer.id === id);

    if (currentActiveView) {
      if (hotSpotConfigs) {
        const targetView = document.querySelector(
          `.cloudimage-360[id="${id}"]`
        );

        if (targetView) {
          targetView.setAttribute("data-hotspots", true);
        }
      }

      currentActiveView.updateView(forceUpdate, activeViews, hotSpotConfigs);
    }
  } else {
    activeViews.forEach((viewer) =>
      viewer.updateView(forceUpdate, activeViews)
    );
  }
}

function isNoViewers() {
  return !(window.CI360._viewers && window.CI360._viewers.length > 0);
}

function addHotspots(id, config) {
  const notInitializedContainer = Array.from(
    document.querySelectorAll(".cloudimage-360:not(.initialized)")
  ).find((view) => view.id === id);

  if (notInitializedContainer) {
    notInitializedContainer.setAttribute("data-hotspots", true);
    window.CI360._viewers.push(
      new CI360Viewer(notInitializedContainer, false, config)
    );
  } else {
    update(id, false, config);
  }
}

window.CI360 = window.CI360 || {};
Object.assign(window.CI360, {
  init,
  destroy,
  getActiveIndexByID,
  update,
  add,
  addHotspots,
});

if (!window.CI360.notInitOnLoad) {
  init();
}
