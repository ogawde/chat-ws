FROM oven/bun:1.3.9

WORKDIR /app

# Install dependencies first for better layer caching.
COPY package.json ./
RUN bun install --production

# Copy source after dependencies.
COPY src ./src

ENV PORT=8080
EXPOSE 8080

CMD ["bun", "run", "src/index.ts"]
