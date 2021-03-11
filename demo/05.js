function* nTimes(n) {
  while(n--) {
    yield;
  }
}

for(const v of nTimes(3)) {
  console.log('a')
}