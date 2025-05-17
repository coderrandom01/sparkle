import React from 'react'
import { Box, Divider } from '@mui/material';
import { Instagram, WhatsApp, X, YouTube } from '@mui/icons-material';
import './footer.css';
import { logo_light, logoName_light } from 'config/property/image-property';

function Footer() {
  return (
    <>
        <Box className='section bg-black text-white w-full relative bottom-0 mb-0'>
            <div className='grid md:grid-cols-4 py-6 mb-3 gap-10'>
            <div className='space-y-2.5'>
                <div className='flex gap-2 items-center'>
                    <img className="h-6" src={logo_light} alt="logo" />
                    <img className="h-6" src={logoName_light} alt="company name" />
                </div>
                <div className='space-y-1.5'>
                <h3 className='text-sm font-medium'>Registered Office Address</h3>
                <p className='text-xs'>Sparklez Apparels Pvt Ltd</p>
                </div>
                <div>
                <address className='text-xs'>
                    Lotus Corporate Park Wing G02 - 1502,<br/> 
                    Ram Mandir Lane, off Western Express<br/> 
                    Highway, Goregaon, Mumbai, 400063
                </address>
                </div>
            </div>
            <div className='space-y-2.5'>
                <h3 className='text-sm font-medium'>Company</h3>
                <ul className='text-xs space-y-2.5'>
                <li>About us</li>
                <li>Blog</li>
                <li>Affiliate Program</li>
                <li>Sitemap</li>
                <li>Stores</li>
                <li>Contact Us</li>
                </ul>
            </div>
            <div className='space-y-2.5'>
                <h3 className='text-sm font-medium'>Need Help From Us</h3>
                <ul className='text-xs space-y-2.5'>
                <li>About us</li>
                <li>Blog</li>
                <li>Affiliate Program</li>
                <li>Sitemap</li>
                <li>Stores</li>
                <li>Contact Us</li>
                </ul>
            </div>
            <div className='space-y-2.5'>
                <h3 className='text-sm font-medium'>Support</h3>
                <ul className='text-xs space-y-2.5'>
                <li>+91 8768789984</li>
                <li>Support@Sparklez.com</li>
                </ul>
            </div>
            </div>
            <Divider sx={{ borderColor: '#fff' }} />
            <div className='flex justify-between items-center py-3 space-x-1'>
                <div className='text-xs'>
                    <p className='mb-0'>© 2024, sparklez. All Rights Reserved.</p>
                </div>
                <div>
                    <ul className='flex space-x-2'>
                        <li><WhatsApp className='footer-Icon' /></li>
                        <li><Instagram className='footer-Icon' /></li>
                        <li><X className='footer-Icon' /></li>
                        <li><YouTube className='footer-Icon' /></li>
                    </ul>
                </div>
            </div>
      </Box>
    </>
  )
}

export default Footer