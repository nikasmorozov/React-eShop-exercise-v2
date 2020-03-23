/**
 * This utility function is used to mutate the original styles array
 * using provided justify prop
 *
 * @param {Array} styles
 * @param {String} justify
 * @param {Object} classes
 */
export const justifyHelper = (styles, justify, classes) => {
  switch (justify) {
    case 'space-between':
      styles.push(classes.spaceBetween)
      break
    case 'space-evenly':
      styles.push(classes.spaceEvenly)
      break
    case 'space-around':
      styles.push(classes.spaceAround)
      break
    case 'flex-start':
      styles.push(classes.flexStart)
      break
    case 'flex-end':
      styles.push(classes.flexEnd)
      break
    case 'center':
      styles.push(classes.center)
      break
    default:
      break
  }
}

export const alignHelper = (styles, align, classes) => {
  switch (align) {
    case 'center':
      styles.push(classes.alignCenter)
      break
    case 'flex-start':
      styles.push(classes.alignStart)
      break
    case 'flex-end':
      styles.push(classes.alignEnd)
      break
    default:
      break
  }
}
