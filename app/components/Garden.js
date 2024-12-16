"use client";

import { useState, useEffect, useRef } from "react";
import useGameStore from "../store/gameStore";
import { randomIntBetween } from "../utils/math";

export const Garden = () => {
      const plantsInGarden = useGameStore((state) => state.plantsInGarden);
      const timeOfDayColor = useGameStore((state) => state.timeOfDayColor);
      const plants = useGameStore((state) => state.plants);
      const water = useGameStore((state) => state.water);
      const growPlants = useGameStore((state) => state.growPlants);
      let amountOfPlants = useRef(plantsInGarden.length);
      const [animPos, setAnimPos] = useState({});
      const [typeOfPlant, setTypeOfPlant] = useState(null);
      const gardenRef = useRef(null);

      const [seedAnims, setSeedAnims] = useState([]);

      const getAnimationPositionById = (uniqueId) => {
            const plant = plantsInGarden.find(
                  (plant) => plant.uniqueId === uniqueId
            );
            setAnimPos({
                  top: plant.top,
                  left: plant.left,
            });
      };

      const playSeedAnim = (pos) => {
            const { top, left } = pos;
            const div = document.createElement("div");
            const originalPlant = plants.find((plant) => plant.plantId === typeOfPlant);
            console.log(typeOfPlant)
            Object.assign(div.style, {
                  position: "absolute",
                  top: `${top}%`,
                  left: `${left}%`,
                  width: "20px",
                  height: "20px",
                  transform: "translate(-100%, -100%)",
                  backgroundColor: originalPlant.plantHexColor,
                  borderRadius: "50%",
                  animation: "seedDrop 5s cubic-bezier(0,1,0,1)",
                  zIndex: 1000,
            });
            gardenRef.current.appendChild(div);

            setTimeout(() => {
                  gardenRef.current.removeChild(div);
            }, 4000); // Remove animation div after animation ends
      };

      useEffect(() => {}, [water]);

      useEffect(() => {
            if (amountOfPlants.current < plantsInGarden.length) {
                  console.log(`Playing anim at ${animPos.top}`);
                  playSeedAnim(animPos);
            }
            amountOfPlants.current = plantsInGarden.length;
      }, [plantsInGarden.length]);

      return (
            <div
                  className="p-6 grow border m-6 mt-0 rounded-2xl relative transition-all duration-[25s] overflow-hidden z-50"
                  style={{
                        borderColor: timeOfDayColor, // Fixed inline style
                  }}
                  ref={gardenRef}
            >
                  {plantsInGarden.map((plant) => {
                        const originalPlant = plants.find(
                              (p) => p.plantId === plant.plantId
                        );
                        if (!seedAnims.includes(plant.uniqueId)) {
                              // Play animation.
                              getAnimationPositionById(plant.uniqueId);
                              setTypeOfPlant(plant.plantId);
                              setSeedAnims([...seedAnims, plant.uniqueId]);
                              console.log(animPos);
                        }

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
                                          height:
                                                `3` * plant.currentSize + "px",
                                          transform: `translate(-50%, -50%)`,
                                          backgroundColor:
                                                originalPlant?.plantHexColor ||
                                                "#000",
                                          borderRadius: `100%`,
                                          transitionDuration:
                                                plant.transitionDuration + "ms",
                                    }}
                              ></div>
                        );
                  })}
            </div>
      );
};

export default Garden;
