// src/components/QuestArena.tsx

import React, { useState } from "react";
import { Challenge } from "../main";

interface QuestArenaProps {
  challenge: Challenge;
  onSubmit: (submission: string) => void;
  isLoading: boolean;
}

export function QuestArena({
  challenge,
  onSubmit,
  isLoading,
}: QuestArenaProps) {
  const [answer, setAnswer] = useState("");

  return (
    <div
      style={{
        padding: "20px 60px 0px 0px",
        color: "white",
        textAlign: "center",
        fontFamily: "'Press Start 2P'",
      }}
    >
      {/*-- ADDED: Font links for consistency --*/}
      <link
        href="https://fonts.cdnfonts.com/css/raster-forge"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:wght@600&display=swap"
        rel="stylesheet"
      />

      <h2
        style={{
          color: "#0784c3ff",
          fontSize: "1.5rem",
          marginBottom: "1rem",
          marginTop: "-2x",
          wordSpacing: "-10px",
        }}
      >
        {challenge.title}
      </h2>
      <p
        style={{
          fontSize: "1rem",
          minHeight: "60px",
          lineHeight: "1.2",
          maxWidth: "90%",
          margin: "0 auto",
          fontFamily: "'Google Sans Code', monospace",
        }}
      >
        {challenge.description}
      </p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your response here..."
        disabled={isLoading}
        style={{
          width: "90%",
          height: "150px",
          marginTop: "20px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #555",
          backgroundColor: "#333",
          color: "white",
          fontSize: "1rem",
          resize: "none",
          fontFamily: "'Google Sans Code', monospace",
        }}
      />

      <button
        className="start-btn"
        onClick={() => onSubmit(answer)}
        disabled={isLoading || !answer.trim()}
        style={{ marginTop: "20px" }}
      >
        <span className="start-btn-text" style={{ fontSize: "20px" }}>
          {isLoading ? "Evaluating..." : "Submit"}
        </span>
      </button>

      {/*-- ADDED: Complete style block for consistency --*/}
      <style>
        {`
          .start-btn {
            margin-top: 25px;
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
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px 0 10px 0;
            background: linear-gradient(to top, rgba(36, 36, 36, 1), rgba(36, 36, 36, 0));
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
      {/*-- ADDED: Footnote element --*/}
      <div className="footnote">© 2025 Questly. All rights reserved.</div>
    </div>
  );
}
