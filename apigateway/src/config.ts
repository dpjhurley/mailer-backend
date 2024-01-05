import "dotenv/config";

const config = {
  grpcPort: process.env.GRPC_PORT || "50001",
  apiPort: process.env.API_PORT || "8080"
};

if (!config) {
  throw new Error("Missing config");
}

export default config;
