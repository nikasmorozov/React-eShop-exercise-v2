import React from 'react'
import classes from './Container.module.css'

export const Container = ({ children }) => (
  <div className={classes.container}>{children}</div>
)
