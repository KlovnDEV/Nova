import typescript from 'rollup-plugin-typescript2';
// import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const config = [];

const pkgPlugin = generatePackageJson({
  outputFolder: 'lib',
  baseContents: (pkg) => ({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    private: true
  })
});

config.push({
  input: './server.ts',
  output: [
    {
      file: './lib/server.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      assetFileNames: '[name][extname]',
    },
    {
      file: './lib/server.es.js',
      format: 'es',
      exports: 'named',
      sourcemap: true,
      assetFileNames: '[name][extname]',
    },
  ],
  plugins: [
    external(),
    commonjs(),
    nodeResolve({
      preferBuiltins: true,
    }),
    typescript({
      tsconfigOverride: {
        "include": ["./server/**/*.ts"],
        "compilerOptions": {
          "types": ["@citizenfx/server", "@types/node"],
        }
      },
      declarationDir: './lib/',
      tsconfig: './tsconfig.json',
    }),
    pkgPlugin
  ],
});

config.push({
  input: './client.ts',
  output: [
    {
      file: './lib/client.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      assetFileNames: '[name][extname]',
    },
    {
      file: './lib/client.es.js',
      format: 'es',
      exports: 'named',
      sourcemap: true,
      assetFileNames: '[name][extname]',
    },
  ],
  plugins: [
    external(),
    commonjs(),
    nodeResolve({
      preferBuiltins: true,
    }),
    typescript({
      tsconfigOverride: {
        "include": ["./client/**/*.ts"],
        "compilerOptions": {
          "types": ["@citizenfx/client", "@types/node"],
        }
      },
      declarationDir: './lib/',
      tsconfig: './tsconfig.json',
    }),
    pkgPlugin
  ],
});


config.push({
  input: './shared.ts',
  output: [
    {
      file: './lib/shared.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      assetFileNames: '[name][extname]',
    },
    {
      file: './lib/shared.es.js',
      format: 'es',
      exports: 'named',
      sourcemap: true,
      assetFileNames: '[name][extname]',
    },
  ],
  plugins: [
    external(),
    commonjs(),
    nodeResolve({
      preferBuiltins: true,
    }),
    typescript({
      tsconfigOverride: {
        "include": ["./shared/**/*.ts"],
        "compilerOptions": {
          "types": ["@types/node"],
        }
      },
      declarationDir: './lib/',
      tsconfig: './tsconfig.json',
    }),
    pkgPlugin
  ],
});

export default config;