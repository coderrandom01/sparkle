import { Box } from '@mui/material'
import React from 'react'

interface SectionHeaderPorps{
    title: string,
    classStyles?: string
}

function SectionHeader({ title, classStyles }: SectionHeaderPorps) {
  return (
    <>
        <Box className={classStyles}>
            <h2 className='text-lg md:text-xl font-semibold'>{title}</h2>
            <span className='border-b-2 border-primary block mt-2 w-20'></span>
        </Box>
    </>
  )
}

export default SectionHeader