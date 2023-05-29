import { Application, Router } from "./deps.ts";

const router = new Router({ prefix: "/api/statService" });

const exammanageApiBaseUrl =
  Deno.env.get("EXAMMANAGE_API_BASE_URL") ?? "http://localhost:8080";

router.get("/stats", async (context) => {
  const exams = await fetch(`${exammanageApiBaseUrl}/exams`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
  context.response.body = exams;
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
