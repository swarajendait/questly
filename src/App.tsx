// src/App.tsx

import React, { useState } from "react";
import TitleBar from "./Components/TitleBar";
import LandingDashboard from "./Components/LandingDashboard";
import ChallengeGenerator from "./Components/CategorySelector";
import { QuestArena } from "./Components/QuestArena";
import { FeedbackDisplay } from "./Components/FeedbackDisplay";
import { AIFeedback, Challenge } from "./main"; // Import Challenge

type AppState = "landing" | "selecting" | "doing" | "feedback";

function App() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(
    null
  ); // Changed to Challenge object
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChallengeSelect = (challenge: Challenge) => {
    // Changed to Challenge object
    setActiveChallenge(challenge);
    setAppState("doing");
  };

  const handleSubmission = async (submission: string) => {
    if (!activeChallenge) return;
    setIsLoading(true);
    try {
      const result = await window.electronAPI.evaluateSubmission({
        challenge: activeChallenge.description, // Pass the detailed description
        submission: submission,
      });
      setFeedback(result);
      setAppState("feedback");
    } catch (error) {
      console.error("Evaluation failed:", error);
      setAppState("doing");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDone = () => {
    setAppState("selecting");
    setActiveChallenge(null);
    setFeedback(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#242424",
      }}
    >
      <TitleBar />
      <div
        style={{
          flex: 1,
          position: "relative",
          overflowY: "auto",
          paddingTop: "20px",
        }}
      >
        {appState === "landing" && (
          <LandingDashboard onStart={() => setAppState("selecting")} />
        )}
        {appState === "selecting" && (
          <ChallengeGenerator onChallengeSelect={handleChallengeSelect} />
        )}
        {appState === "doing" && activeChallenge && (
          <QuestArena
            challenge={activeChallenge}
            onSubmit={handleSubmission}
            isLoading={isLoading}
          />
        )}
        {appState === "feedback" && feedback && (
          <FeedbackDisplay feedback={feedback} onDone={handleDone} />
        )}
      </div>
    </div>
  );
}

export default App;
