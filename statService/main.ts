import { Application, Router } from "./deps.ts";

const router = new Router({ prefix: "/api/statService" });

router.get("/stats", async (context) => {
  const exams = await fetch("http://localhost:8080/exams", {
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
