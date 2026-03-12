import React from 'react'

export const Signup = () => {
  return (
    <>
    <div>
        <form>
            <input type="text" placeholder='enter name' name='name' />
            <input type="email" placeholder='enter email' name='email' />
            <input type='password' placeholder='enter password' name='password'/>
            <input type="submit"  />
        </form>
    </div>
    </>
    
  )
}
