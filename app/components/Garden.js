"use client";

import { useState, useEffect, use } from "react";
import useGameStore from "../store/gameStore";
import { randomIntBetween } from "../utils/math";

export const Garden = () => {
      const plantsInGarden = useGameStore((state) => state.plantsInGarden);
      const timeOfDayColor = useGameStore((state) => state.timeOfDayColor);
      const plants = useGameStore((state) => state.plants);
      const water = useGameStore((state) => state.water);
      const growPlants = useGameStore((state) => state.growPlants);

      useEffect(() => {
            
      }, [water]);

      return (
            <div
                  className="p-6 grow border m-6 mt-0 rounded-2xl relative transition-all duration-[25s] overflow-hidden"
                  style={{
                        borderColor: timeOfDayColor, // Fixed inline style
                  }}
            >
                  {plantsInGarden.map((plant) => {
                        const originalPlant = plants.find(
                              (p) => p.plantId === plant.plantId
                        );

                        return (
                              <div
                                    key={plant.uniqueId}
                                    className="transition-all"
                                    style={{
                                          transformOrigin: "50% 50%",
                                          position: "absolute",
                                          top: plant.top + "%",
                                          left: plant.left + "%",
                                          width: `3` * plant.currentSize + "px",
                                          height: `3` * plant.currentSize + "px",
                                          transform: `translate(-50%, -50%)`,
                                          backgroundColor:
                                                originalPlant?.plantHexColor ||
                                                "#000",
                                          borderRadius: `100%`,
                                          transitionDuration: plant.transitionDuration + "ms",
                                    }}
                              ></div>
                        );
                  })}
            </div>
      );
};

export default Garden;
