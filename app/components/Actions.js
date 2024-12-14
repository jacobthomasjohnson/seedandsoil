"use client";

import useGameStore from "../store/gameStore";

export const Actions = () => {
      const growPlants = useGameStore((state) => state.growPlants);
      const changeWater = useGameStore((state) => state.changeWater);
      const water = useGameStore((state) => state.water);
      const plantSeed = useGameStore((state) => state.plantSeed);
      const soil = useGameStore((state) => state.soil);
      const changeSoil = useGameStore((state) => state.changeSoil);
      const doWaterGarden = () => {
            if (water < 1) {
                  return;
            }
            changeWater("-1");
            growPlants();
      };
      const doPlantSeed = () => {
            if (soil < 1) {
                  return;
            }
            changeSoil("-1");
            plantSeed();
      };
      return (
            <div className="actions flex gap-4 p-6 py-0 items-center text-sm">
                  <button
                        className="p-2 px-4 border rounded-xl hover:bg-foreground hover:text-background"
                        onClick={doWaterGarden}
                  >
                        WATER GARDEN
                  </button>
                  <button
                        className="p-2 px-4 border rounded-xl hover:bg-foreground hover:text-background"
                        onClick={doPlantSeed}
                  >
                        PLANT A SEED
                  </button>
            </div>
      );
};

export default Actions;
