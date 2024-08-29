import typescript from "@rollup/plugin-typescript";

// TODO: Try to implement @rollup/plugin-node-resolve

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    compact: true,
  },

  external: ["react"],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
  ],
};
