import { z } from 'zod';

export const issueSchema = z.object({
    title: z.string().min(1, 'Title is Required').max(255),
    description: z.string().max(65535)
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, 'Title is Required').max(255).optional(),
    description: z.string().max(65535).optional(),
    assignedToUserId: z.string().min(1, "Assigned to UserID is Required").max(255).optional().nullable()
});
