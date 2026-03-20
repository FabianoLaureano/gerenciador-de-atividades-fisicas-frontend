"use server";

import { createTrainingLog } from "@/app/_lib/api/fetch-generated";

export async function createTrainingLogAction(data: {
  name?: string;
  description?: string;
  type?: string;
}) {
  return createTrainingLog(data);
}
