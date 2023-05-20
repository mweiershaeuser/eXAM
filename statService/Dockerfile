FROM denoland/deno:1.33.4

EXPOSE 8000

WORKDIR /app

USER deno

COPY deps.ts deno.lock ./
RUN deno cache --lock=deno.lock deps.ts

COPY . .
RUN deno cache main.ts

CMD ["run", "--lock=deno.lock", "--allow-net", "main.ts"]