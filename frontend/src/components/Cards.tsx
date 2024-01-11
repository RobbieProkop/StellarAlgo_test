import React, { useEffect, type FC } from "react";
import "./card.css";
import { useState } from "react";
import axios from "axios";
import type { ParquetObj, Q2 } from "../../dataModels";

const Cards: FC = () => {
  const [answer, setAnswer] = useState<string[]>([]);
  const [visible, setVisible] = useState<boolean[]>([]);
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const changeVisibility = (id: number) => {
    setVisible((prev) => {
      const newVisible = [...prev];
      newVisible[id] = !newVisible[id];
      return newVisible;
    });
  };

  const toggleAnswer = async (id: number, href: string) => {
    if (id === 1 && !input) {
      setError(true);
      return;
    }
    setError(false);
    const temp =
      id === 1 ? await axios.get(`${href}/${input}`) : await axios.get(href);
    if (visible[id]) {
      return changeVisibility(id);
    }

    setAnswer((prev) => {
      const newAnswer = [...prev];
      newAnswer[id] = temp.data;
      return newAnswer;
    });
    changeVisibility(id);

    // setVisible((prev) => {
    //   const newVisible = [...prev];
    //   newVisible[id] = !newVisible[id];
    //   return newVisible;
    // });
  };

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
      body: "The number of tickets purchased for each ticket type for each of the games respectively",
    },
    {
      id: 3,
      href: "/api/parquet/highest/ticketsName",
      title: "Question 3",
      body: "First name that purchased the highest total dollar amount of tickets",
    },
    {
      id: 4,
      href: "/api/parquet/highest/totalName",
      title: "Question 4",
      body: "First name that purchased the highest number of total tickets",
    },
    {
      id: 5,
      href: "/api/parquet/total/purchase",
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
            {question.id === 1 && (
              <>
                <input
                  value={input}
                  onChange={handleChange}
                  type="text"
                  className={error ? "input error" : "box input"}
                  placeholder="Enter Date (01-Jan-23)"
                />

                {error && <p className="errorText ">Please Enter a Date</p>}
              </>
            )}
            {/* <p className="click">*Click To Reveal Answer*</p> */}
            {visible[question.id] ? (
              <button
                className="btn"
                onClick={() => changeVisibility(question.id)}
              >
                Hide Answer
              </button>
            ) : (
              <button
                className="btn"
                onClick={() => toggleAnswer(question.id, question.href)}
              >
                Reveal Answer
              </button>
            )}

            {visible[question.id] ? (
              <>
                {/* Uncomment this if connected to Node Express API 
                      //  {question.id === 1 ? (
                      //   <>
                      //     <p>
                      //       Wolves vs Knights Sum: $
                      //       {answer[question.id].event1Sum || 0}
                      //     </p>
                      //     <p>
                      //       Wolves vs SunRays Sum: $
                      //       {answer[question.id].event2Sum || 0}
                      //     </p>
                      //   </>
                      // ) : question.id === 2 || question.id === 5 ? (
                      //   <>
                      //     <p className="box">Wolves vs Knights</p>
                      //     {answer[question.id]["Wolves vs Knights"].map(
                      //       (event, index) => (
                      //         <p key={`knight-${index}`}>
                      //           {question.id === 5
                      //             ? `${event.type} Total: ${event.total.toFixed(2)}`
                      //             : `${event.type} Total: ${event.total}`}
                      //         </p>
                      //       )
                      //     )}
                      //     <p className="box">Wolves vs SunRays</p>
                      //     {answer[question.id]["Wolves vs SunRays"].map(
                      //       (event, index) => (
                      //         <p key={`SunRays-${index}`}>
                      //           {question.id === 5
                      //             ? `${event.type} Total: ${event.total.toFixed(2)}`
                      //             : `${event.type} Total: ${event.total}`}
                      //         </p>
                      //       )
                      //       </>
                      //     )} */}
                {question.id === 1 ? (
                  <>
                    <p className="box">
                      Wolves vs Knights Sum: $
                      {answer[question.id][0]
                        ? answer[question.id][0].total.toFixed(2) || 0
                        : 0}
                    </p>
                    <p className="box">
                      Wolves vs SunRays Sum: $
                      {answer[question.id][1]
                        ? answer[question.id][1].total.toFixed(2) || 0
                        : 0}
                    </p>
                  </>
                ) : question.id === 2 || question.id === 5 ? (
                  <>
                    <p className="box">Wolves vs Knights</p>
                    {console.log("answer[question.id]", answer[question.id])}
                    {answer[question.id].map((event: Q2, index: number) => {
                      if (event["Event Name"] === "Wolves vs Knights") {
                        return (
                          <p key={`knight-${index}`}>
                            {question.id === 5
                              ? `${
                                  event["Ticket Type"]
                                } Total: ${event.total.toFixed(2)}`
                              : `${event["Ticket Type"]} Total: ${event.total}`}
                          </p>
                        );
                      }
                    })}
                    <p className="box">Wolves vs SunRays</p>
                    {answer[question.id].map((event: Q2, index: number) => {
                      if (event["Event Name"] === "Wolves vs SunRays") {
                        return (
                          <p key={`knight-${index}`}>
                            {question.id === 5
                              ? `${
                                  event["Ticket Type"]
                                } Total: ${event.total.toFixed(2)}`
                              : `${event["Ticket Type"]} Total: ${event.total}`}
                          </p>
                        );
                      }
                    })}
                  </>
                ) : (
                  <p className="box">{answer[question.id]}</p>
                )}
              </>
            ) : (
              <p className="box blur">Blurred Answer</p>
            )}
          </div>
        </li>
      ))}
    </section>
  );
};
export default Cards;
