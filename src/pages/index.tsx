import React from "react"
import Link from "next/link"
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';
import fetch from 'node-fetch';

// this is not showing up, and i am confused. here is the place i am getting it from --   https://mantine.dev/core/burger/
const Demo = ()=> {
  const [opened, { toggle }] = useDisclosure();
  return <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />;
}
export  {Demo}


async function fetchData() {
  const tastyUrl = 'https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '63ecd20b55msh4144639981cde2cp13e44djsnbd5bc490d39a',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(tastyUrl, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Call the async function to start the program
fetchData();


const Home = () => {
  return (
    <div>
      <h1>Fridge To Table</h1>
      <Link href="/profile">Profile</Link>
      <br></br>
      <Link href="/">logout</Link>
    </div>
  )
}
export default Home

