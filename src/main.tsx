export interface AIFeedback {
  title: string;
  feedback_text: string;
}

//-- ADD THIS INTERFACE --//
export interface Challenge {
  title: string;
  description: string;
}

export interface IElectronAPI {
  minimizeWindow: () => void;
  closeWindow: () => void;
  //-- UPDATE THIS LINE --//
  generateCategories: (interest: string) => Promise<Challenge[]>;
  evaluateSubmission: (args: {
    challenge: string;
    submission: string;
  }) => Promise<AIFeedback>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
export interface AIFeedback {
  title: string;
  feedback_text: string;
}

// export interface IElectronAPI {
//   minimizeWindow: () => void;
//   closeWindow: () => void;
//   generateCategories: (interest: string) => Promise<string[]>;
//   evaluateSubmission: (args: {
//     challenge: string;
//     submission: string;
//   }) => Promise<AIFeedback>;
// }

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
