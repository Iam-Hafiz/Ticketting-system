const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
    x: -80,
  },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay: 0.08 * index,
      type: "spring",
    },
  }),
};

const animationsProps = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5},
}
  export  {
    fadeInAnimationVariants,
    animationsProps,
  };