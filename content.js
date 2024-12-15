chrome.runtime.onMessage.addListener((message) => {
  const video = document.querySelector("video"); // Select the YouTube video element
  if (!video) return;

  if (message.action === "pause") {
    video.pause();
  } else if (message.action === "resume") {
    video.play();
  }
});
