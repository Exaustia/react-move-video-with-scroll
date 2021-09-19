import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const inputRef = useRef();
  const roadmapref = useRef();
  const [timeHelmet, settimeHelmet] = useState(0);
  const [relativeHelmet, setrelativeHelmet] = useState(0);
  const [startHelmet, setstartHelmet] = useState(0);
  const [limitTopHelmet, setlimitTopHelmet] = useState(100);
  const [limitBotHelmet, setlimitBotHelmet] = useState(50);
  const [topHelmet, settopHelmet] = useState(0);
  let interval;

  useEffect(() => {
    const handleScroll = async () => {
      let helmet = inputRef.current.getBoundingClientRect();
      let roadmap = roadmapref.current.getBoundingClientRect();
      console.log(inputRef.current.getBoundingClientRect());
      // this.topHelmetVideo = helmet.top + window.scrollY;
      const a = window.scrollY - helmet.top - helmet.height;
      setrelativeHelmet(a);
      if (helmet.top <= limitTopHelmet && startHelmet === 0) {
        setstartHelmet(window.scrollY);
      }
      if (window.scrollY < startHelmet && startHelmet > 0) {
        setstartHelmet(0);
        settopHelmet(0);
      }

      if (
        startHelmet > 0 &&
        roadmap.height + roadmap.top - helmet.height > limitBotHelmet
      ) {
        settopHelmet(window.scrollY - startHelmet);
      }
    };

    window.addEventListener("scroll", handleScroll, true);

    inputRef.current.currentTime = timeHelmet;

    let time = timeHelmet;
    time += (relativeHelmet - timeHelmet) * 0.25;
    inputRef.current.currentTime = time / 50;

    // this.$refs["helmet-video"].currentTime = this.timeHelmet / 700

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [
    relativeHelmet,
    topHelmet,
    startHelmet,
    timeHelmet,
    limitBotHelmet,
    limitTopHelmet,
  ]);

  console.log(topHelmet);
  return (
    <div className="App">
      <header className="App-header" ref={roadmapref}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="box">
          <video
            width="250"
            id="helmet"
            autobuffer
            preload
            autoplay="autoplay"
            ref={inputRef}
            style={{ transform: `translateY(${topHelmet}px)` }}
          >
            <source src="helmet.mp4" type="video/mp4"></source>
          </video>
        </div>
      </header>
    </div>
  );
}

export default App;
