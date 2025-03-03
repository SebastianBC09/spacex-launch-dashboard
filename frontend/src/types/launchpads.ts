export interface Launchpad {
  id: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  status: string;
  images: string[];
  details: string;
  launch_attempts: number;
  launch_successes: number;
}
