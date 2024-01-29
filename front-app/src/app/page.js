'use client';
import Image from 'next/image'
import styles from './page.module.css'
import Header from '../../components/Header'
import Description from '../../components/Description'
import Link from 'next/link'

import { useEffect,useState } from 'react'
import Accuiel from '../../components/Accuiel';

 
function Home() {

  return (
    <main >
     
     <Accuiel/>
   
    </main>
  )
}
export default Home;
