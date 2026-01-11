import { Result } from "@/actions/types";
import z from "zod";

export const inputSchema = z.object({
  email: z.email(),
});

export type UserData = z.infer<typeof inputSchema>;

export function validateInput(data: UserData): Result<null> {
  const result = inputSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.format();
    console.error("[ERROR VALIDATING INPUT DATA]", errors);
    return { data: null, error: Object.values(errors).flat().join(", "), status: 400 };
  }

  return { data: null, error: null, status: 200 };
}
