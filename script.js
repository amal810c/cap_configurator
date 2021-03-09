"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  // TODO: Toggle feature in "model"
  if (features[feature]) {
    features[feature] = false;
  } else {
    features[feature] = true;
  }

  // If feature is (now) turned on:
  if (features[feature]) {
    // feature added
    console.log(`Feature ${feature} is turned on!`);

    // TODO: More code

    // - mark target as chosen (add class "chosen")
    target.classList.add("chosen");

    // - un-hide the feature-layer(s) in the #product-preview;
    document.querySelector(`[data-feature='${feature}']`).classList.remove("hide");

    // - create featureElement and append to #selected ul
    const featuretList = createFeatureElement(feature);
    document.querySelector("#selected ul").append(featuretList);

    // - create FLIP-animation to animate featureElement from img in target, to
    //   its intended position. Do it with normal animation or transition class!
    // TODO: Create FLIP animation
    //1. first: find the start-position
    const start = target.getBoundingClientRect();
    //2. last: find the end-position
    const end = featuretList.getBoundingClientRect();
    //3. invert: translate the element to the start-position
    const diffX = start.x - end.x;
    const diffY = start.y - end.y;

    featuretList.style.setProperty("--diffX", diffX + "px");
    featuretList.style.setProperty("--diffY", diffY + "px");

    featuretList.offsetHeight; //reflow layout

    //4. play: animate the element to translate(0,0)
    featuretList.classList.add("animate-feature-in");

    // Else - if the feature (became) turned off:
  } else {
    // feature removed
    console.log(`Feature ${feature} is turned off!`);

    // TODO: More code
    // - no longer mark target as chosen
    target.classList.remove("chosen");

    // - hide the feature-layer(s) in the #product-preview
    document.querySelector(`[data-feature='${feature}']`).classList.add("hide");

    // - find the existing featureElement in #selected ul
    const existingFeatureElement = document.querySelector(`#selected ul li[data-feature=${feature}]`);

    // - create FLIP-animation to animate featureElement to img in target
    // TODO: Create FLIP animation
    //1. first: find the start-position
    const start = target.getBoundingClientRect();
    //2. last: find the end-position
    const end = existingFeatureElement.getBoundingClientRect();
    //3. invert: translate the element to the start-position
    const diffX = start.x - end.x;
    const diffY = start.y - end.y;

    existingFeatureElement.style.setProperty("--diffX", diffX + "px");
    existingFeatureElement.style.setProperty("--diffY", diffY + "px");

    existingFeatureElement.offsetHeight; //reflow layout

    //4. play: animate the element to translate(0,0)
    existingFeatureElement.classList.add("animate-feature-out");

    // - when animation is complete, remove featureElement from the DOM
    existingFeatureElement.addEventListener("animationend", () => {
      existingFeatureElement.remove();
    });
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}
