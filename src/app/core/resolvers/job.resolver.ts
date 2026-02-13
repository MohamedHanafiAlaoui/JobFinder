import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { JobsService } from '../services/job/jobs.service';

export const jobsResolver: ResolveFn<any> = () => {
  const service = inject(JobsService);
  return service.getJobs({ page: 1});
};
