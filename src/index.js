import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSpring, a } from "react-spring";

import goriya from "../public/img/goriya.gif";
import armos from "../public/img/armos.gif";

import "./styles.css";

function Box(props) {
  const { width } = useSpring({ width: props.width });
  return (
    <a.div style={{ width, height: "50px", backgroundColor: "red" }}>
      {width}
    </a.div>
  );
}
function String() {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 }
  });
  return <a.h1 style={props}>Hello!</a.h1>;
}

function Number() {
  const props = useSpring({
    number: 100,
    from: { number: 0 },
    config: { mass: 1, tension: 100, friction: 200 }
  });
  return <a.h1>{props.number}</a.h1>;
}
function Scroll() {
  const props = useSpring({
    scroll: 300,
    from: { scroll: 0 }
  });

  return (
    <a.div
      style={{
        height: 300,
        width: 200,
        border: "1px solid black",
        overflow: "scroll"
      }}
      scrollTop={props.scroll}
    >
      <h1>
        React Spring is the future of animation in React. It is simply
        incredible how easy it is to create awesome animations without any need
        to fiddle with CSS.
      </h1>
    </a.div>
  );
}
function AsyncAnimation() {
  const props = useSpring({
    to: async next => {
      await next({ opacity: 1, color: "green" });
      await next({ opacity: 0, color: "blue" });
    },
    from: { opacity: 0, color: "red" }
  });
  return <a.h1 style={props}>Fade</a.h1>;
}
function ChainAnimation() {
  const props = useSpring({
    to: [{ opacity: 1, color: "green" }, { opacity: 0, color: "blue" }],
    from: { opacity: 0, color: "red" },
    config: { mass: 10, tension: 250, friction: 100 }
  });
  return <a.h1 style={props}>Incredible!</a.h1>;
}
function Card() {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(40px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  return (
    <div onClick={() => set(state => !state)}>
      <a.div
        class="c"
        style={{
          opacity: opacity.interpolate(o => 1 - o),
          transform,
          backgroundImage: `url('${goriya}')`
        }}
      />
      <a.div
        class="c"
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
          backgroundImage: `url('${armos}')`
        }}
      />
    </div>
  );
}

function App() {
  const [width, setWidth] = useState(100);

  return (
    <>
      <button onClick={() => setWidth(width - 100)}>-100</button>
      <button onClick={() => setWidth(width + 100)}>+100</button>
      <Box width={width} />
      <String />
      <Number />
      <Scroll />
      <AsyncAnimation />
      <ChainAnimation />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
