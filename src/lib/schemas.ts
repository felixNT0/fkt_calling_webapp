import { z } from 'zod';

export const meetingSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  accessLevel: z.enum(["authenticated", "public"]).default("public"),
  slug: z.string().optional(),
});

export const agoraTokenSchema = z.object({
  channelName: z.string().min(1, "Channel name is required"),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start date format",
  }),
});
