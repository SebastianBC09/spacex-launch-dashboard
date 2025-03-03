import { create } from 'zustand'
import { Rocket } from '../types/rocket';

interface RocketState {
  rockets: Rocket[];
  setRockets: (rockets: Rocket[]) => void;
}

const useRocketStore = create<RocketState>((set) => ({
  rockets: [],
  setRockets: (rockets) => set({ rockets }),
}));

export default useRocketStore;
