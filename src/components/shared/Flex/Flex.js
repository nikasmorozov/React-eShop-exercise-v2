import React from 'react'
import classes from './Flex.module.css'
import { justifyHelper, alignHelper } from './utils'

export const Flex = ({ children, justify, className, align, wrap }) => {
  const styles = [classes.flex, className]
  justifyHelper(styles, justify, classes)
  alignHelper(styles, align, classes)
  switch (wrap) {
    case 'nowrap':
      styles.push(classes.noWrap)
      break
    case 'wrap':
      styles.push(classes.wrap)
      break
    default:
      break
  }
  return <div className={styles.join(' ')}>{children}</div>
}
