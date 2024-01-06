import React, { useEffect, type FC } from "react";
import "./card.css";
import { useState } from "react";
import axios from "axios";

const Cards: FC = () => {
  const [answer, setAnswer] = useState<string[]>([]);
  const [visible, setVisible] = useState<boolean[]>([]);

  const toggleAnswer = async (id: number, href: string) => {
    console.log("id", id);
    const temp = await axios.get(href);

    console.log("temp :>> ", temp.data);
    setAnswer((prev) => {
      const newAnswer = [...prev];
      newAnswer[id] = temp.data;
      return newAnswer;
    });

    setVisible((prev) => {
      const newVisible = [...prev];
      newVisible[id] = !newVisible[id];
      return newVisible;
    });
  };

  // const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {

  //   console.log("display", displayAnswer)
  //   setDisplayAnswer(true)
  //   setAnswer("Hi there")
  // // answer = await axios.get(`http://localhost:8080/api/${href}`)
  //   console.log("answer", answer)
  // }

  const questions = [
    {
      id: 1,
      href: "/api/parquet/total/price",
      title: "Question 1",
      body: "Get total price of tickets bought on a specific day for each of the 2 events",
      q1: true,
    },
    {
      id: 2,
      href: "/api/parquet/total/tickets",
      title: "Question 2",
      body: "The Number of tickets purchased for each ticket type for each of the games respectively",
    },
    {
      id: 3,
      href: "/api/parquet/total/purchase",
      title: "Question 3",
      body: "First Name that purchased the highest total dollar amount of tickets",
    },
    {
      id: 4,
      href: "/api/parquet/highest/totalName",
      title: "Question 4",
      body: "First Name that purchased the highest number of total tickets",
    },
    {
      id: 5,
      href: "/api/parquet/highest/ticketsName",
      title: "Question 5",
      body: "Total purchase price for each ticket type for each game",
    },
  ];

  return (
    <section className="link-card-grid" id="questions">
      {questions.map((question) => (
        <li key={question.id} className="link-card">
          <div>
            <h2>
              {question.title}
              <span>&rarr;</span>
            </h2>
            <p>{question.body}</p>
            <button
              onClick={() => toggleAnswer(question.id, question.href)}
              className="btn"
            >
              Reveal Answer
            </button>

            <div className={visible[question.id] ? "box" : " box blur"}>
              {answer.map((game) => {
                return game[1];
              })}
            </div>
          </div>
        </li>
      ))}
    </section>
  );
};
export default Cards;
