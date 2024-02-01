import React from 'react'
import {logo} from '../assets'
const Hero = () => {
  return (
   <header className='w-full flex flex-col items-center justify-center'>
    <nav className='w-full pt-3 mt-10 flex items-center justify-between '>
        <img src={logo} alt="sumz_logo" className='w-28 object-contain' />
    <button className='black_btn'
            type='button'
              onClick={()=> window.open("https://github.com/Sanjay-Sathyanarayanan")}>
        Github
    </button>
    </nav>
    <h1 className='head_text'>
      Summarize Articles with <br className='max-md:hidden' />
      <span className='orange_gradient'> OpenAI GPT-4</span>
    </h1>
    <h2 className='desc'>
      Simplify our reading with Summize, an open-source article summarizer that transforms 
      lengthy article into clear and concise summaries.
    </h2>
   </header>
  )
}

export default Hero