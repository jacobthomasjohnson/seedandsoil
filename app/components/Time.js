"use client";

import { useEffect, useState, useRef } from "react";
import useGameStore from "../store/gameStore";

export const Time = () => {
      const startTime = useGameStore((state) => state.startTime);
      const currentTime = useGameStore((state) => state.currentTime);
      let timeRef = useRef(currentTime);
      const timeOfDayColor = useGameStore((state) => state.timeOfDayColor);
      const setTimeOfDayColor = useGameStore((state) => state.setTimeOfDayColor);
      const timeOfDayColors = {
            morning: "#F2A765",
            noon: "#FFF384",
            evening: "#CBB797",
            night: "#474542",
      };
      useEffect(() => {
            if (currentTime === 300) {
                  setTimeOfDayColor(timeOfDayColors.morning);
                  timeRef.current = currentTime;
            } else if (currentTime === 900) {
                  setTimeOfDayColor(timeOfDayColors.noon);
                  timeRef.current = currentTime;
            } else if (currentTime === 1500) {
                  setTimeOfDayColor(timeOfDayColors.evening);
                  timeRef.current = currentTime;
            } else if (currentTime === 2100) {
                  setTimeOfDayColor(timeOfDayColors.night);
                  timeRef.current = currentTime;
            }
      }, [currentTime]);
      useEffect(() => {
            startTime();
      }, []);
      return (
            <div className="p-6 pt-0 w-full rounded-xl">
                  <div
                        className="w-full block h-[30px] rounded-2xl transition-all duration-[25s]"
                        style={{
                              background: `${timeOfDayColor}`,
                        }}
                  ></div>
            </div>
      );
};

export default Time;
