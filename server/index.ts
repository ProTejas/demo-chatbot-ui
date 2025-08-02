// Simple static file server for the Tata Capital Chatbot UI
import { createServer } from "vite";

const startServer = async () => {
  try {
    const server = await createServer({
      server: {
        host: "0.0.0.0",
        port: 5000,
      },
      root: ".",
    });

    await server.listen();
    console.log("[vite] Static UI server running on http://0.0.0.0:5000");
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();