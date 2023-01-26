import React from 'react'
import {useNavigate} from 'react-router-dom'

const Bouncer = ({dependencies}) => {
  const navigate = useNavigate()

  dependencies?.map(dep => {
    if (!dep) {
      navigate('/')
    }
  })

  return <React.Fragment></React.Fragment>
}

export default Bouncer
