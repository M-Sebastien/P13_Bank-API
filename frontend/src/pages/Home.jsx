import React from 'react'
/* import SliderPicture from '../assets/bank-tree.jpeg' */
import ChatIcon from '../assets/icon-chat.png'
import MoneyIcon from '../assets/icon-money.png'
import SecurityIcon from '../assets/icon-security.png'

const Home = () => {
  return (
    <div className="home">
      <main>
        <div className='home-slider'>
          <div className='home-slider__claims'>
          <p className='home-slider__claim'>No fees.</p>
          <p className='home-slider__claim'>No minimum deposit.</p>
          <p className='home-slider__claim'>High interest rates.</p>
          <p className='home-slider__text'>Open a savings account with Argent Bank today!</p>
          </div>
        </div>
        <section className='home-values-container'>
          <article className='home-value'>
            <img className='home-value__icon' src={ChatIcon} alt='icon'/>
            <h2 className='home-value__title'>You are our #1 priority</h2>
            <div className='home-value__text'>Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.</div>
          </article>
          <article className='home-value'>
            <img className='home-value__icon' src={MoneyIcon} alt='icon'/>
            <h2 className='home-value__title'>More savings means higher rates</h2>
            <div className='home-value__text'>The more you save with us, the higher your interest rate will be!</div>
          </article>
          <article className='home-value'>
            <img className='home-value__icon' src={SecurityIcon} alt='icon'/>
            <h2 className='home-value__title'>Security you can trust</h2>
            <div className='home-value__text'>We use top of the line encryption to make sure your data and money is always safe.</div>
          </article>
        </section>
      </main>
    </div>
  )
}

export default Home
