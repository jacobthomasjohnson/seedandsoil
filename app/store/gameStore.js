import { create } from "zustand";

import plants from "../data/plants";
import { randomIntBetween } from "../utils/math";

export const useGameStore = create((set, get) => ({
      randomIntBetween,
      plants,

      usedIds: [],
      generateId: () => {
            let id;
            do {
                  id = randomIntBetween(100000000, 999999999); // Generate a random ID between a range
            } while (get().usedIds.includes(id)); // Ensure it's unique

            set((state) => ({
                  usedIds: [...state.usedIds, id], // Add the new ID to usedIds
            }));

            return id; // Return the new unique ID
      },

      plantsInGarden: [
            {
                  uniqueId: 38492385928359, // Random ID for this specific plant.
                  plantId: 1, // Which plant from plant array is used.
                  currentSize: 1, // Scale amount of plant to show it's growth.
                  dried: 0, // Once it gets to 100 the plant dies.
                  top: 30,
                  left: 70,
            },
      ],
      growPlantInGarden: (gardenPlantId, amountToGrow) => {
            set((state) => {
                  return {
                        ...state,
                        plantsInGarden: state.plantsInGarden.map((plant) =>
                              plant.uniqueId === gardenPlantId
                                    ? {
                                            ...plant,
                                            currentSize:
                                                  plant.currentSize +
                                                  amountToGrow,
                                      }
                                    : plant
                        ),
                  };
            });
      },
      plantSeed: () => {
            const generateId = get().generateId;
            const randomIntBetween = get().randomIntBetween;

            // Generate a unique ID for the plant
            const uniqueId = generateId();

            // Randomly select a plant from the `plants` array
            const plants = get().plants;
            const plantId =
                  plants[randomIntBetween(0, plants.length - 1)]?.plantId;

            // Set initial plant properties
            const currentSize = 1;
            const dried = 0;

            const transitionDuration = randomIntBetween(100,5000);

            // Generate random position
            const top = randomIntBetween(0, 100);
            const left = randomIntBetween(0, 100);

            // Add the new plant to the garden
            set((state) => ({
                  ...state,
                  plantsInGarden: [
                        ...state.plantsInGarden,
                        {
                              uniqueId,
                              plantId,
                              currentSize,
                              dried,
                              top,
                              left,
                              transitionDuration,
                        },
                  ],
            }));
      },

      growPlants: () => {
            const plantsInGarden = get().plantsInGarden;
            plantsInGarden.forEach((plant) => {
                  const originalPlant = get().plants.find(
                        (p) => p.plantId === plant.plantId
                  );
                  const plantGrowthSpeed = originalPlant.plantGrowthSpeed;
                  get().growPlantInGarden(plant.uniqueId, plantGrowthSpeed);
            });
      },
      addPlantToGarden: (plant) => {
            set((state) => {
                  return {
                        ...state,
                        plantsInGarden: [...state.plantsInGarden, plant],
                  };
            });
      },

      // Time of day color

      timeOfDayColor: "#474542", // By default, night color is selected.
      setTimeOfDayColor: (hexColor) => {
            set((state) => {
                  return {
                        ...state,
                        timeOfDayColor: hexColor,
                  };
            });
      },

      // Time

      currentTime: 0,
      timeTick: () => {
            if (get().currentTime > 2400) {
                  set((state) => {
                        return {
                              ...state,
                              currentTime: 0,
                        };
                  });
            } else {
                  set((state) => {
                        return {
                              ...state,
                              currentTime: state.currentTime + 1,
                        };
                  });
            }
      },
      startTime: () => {
            const passTime = setInterval(() => {
                  // Pass one minute
                  get().timeTick();
            }, 50);
      },

      // Resources

      money: 0,

      water: 0,
      waterRate: 1,
      waterTick: () => {
            set((state) => {
                  return {
                        ...state,
                        water: state.water + state.waterRate,
                  };
            });
      },
      startWater: () => {
            const increaseWater = setInterval(() => {
                  get().waterTick();
            }, 50);
      },
      changeWater: (amount) => {
            if (get().water < 1) {
            } else {
                  const subtract = amount.trim().startsWith("-");
                  const quantity = Number(amount.trim().slice(1)); // Convert string after removing the sign

                  set((state) => {
                        return {
                              ...state,
                              water: subtract
                                    ? state.water - quantity
                                    : state.water + Number(amount.trim()),
                        };
                  });
            }
      },

      modifyWaterRate: () => {},

      soil: 0,
      soilRate: 1,
      soilTick: () => {
            set((state) => {
                  return {
                        ...state,
                        soil: state.soil + state.soilRate,
                  };
            });
      },
      startSoil: () => {
            const increaseSoil = setInterval(() => {
                  get().soilTick();
            }, 50);
      },
      changeSoil: (amount) => {
            if (get().water < 1) {
            } else {
                  const subtract = amount.trim().startsWith("-");
                  const quantity = Number(amount.trim().slice(1)); // Convert string after removing the sign

                  set((state) => {
                        return {
                              ...state,
                              soil: subtract
                                    ? state.soil - quantity
                                    : state.soil + Number(amount.trim()),
                        };
                  });
            }
      },
      modifySoilRate: () => {},
}));

export default useGameStore;
