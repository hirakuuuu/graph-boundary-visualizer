import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: import.meta.env.DEV ? "/" : "graph-boundary-visualizer/",
  plugins: [react(), tsconfigPaths()],
});
