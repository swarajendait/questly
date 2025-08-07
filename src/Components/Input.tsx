// src/components/Input.tsx

import React from "react";
import styled from "styled-components";

const Input = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  return (
    <StyledWrapper>
      <div className="input-container">
        <input
          className="input"
          name="text"
          type="text"
          placeholder="What's Questing today...?"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </StyledWrapper>
  );
};

// NOTE: The invalid <link> tag has been removed from here.

const StyledWrapper = styled.div`
  .input-container {
    position: relative;
    width: 100%;
    max-width: 270px;
  }

  .input {
    width: 100%;
    height: 40px;
    padding: 12px;
    font-size: 18px;
    /* CORRECTED FONT FAMILY */
    font-family: "Raster Forge", monospace;
    color: #000;
    font-weight: bold; /* font-weight should not be a string */
    background-color: #fff;
    border: 4px solid #000;
    border-radius: 0;
    outline: none;
    transition: all 0.3s ease;
    box-shadow: 8px 8px 0 #000;
  }

  .input::placeholder {
    color: #888;
    /* Use the same font for the placeholder for consistency */
    font-family: "Raster Forge", monospace;
  }

  .input:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 #000;
  }

  .input:focus {
    background-color: #010101;
    color: #fff;
    border-color: #d6d9dd;
  }

  .input:focus::placeholder {
    color: #fff;
  }
`;

export default Input;
