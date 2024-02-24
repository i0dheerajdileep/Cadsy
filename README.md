# Cadsy

Cadsy is an npm package that seamlessly integrates with JavaScript applications, helping developers detect and block nudity or vulgar content in user inputs. It works with any JavaScript-based app, like React or Next.js, offering a comprehensive solution for content moderation.

## Features

- **Content Moderation**: Detect and block nudity or vulgar content in user inputs.
- **Seamless Integration**: Easily integrate Cadsy into your JavaScript applications.
- **Compatibility**: Works with any JavaScript-based app, including React, Next.js, and more.
- **Comprehensive Solution**: Provides a comprehensive solution for content moderation, enhancing user experience and safety.

## Installation

You can install Cadsy via npm:

```bash
npm install cadsy
```
## Usage

```bash
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Cadsy from 'cadsy';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Cadsy>
      <App />
    </Cadsy>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```
