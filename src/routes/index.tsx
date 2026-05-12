import { createFileRoute } from "@tanstack/react-router";
import EnviroMindApp from "@/components/EnviroMindApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EnviroMind — Intelligence for a Greener Campus" },
      { name: "description", content: "AI-powered campus intelligence platform for Nigerian universities. Anonymous reporting, real-time environmental insight, and ENVO AI guidance." },
      { property: "og:title", content: "EnviroMind — Intelligence for a Greener Campus" },
      { property: "og:description", content: "AI-powered, anonymous campus intelligence for Nigerian universities." },
    ],
  }),
  component: EnviroMindApp,
});
