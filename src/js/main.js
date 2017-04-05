let cu = 0
const foo = () => {
  cu = 1
}

if (cu) {
  foo()
}