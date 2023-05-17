"use client";

import { FormEventHandler, useState, useTransition } from "react";
import { helloAction } from "./actions";

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    startTransition(async () => {
      const name = Object.fromEntries(
        new FormData(e.currentTarget)
      ).name.toString();
      const result = await helloAction({ name: name.toString() });
      setMessage(result.message);
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          disabled={isPending}
          required
          minLength={1}
          className="text-black"
        />
        <button
          type="submit"
          disabled={isPending}
          className="border-white border p-1"
        >
          Say hello to server
        </button>
        {isPending ? (
          <p className="text-white">Loading...</p>
        ) : (
          <p className="text-white">{message}</p>
        )}
      </form>
    </main>
  );
}
