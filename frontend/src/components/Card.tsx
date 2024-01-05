// ---
// interface Props {
//   title: string;
//   q1?: boolean;
//   body: string;
//   href: string;
// }

// const { href, title, body, q1 } = Astro.props;

// const apiURL = q1 && q1 === true ? `${href}/30-May-2023` : href;

// const answer = await fetch(`http://localhost:8080/api/${href}`);
// ---
import React, { type FC } from "react";
import "./card.css"
import { useState } from "react";


const Card: FC<{
  title: string;
  q1?: boolean;
  body: string;
  href: string;
}> = ({title, q1, body, href}) => {

  
  return (
  <li className="link-card">
    <div>
      <h2>
        {title}
        <span>&rarr;</span>
      </h2>
      <p>
        {body}
      </p>
      <button className="btn">Reveal Answer</button>
    </div>
  </li>

  )

}
export default Card

{/* <style>
  .link-card {
    list-style: none;
    display: flex;
    
    padding: 1px;
    width: 400px;
    background-color: #23262d;
    background-image: none;
    background-size: 400%;
    border-radius: 7px;
    background-position: 100%;
    transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  .link-card > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    text-decoration: none;
    line-height: 1.4;
    padding: calc(1.5rem - 1px);
    border-radius: 8px;
    color: white;
    background-color: #23262d;
    opacity: 0.8;
  }
  h2 {
    margin: 0;
    font-size: 1.25rem;
    transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  p {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .btn {
    cursor: pointer;
    max-width: 150px;
    color: #000;
    font-weight: 700;
    margin-top: 0.8rem;
    padding: 0.8rem 1.2rem;
    background: rgb(var(--bright-teal));
    border: none;
    border-radius: 5px;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }
  .btn:hover {
    opacity: 0.6;
  }
  .btn:active {
    pointer-events: none;
  }

  .link-card:is(:hover, :focus-within) {
    background-position: 0;
    background-image: var(--accent-gradient);
  }
  .link-card:is(:hover, :focus-within) h2 {
    color: rgb(var(--accent-light));
  }
</style> */}
