import React from 'react'
import classes from './Input.module.css'

export const Input = ({
  label,
  type,
  inputKey,
  value,
  errors,
  changeHandler,
  children
}) => {
  return (
    <div className={classes.formControl}>
      {label && <label htmlFor={inputKey}>{label}</label>}
      {type === 'textarea' && (
        <textarea
          id={inputKey}
          rows="4"
          value={value}
          onChange={event => changeHandler(inputKey, event)}
        />
      )}
      {type === 'input' && (
        <input
          type="text"
          id={inputKey}
          value={value}
          onChange={event => changeHandler(inputKey, event)}
        />
      )}
      {/* {errors.name && <div className={classes.error}>{errors.name}
      </div>} */}
      {children}
    </div>
  )
}

Input.defaultProps = {
  type: 'input'
}
