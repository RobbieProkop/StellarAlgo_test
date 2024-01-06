import React, { type FC } from "react";
import "./card.css"
import { useState } from "react";
import axios from "axios";


const Card: FC<{
  title: string;
  q1?: boolean;
  body: string;
  href: string;
}> = ({title, q1, body, href}) => {

  const [displayAnswer, setDisplayAnswer] = useState<boolean>(false)
  const [answer, setAnswer] = useState<string>("")
  

  
  const onClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("display", displayAnswer)
    setDisplayAnswer(true)
    setAnswer("Hi there")
  // answer = await axios.get(`http://localhost:8080/api/${href}`)
    console.log("answer", answer)
  }
  
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
      <button onClick={onClick} className="btn">Reveal Answer</button>
      <p>{answer}</p>
    </div>
  </li>

  )

}
export default Card
