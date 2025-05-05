import React from 'react'
import Navbar from './component/Navbar'
import HeroSection from './component/HeroSection'
import EventsPage from './component/EventPage'
import Event from './component/Event'
import ComingSoon from './component/ComingSoon'


function page() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Event />
      <EventsPage />
      <ComingSoon />
      

    </div>
  )
}

export default page