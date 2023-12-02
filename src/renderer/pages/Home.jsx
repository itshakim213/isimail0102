import React from 'react';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
import MainSection from '../components/MainSection';

// import {Link} from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <MainSection />
    </div>
  );
}

export default Home;
