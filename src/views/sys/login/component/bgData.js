export default {
  fpsLimit: 60,
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  background: {
    color: {
      value: 'rgba(1,0,53,0.5)',
    },
    image: "url('')",
    position: '100% 100%',
    repeat: 'no-repeat',
    size: 'cover',
    opacity: 1,
    zIndex: 12,
  },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: ['#2EB67D', '#ECB22E', '#E01E5B', '#36C5F0'],
    },
    shape: {
      type: ['circle'],
      stroke: {
        width: 0,
        color: '#fff',
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 8,
      random: true,
      anim: {
        enable: false,
        speed: 10,
        size_min: 10,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#fff',
      opacity: 0.5,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 2,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};
