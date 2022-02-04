import './App.css';
import Navbar from './components/Navbar';
import NewsInfiniteScroll from './components/NewsInfiniteScroll';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


export default function App() {
  /* Using email1234 apiKey */
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const [progressBar, setProgressBar] = useState(0);

  const setProgress = (progress) => {
    setProgressBar(progress)
  }

  return (
    <>
      <Router>
        <LoadingBar color='#80f' progress={progressBar} />
        <Navbar />
        <Routes>
          <Route path="/" element={<NewsInfiniteScroll setProgress={setProgress} pageSize={5} apiKey={apiKey} key={'general'} category={'general'} country={'in'} />} />
          <Route path="/business" element={<NewsInfiniteScroll setProgress={setProgress} pageSize={5} apiKey={apiKey} key={'business'} category={'business'} country={'in'} />} />
          <Route path="/entertainment" element={<NewsInfiniteScroll setProgress={setProgress} pageSize={5} apiKey={apiKey} key={'entertainment'} category={'entertainment'} country={'in'} />} />
          <Route path="/health" element={<NewsInfiniteScroll setProgress={setProgress} pageSize={5} apiKey={apiKey} key={'health'} category={'health'} country={'in'} />} />
          <Route path="/science" element={<NewsInfiniteScroll setProgress={setProgress} pageSize={5} apiKey={apiKey} key={'science'} category={'science'} country={'in'} />} />
          <Route path="/sports" element={<NewsInfiniteScroll setProgress={setProgress} pageSize={5} apiKey={apiKey} key={'sports'} category={'sports'} country={'in'} />} />
          <Route path="/technology" element={<NewsInfiniteScroll setProgress={setProgress} pageSize={5} apiKey={apiKey} key={'technology'} category={'technology'} country={'in'} />} />
          <Route path="/general" element={<NewsInfiniteScroll setProgress={setProgress} pageSize={5} apiKey={apiKey} key={'general'} category={'general'} country={'in'} />} />
        </Routes>
      </Router>
    </>
  )

}