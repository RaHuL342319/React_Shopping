import React from 'react'
import { Link } from 'react-router-dom'

const LoginError = () => {
  return (
    <div>
        <h3 className='text-danger'>Invalid Credentials</h3>
        <Link to='/login' >Try Again</Link>
        <br />
        {/* <Link to='/register' style={{textDecoration: "none"}} >Register</Link> */}
    </div>
  )
}

export default LoginError