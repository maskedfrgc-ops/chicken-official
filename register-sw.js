"use strict";

const stockSW = "/uv/uv.sw.js";
const swAllowedHostnames = ["localhost", "127.0.0.1"];

async function registerSW() {
  if (
    location.protocol !== "https:" &&
    !swAllowedHostnames.includes(location.hostname)
  ) {
    throw new Error("Service workers need https or localhost.");
  }

  if (!navigator.serviceWorker) {
    throw new Error("This browser does not support service workers.");
  }

  const registration = await navigator.serviceWorker.register(stockSW, {
    scope: __uv$config.prefix,
  });

  if (registration.active || registration.waiting) {
    return registration;
  }

  const worker = registration.installing;
  if (!worker) {
    return registration;
  }

  await new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, 10000);

    worker.addEventListener("statechange", () => {
      if (worker.state === "activated") {
        clearTimeout(timeoutId);
        resolve();
      } else if (worker.state === "redundant") {
        clearTimeout(timeoutId);
        reject(new Error("Service worker became redundant during registration."));
      }
    });
  });

  return registration;
}
