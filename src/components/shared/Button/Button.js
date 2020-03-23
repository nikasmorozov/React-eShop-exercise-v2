import React from 'react'
import classes from './Button.module.css'

export const Button = ({ onClick, children, type, disabled }) => {
  const styles = [classes.button]
  switch (type) {
    case 'primary':
      styles.push(classes.green)
      break
    case 'secondary':
      styles.push(classes.blue)
      break
    case 'danger':
      styles.push(classes.red)
      break
    default:
      break
  }
  if (disabled) styles.push(classes.disabled)
  return (
    <div className={classes.buttonWrapper}>
      <button
        onClick={onClick}
        className={styles.join(' ')}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  )
}

Button.defaultProps = {
  type: 'primary'
}
