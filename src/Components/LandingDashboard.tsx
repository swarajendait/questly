import React from "react";
export default function LandingDashboard({
  onStart,
}: {
  onStart: () => void;
}): JSX.Element {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: -70,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#24242424",
        color: "white",
        textAlign: "center",
        padding: "10px 20px 0 20px",
        boxSizing: "border-box",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik+Broken+Fax&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          fontSize: "170px",
          fontFamily: "'Rubik Broken Fax', monospace",
          marginBottom: "0",
          paddingBottom: "0",
          fontWeight: 400,
        }}
      >
        Q
      </div>
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap"
        rel="stylesheet"
      />
      <div
        style={{
          fontFamily: "'Rubik Mono One', monospace",
          fontSize: "47px",
          marginTop: "-28px",
          paddingTop: "0",
          fontWeight: 400,
        }}
      >
        QUESTLY
      </div>
      <div
        style={{
          fontFamily: "'press start 2p",
          fontSize: "13px",
          marginTop: "5px",
          fontWeight: 400,
        }}
      >
        Quit doomscrolling. Start questing with Questly.
      </div>
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "48px",
        }}
      >
        <svg
          width="32"
          height="48"
          viewBox="0 0 32 48"
          style={{
            animation: "arrowBounce 1s infinite",
            fill: "white",
            filter: "drop-shadow(0 0 2px black)",
          }}
        >
          <path
            d="M16 4v32M16 40l-8-8M16 40l8-8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <button
        className="start-btn"
        onClick={(e) => {
          const btn = e.currentTarget;
          btn.classList.add("bounce");
          setTimeout(() => {
            btn.classList.remove("bounce");
            onStart(); // 👈 switch page
          }, 380);
        }}
      >
        <span
          className="start-btn-text"
          style={{ fontFamily: "press start 2p", fontSize: "30px" }}
        >
          START
        </span>
      </button>
      <link
        href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

          @keyframes arrowBounce {
            0% { transform: translateY(0); }
            50% { transform: translateY(16px); }
            100% { transform: translateY(0); }
          }

          .start-btn {
            margin-top: 25px;
            padding: 12px 36px;
            border-radius: 30px;
            background: #fff;
            color: #111;
            font-family: Rubik Mono One, monospace;
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

          .start-btn.bounce {
            animation: btnBounce 0.38s;
            box-shadow: none !important;
          }

          @keyframes btnBounce {
            0% { transform: scale(1) translate(0,0); font-size: 22px; box-shadow: 4px 4px 12px rgba(0,0,0,0.18);}
            20% { transform: scale(0.93) translate(0,4px); font-size: 17px; box-shadow: none;}
            60% { transform: scale(1.0) translate(0,-4px); font-size: 24px; box-shadow: none;}
            100% { transform: scale(1) translate(0,0); font-size: 24px; box-shadow: 4px 4px 12px rgba(0,0,0,0.18);}
          }

          .footnote {
            position: absolute;
            bottom: 10px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 8px;
            color: #b0b0b0;
            font-family: 'press start 2p', sans-serif;
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
