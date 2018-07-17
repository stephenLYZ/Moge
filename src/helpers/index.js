
export const byLayer = (a, b) => {
  if (a.layer < b.layer) {
    return -1
  } else if (a.layer > b.layer) {
    return 1
  } else {
    return 1
  }
}