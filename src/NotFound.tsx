
import { OutlinedButton } from './Components/Buttons/Button'
import { Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  return (
    <Container className='!h-dvh' maxWidth='md'>
        <div className='h-full w-full flex flex-col justify-center items-center space-y-7' >
            <h1 className='text-5xl'>404 Page</h1>
            <OutlinedButton name='Back to home' handleClick={() => navigate('/')} />
        </div>
    </Container>
  )
}

export default NotFound