let rangeFn = (min, max) => {
  return Math.round(min + (max - min) * Math.random());
};
console.log(rangeFn(10, 20));
