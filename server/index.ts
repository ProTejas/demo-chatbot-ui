import { createServer } from "vite";
import { join } from "path";

const startServer = async () => {
  try {
    const server = await createServer({
      configFile: join(process.cwd(), "vite.config.ts"),
      server: {
        host: "0.0.0.0",
        port: 5000,
      },
    });

    await server.listen();
    console.log("[vite] dev server running on http://0.0.0.0:5000");
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();