"use server";

import { z } from "zod";
import { serverAction } from "~/server/lib/server-action";

export const helloAction = serverAction
  .input(z.object({ name: z.string() }))
  .action(async (input) => {
    console.log(`Hello server, this is ${input.name}!`);
    return { message: `Hello ${input.name}, this is server!` };
  });
