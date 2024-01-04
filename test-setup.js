// jest.setup.js

// Polyfill for window.matchMedia
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {}
  };
};

// Polyfill for window.requestAnimationFrame
global.requestAnimationFrame = global.requestAnimationFrame || function (callback) {
  setTimeout(callback, 0);
};
