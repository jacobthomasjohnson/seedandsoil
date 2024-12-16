"use client";

import { useEffect } from "react";
import useGameStore from "../store/gameStore";

export const Header = () => {
      const water = useGameStore((state) => state.water);
      const startWater = useGameStore((state) => state.startWater);
      const money = useGameStore((state) => state.money);
      const soil = useGameStore((state) => state.soil);
      const startSoil = useGameStore((state) => state.startSoil);
      const time = useGameStore((state) => state.currentTime);
      const dayWaterAmount = useGameStore((state) => state.dayWaterAmount);
      useEffect(() => {
            startWater();
            startSoil();
      }, []);
      return (
            <header className="flex justify-between">
                  <div className="logo p-6 text-2xl"></div>
                  <div className="flex hud gap-6 p-6 font-mono">
                        <div><span className="text-blue-200">water:</span> {Math.floor(water)}</div>
                        <div><span className="text-blue-200">water used today:</span> {Math.floor(dayWaterAmount)}</div>
                        <div><span className="text-green-200">money:</span> ${money}</div>
                        <div><span className="text-orange-200">soil:</span> {Math.floor(soil)}</div>
                        <div>time: {time}</div>
                  </div>
            </header>
      );
};

export default Header;
