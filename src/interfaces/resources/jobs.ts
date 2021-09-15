export enum JobStatus {
  NA = 'NA',
  UP = 'UP',
  DOWN = 'DOWN'
}

export interface Job {
  id: number;
  jobName: string;
  jobUrl: string;
  frequency: number;
  userID: number;
  active: boolean;
  createdAt: Date;
  modifiedAt: Date;
  status: JobStatus;
}

export const statusColors = new Map<JobStatus, string>([
  [JobStatus.NA, '#A6A5A5'],
  [JobStatus.UP, '#7DD77B'],
  [JobStatus.DOWN, '#D77B7B']
]);
