// src/components/ChallengeGenerator.tsx

import React, { useState } from "react";
import Input from "./Input";
import { Challenge } from "../main";

interface ChallengeGeneratorProps {
  onChallengeSelect: (challenge: Challenge) => void;
}

const ChallengeGenerator: React.FC<ChallengeGeneratorProps> = ({
  onChallengeSelect,
}) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const generateChallenges = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const challengeList = await window.electronAPI.generateCategories(input);
      setChallenges(challengeList);
    } catch (err) {
      console.error("Failed to generate challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px 60px 0px 0px",
        color: "white",
        textAlign: "center",
        fontFamily: "'Press Start 2P'",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.cdnfonts.com/css/raster-forge"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:wght@432&display=swap"
        rel="stylesheet"
      />

      <h1
        style={{
          marginBottom: "24px",
          fontSize: "1.7rem",
          fontWeight: 800,
          wordSpacing: "-10px",
        }}
      >
        Generate your next <span style={{ color: "#0784c3ff" }}>Quest</span>{" "}
        based on your interests using{" "}
        <span style={{ color: "#0784c3ff" }}>AI</span>
      </h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "100%",
            maxWidth: "270px",
            marginRight: "35px",
            marginTop: "20px",
          }}
        >
          <Input value={input} onChange={setInput} />
        </div>
      </div>
      <p
        style={{
          fontFamily: "Google Sans Code",
          fontSize: "12px",
          paddingTop: "20px",
          wordSpacing: "-1px",
        }}
      >
        ex. » I want to be more confident. <br /> » I'm bored surprise me.{" "}
        <br />
        OR ANYTHING THAT COMES TO YOUR MIND!
      </p>
      <br />
      {!loading ? (
        <button className="start-btn" onClick={generateChallenges}>
          <span className="start-btn-text">GENERATE</span>
        </button>
      ) : (
        <div style={{ marginTop: "25px", height: "48px" }}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            style={{
              margin: "auto",
              background: "none",
              display: "block",
              shapeRendering: "auto",
              filter: "drop-shadow(0 0 4px black)",
            }}
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="#ffffff"
              strokeWidth="10"
              r="35"
              strokeDasharray="164.93361431346415 56.97787143782138"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="0.8s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
              />
            </circle>
          </svg>
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {challenges.map((challenge) => (
          <button
            key={challenge.title}
            onClick={() => onChallengeSelect(challenge)}
            style={{
              padding: "10px px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              color: "#000",
              cursor: "pointer",
              fontFamily: "'Raster Forge', monospace",
            }}
          >
            {challenge.title}
          </button>
        ))}
      </div>
      <br />
      <br />
      <br />
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
        `}
      </style>
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
      transition: all 0.2s;
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
};

export default ChallengeGenerator;
