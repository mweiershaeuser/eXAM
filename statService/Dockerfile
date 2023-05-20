FROM denoland/deno:1.33.4

EXPOSE 8000

WORKDIR /app

USER deno

COPY deps.ts deno.lock ./
RUN deno cache --lock deps.ts

COPY . .
RUN deno cache main.ts

CMD ["run", "--lock", "--allow-net", "main.ts"]