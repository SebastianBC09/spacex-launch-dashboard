export interface Rocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  description: string;
  height_m: number;
  diameter_m: number;
  mass_kg: number;
  flickr_images: string[];
  wikipedia: string;
  engines_type: string;
}
