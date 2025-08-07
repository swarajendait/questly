// src/components/FeedbackDisplay.tsx (UPDATED WITH STYLES)

import React from "react";
import { AIFeedback } from "../main";

interface FeedbackDisplayProps {
  feedback: AIFeedback;
  onDone: () => void;
}

export function FeedbackDisplay({ feedback, onDone }: FeedbackDisplayProps) {
  return (
    <div
      style={{
        padding: "20px 70px 0px 0px",
        color: "white",
        textAlign: "center",
        fontFamily: "'Press Start 2P'",
      }}
    >
      {/*-- ADDED: Font links for consistency --*/}
      <link
        href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:wght@432&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />

      <h1
        style={{
          color: "#22c55e",
          fontSize: "1.5rem",
          textShadow: "2px 2px #000",
          marginBottom: "40px",
          marginTop: "-10px",
        }}
      >
        {feedback.title}
      </h1>
      <p
        style={{
          fontStyle: "italic",
          fontSize: "1.2rem",
          lineHeight: "1.2",
          maxWidth: "90%",
          margin: "0 auto",
          fontWeight: 20,
          fontFamily: "'Google Sans Code', monospace", // Use a more readable font for the feedback text
        }}
      >
        "{feedback.feedback_text}"
      </p>
      <button
        className="start-btn"
        onClick={onDone}
        style={{ marginTop: "20px" }}
      >
        <span className="start-btn-text">Next Quest</span>
      </button>

      {/*-- ADDED: The full style block from the other components --*/}
      <style>
        {`
          .start-btn {
            margin-top: 20px;
            margin-bottom: 50px;
            padding: 12px 36px;
            border-radius: 30px;
            background: #fff;
            color: #111;
            font-family: 'press start 2p', monospace;
            font-weight: 400;
            font-size: 22px;
            border: 2px solid #111;
            cursor: pointer;
            transition:
              background 0.2s,
              color 0.2s,
              border-color 0.2s,
              box-shadow 0.2s,
              font-size 0.2s;
            box-shadow: 4px 4px 12px rgba(0,0,0,0.18);
            outline: none;
          }

          .start-btn-text {
            transition: font-size 0.2s;
            font-weight: 400;
            font-family: 'press start 2p', monospace;
            font-size: 20px;
          }

          .start-btn:hover {
            background: #111;
            color: #fff;
            font-size: 24px;
            box-shadow: 4px 4px 16px rgba(0,0,0,0.22);
          }

          .start-btn:hover .start-btn-text {
            font-size: 24px;
          }
          
          .footnote {
      /* --- EDITS BELOW --- */
      position: fixed; /* This makes it stick to the screen */
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px 0 10px 0; /* Adds spacing, more on top for the fade */
      
      /* This creates the black-to-transparent gradient */
      background: linear-gradient(to top, rgba(36, 36, 36, 1), rgba(36, 36, 36, 0));
      
      /* --- UNCHANGED STYLES --- */
      text-align: center;
      font-size: 8px;
      color: #b0b0b0;
      font-family: 'press start 2P', sans-serif;
      font-weight: 400;
      letter-spacing: 0.02em;
      pointer-events: none;
      user-select: none;
    }
        `}
      </style>
      <div className="footnote">© 2025 Questly. All rights reserved.</div>
    </div>
  );
}
