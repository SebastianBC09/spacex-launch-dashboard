import { useQuery } from "@tanstack/react-query";
import { LaunchpadService } from "../api/services/launchpads";

export const useLaunchpads = () => {
  return useQuery({
    queryKey: ['launchpads'],
    queryFn: LaunchpadService.getAll
  });
};
