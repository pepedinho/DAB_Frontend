import React from 'react';
import styled from 'styled-components';

const DownloadLoader = () => {
  return (
    <StyledWrapper>
      <div className="spinner" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .spinner {
    --size: 7.5px;
    --color: white;
    width: 15px;
    height: 15px;
    position: relative;
  }

  .spinner::after,.spinner::before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    width: var(--size);
    height: var(--size);
    top: 50%;
    animation: up 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
    left: 50%;
    background: var(--color);
    box-shadow: 0 0 calc(var(--size) / 3) rgba(0, 0, 0, 0.25);
  }

  .spinner::after {
    background: var(--color);
    top: calc(50% - var(--size));
    left: calc(50% - var(--size));
    animation: down 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
  }

  @keyframes down {
    0%, 100% {
      transform: none;
    }

    25% {
      transform: translateX(100%);
    }

    50% {
      transform: translateX(100%) translateY(100%);
    }

    75% {
      transform: translateY(100%);
    }
  }

  @keyframes up {
    0%, 100% {
      transform: none;
    }

    25% {
      transform: translateX(-100%);
    }

    50% {
      transform: translateX(-100%) translateY(-100%);
    }

    75% {
      transform: translateY(-100%);
    }
  }`;

export default DownloadLoader;
