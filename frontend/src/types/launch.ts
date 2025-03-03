export type LaunchStatus = 'success' | 'failure' | 'scheduled' | 'aborted' | 'partial_failure';

export interface Launch {
  date_utc: string;
  status: LaunchStatus;
  details: string | null;
  id: string;
  mission_name: string;
  launchpad_id: string;
  rocket_id: string;
}
