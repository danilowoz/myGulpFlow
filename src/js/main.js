let foo = 0
const bar = () => {
  foo = 1
}

if (foo) {
  bar()
}