particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    fpsLimit: 120,
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
        direction: "none",
        enable: true,
        outModes: {
            default: "bounce",
        },
        random: true,
        speed: 1,
        straight: false,
    },
  },
   modes: {
    repulse: {
        distance: 200,
        duration: 0.5,
    },
    grab: {
        distance: 150,
        line_linked: {
            opacity: 20
        }
    },
},
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "repulse" },
      resize: true,
    },
  },
  retina_detect: true,
});

// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector("canvas");
  if (canvas) {
    canvas.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
  }
});