"use client";

import { useEffect, useRef, useState } from "react";
import Garden from "./Garden";
import Notifications from "./Notifications";

import useGameStore from "../store/gameStore";

export const Game = () => {
      const notify = useGameStore((state) => state.notify);
      const [gardenHeight, setGardenHeight] = useState(0);
      const div = useRef(null);

      useEffect(() => {
            if (div.current) {
                  const height = div.current.clientHeight;
                  setGardenHeight(height);
                  console.log(`Setting gardenHeight to: ${height}`);
                  notify(`setGardenHeight to: ${height}`);
            }
      }, []); // Runs only once after the initial render

      return (
            <div className="flex w-full grow" ref={div}>
                  <Garden />
                  <div className="w-1/3">
                        <Notifications maxHeight={gardenHeight} />
                  </div>
            </div>
      );
};

export default Game;
