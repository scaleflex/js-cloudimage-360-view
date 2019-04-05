const get360ViewProps = (image) => ({
  folder: attr(image, 'folder') || attr(image, 'data-folder') || '/',
  filename: attr(image, 'filename') || attr(image, 'data-filename') || 'image-{index}.jpg',
  amount: parseInt(attr(image, 'amount') || attr(image, 'data-amount') || 36, 10),
  speed: parseInt(attr(image, 'speed') || attr(image, 'data-speed') || 150, 10),
  keys: (attr(image, 'keys') !== null) || (attr(image, 'data-keys') !== null),
  boxShadow: attr(image, 'box-shadow') || attr(image, 'data-box-shadow'),
  autoplay: (attr(image, 'autoplay') !== null) || (attr(image, 'data-autoplay') !== null),
  autoplayReverse: (attr(image, 'autoplay-reverse') !== null) || (attr(image, 'data-autoplay-reverse') !== null),
  bottomCircle: (attr(image, 'bottom-circle') !== null) || (attr(image, 'data-bottom-circle') !== null),
  bottomCircleOffset: parseInt(attr(image, 'bottom-circle-offset') || attr(image, 'data-bottom-circle-offset') || 5, 10)
});

const attr = (element, attribute) => element.getAttribute(attribute);

const set360ViewIconStyles = (view360Icon) => {
  view360Icon.style.position = 'absolute';
  view360Icon.style.top = '0';
  view360Icon.style.bottom = '0';
  view360Icon.style.left = '0';
  view360Icon.style.right = '0';
  view360Icon.style.width = '100px';
  view360Icon.style.height = '100px';
  view360Icon.style.margin = 'auto';
  view360Icon.style.backgroundColor = 'rgba(255,255,255,0.8)';
  view360Icon.style.borderRadius = '50%';
  view360Icon.style.boxShadow = 'rgb(255, 255, 255, 0.5) 0px 0px 4px';
  view360Icon.style.transition = '0.5s all';
  view360Icon.style.color = 'rgb(164,164,164)';
  view360Icon.style.textAlign = 'center';
  view360Icon.style.lineHeight = '100px';
};

const setView360Icon = (view360Icon) => {
  view360Icon.style.background = `rgba(255,255,255,0.8) url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojQjNCM0IzO30NCjwvc3R5bGU+DQo8Zz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzQuMywzNC4yTDMyLDMzLjdjMC43LTIuMywyLjQtMy41LDQuOS0zLjVjMS41LDAsMi42LDAuMywzLjQsMWMwLjgsMC43LDEuMywxLjYsMS4zLDIuOA0KCQljMCwxLjUtMC44LDIuNi0yLjUsMy4yYzIsMC41LDIuOSwxLjYsMi45LDMuNWMwLDEuMy0wLjUsMi40LTEuNSwzLjFjLTEsMC44LTIuMiwxLjEtMy43LDEuMWMtMS40LDAtMi41LTAuMy0zLjUtMC45DQoJCWMtMS0wLjYtMS42LTEuNi0xLjgtMi45bDIuMy0wLjVjMC40LDEuNiwxLjQsMi40LDIuOSwyLjRjMC43LDAsMS4zLTAuMiwxLjgtMC42YzAuNS0wLjQsMC44LTEuMSwwLjgtMS45YzAtMC43LTAuMi0xLjMtMC43LTEuNw0KCQljLTAuNS0wLjQtMS4zLTAuNy0yLjUtMC43aC0xdi0xLjdoMWMwLjcsMCwxLjItMC4xLDEuNi0wLjJzMC43LTAuMywwLjktMC43czAuNC0wLjgsMC40LTEuNGMwLTAuNy0wLjItMS4yLTAuNi0xLjYNCgkJQzM4LDMyLjIsMzcuNSwzMiwzNi44LDMyQzM1LjUsMzIsMzQuNiwzMi43LDM0LjMsMzQuMnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTQuOCwzMy43bC0yLjIsMC42Yy0wLjQtMS41LTEuMi0yLjMtMi40LTIuM2MtMSwwLTEuNywwLjUtMi4yLDEuNHMtMC43LDIuMy0wLjgsNC4yYzAuNy0xLjQsMS44LTIuMSwzLjQtMi4xDQoJCWMxLjIsMCwyLjMsMC40LDMuMSwxLjNzMS4zLDIsMS4zLDMuNGMwLDEuNS0wLjUsMi42LTEuNCwzLjVjLTAuOSwwLjktMi4xLDEuMy0zLjYsMS4zYy0xLjYsMC0yLjktMC42LTMuOC0xLjcNCgkJYy0xLTEuMS0xLjUtMi45LTEuNS01LjRjMC0yLjUsMC41LTQuNCwxLjUtNS44YzEtMS4zLDIuMy0yLDQtMmMxLjEsMCwyLjEsMC4zLDIuOSwwLjhDNTMuOSwzMS42LDU0LjUsMzIuNSw1NC44LDMzLjd6IE01Mi40LDQwLjMNCgkJYzAtMS0wLjItMS43LTAuNi0yLjJjLTAuNC0wLjUtMS0wLjctMS43LTAuN2MtMC44LDAtMS41LDAuMy0xLjksMC44Yy0wLjQsMC42LTAuNywxLjItMC43LDIuMWMwLDAuOCwwLjIsMS41LDAuNywyLjENCgkJYzAuNSwwLjUsMS4xLDAuOCwxLjksMC44QzUxLjYsNDMuMiw1Mi40LDQyLjIsNTIuNCw0MC4zeiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02Ny4xLDM3LjVjMCwyLjctMC40LDQuNi0xLjMsNS44Yy0wLjksMS4yLTIuMiwxLjgtMy45LDEuOGMtMy41LDAtNS4yLTIuNC01LjItNy4zYzAtMi43LDAuNC00LjYsMS4zLTUuOA0KCQljMC45LTEuMiwyLjItMS44LDMuOS0xLjhDNjUuMywzMC4yLDY3LjEsMzIuNiw2Ny4xLDM3LjV6IE02NC4zLDM3LjZjMC0yLjEtMC4yLTMuNi0wLjYtNC40Yy0wLjQtMC44LTEtMS4zLTEuOS0xLjMNCgkJYy0wLjgsMC0xLjQsMC40LTEuOSwxLjJzLTAuNiwyLjMtMC42LDQuNGMwLDIuMywwLjIsMy44LDAuNyw0LjZzMS4xLDEuMSwxLjgsMS4xYzAuOCwwLDEuNS0wLjQsMS45LTEuMw0KCQlDNjQuMSw0MS4yLDY0LjMsMzkuNyw2NC4zLDM3LjZ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTc1LDMzLjZjMCwwLjktMC4zLDEuNy0xLDIuNGMtMC43LDAuNy0xLjQsMS0yLjMsMWMtMC45LDAtMS43LTAuMy0yLjMtMXMtMS0xLjQtMS0yLjRjMC0wLjksMC4zLTEuNywxLTIuNA0KCQljMC42LTAuNywxLjQtMSwyLjMtMWMwLjksMCwxLjcsMC4zLDIuMywxUzc1LDMyLjYsNzUsMzMuNnogTTczLjMsMzMuNmMwLTAuNi0wLjItMS0wLjUtMS40Yy0wLjMtMC40LTAuNy0wLjUtMS4yLTAuNQ0KCQljLTAuNSwwLTAuOCwwLjItMS4yLDAuNlM3MCwzMyw3MCwzMy42YzAsMC41LDAuMiwxLDAuNSwxLjRjMC4zLDAuNCwwLjcsMC42LDEuMiwwLjZjMC40LDAsMC44LTAuMiwxLjItMC42UzczLjMsMzQuMSw3My4zLDMzLjZ6Ig0KCQkvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zOC42LDUwLjJoMS43bDEuNiw1LjVsMS42LTUuNWgxLjVsLTIuNCw3LjdoLTEuNkwzOC42LDUwLjJ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQ3LjgsNDkuMmgtMS45di0xLjdoMS45VjQ5LjJ6IE00Niw1MC4yaDEuOHY3LjdINDZWNTAuMnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTYuMSw1NC4zaC00LjljMCwxLDAuMiwxLjcsMC41LDIuMWMwLjMsMC4zLDAuNywwLjUsMS4yLDAuNWMwLjgsMCwxLjMtMC41LDEuNS0xLjRsMS42LDAuMg0KCQljLTAuNCwxLjYtMS41LDIuNC0zLjIsMi40Yy0xLDAtMS45LTAuMy0yLjUtMXMtMC45LTEuNi0wLjktMi45YzAtMS4zLDAuMy0yLjMsMC45LTMuMXMxLjUtMS4xLDIuNS0xLjFjMC43LDAsMS4zLDAuMiwxLjgsMC41DQoJCWMwLjUsMC40LDAuOCwwLjgsMS4xLDEuNEM1NS45LDUyLjUsNTYuMSw1My4zLDU2LjEsNTQuM3ogTTU0LjMsNTMuMmMwLTEuNC0wLjUtMi0xLjUtMmMtMC45LDAtMS40LDAuNy0xLjUsMkg1NC4zeiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01Ni41LDUwLjJoMS43bDEuMyw1LjNsMS4yLTUuM2gxLjZsMS4yLDUuM2wxLjQtNS4zaDEuNGwtMi4xLDcuN2gtMS41bC0xLjMtNS4zbC0xLjIsNS4zaC0xLjVMNTYuNSw1MC4yeiIvPg0KPC9nPg0KPHBhdGggY2xhc3M9InN0MCIgZD0iTTI4LjQsNDUuN1Y1MGMwLDAtMTMsNS4yLDQuMywxMS4yYzAsMCw5LjUsMi42LDE5LDIuNnYtMy41bDEzLDYuMWwtMTMsNi45VjY5YzAsMC0zMy43LDAtMzMuNy0xMw0KCUMxOCw1NiwxOCw0OS4xLDI4LjQsNDUuN3oiLz4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02Ni40LDYwLjRjMC45LDAsMTAuNC0yLjYsMTAuNC02LjlzLTMuNS01LjItMy41LTUuMnYtMi42YzAsMCw4LjYsMS43LDguNiw5LjVjMCwwLDAsNi41LTkuNSw5LjVMNjYuNCw2MC40eiINCgkvPg0KPC9zdmc+DQo=') 50% 50% / contain no-repeat`;
}

const set360ViewCircleIconStyles = (view360CircleIcon, bottomCircleOffset) => {
  view360CircleIcon.src = `https://scaleflex.ultrafast.io/https://scaleflex.api.airstore.io/v1/get/_/2236d56f-914a-5a8b-a3ae-f7bde1c50000/360.svg`;
  view360CircleIcon.style.position = 'absolute';
  view360CircleIcon.style.top = 'auto';
  view360CircleIcon.style.bottom = bottomCircleOffset + '%';
  view360CircleIcon.style.left = '0';
  view360CircleIcon.style.right = '0';
  view360CircleIcon.style.width = '80%';
  view360CircleIcon.style.height = 'auto';
  view360CircleIcon.style.margin = 'auto';
  view360CircleIcon.style.transition = '0.5s all';
};

const setLoaderStyles = (loader) => {
  loader.className = 'cloudimage-360-loader';
  loader.style.position = 'absolute';
  loader.style.zIndex = '100';
  loader.style.top = '0';
  loader.style.left = '0';
  loader.style.right = '0';
  loader.style.width = '0%';
  loader.style.height = '8px';
  loader.style.background = 'rgb(165,175,184)';
};

const setBoxShadowStyles = (boxShadow, boxShadowValue) => {
  boxShadow.className = 'cloudimage-360-box-shadow';
  boxShadow.style.position = 'absolute';
  boxShadow.style.zIndex = '99';
  boxShadow.style.top = '0';
  boxShadow.style.left = '0';
  boxShadow.style.right = '0';
  boxShadow.style.bottom = '0';
  boxShadow.style.boxShadow = boxShadowValue;
}

export {
  get360ViewProps,
  set360ViewIconStyles,
  set360ViewCircleIconStyles,
  setLoaderStyles,
  setBoxShadowStyles,
  setView360Icon
}