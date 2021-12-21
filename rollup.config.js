import typescript from "rollup-plugin-typescript2"
import clear from "rollup-plugin-clear"
import { terser } from "rollup-plugin-terser"

const masterVersion = require('./package.json').version
// major name
const M = 'MidApis'


const common = {
  input: 'src/index.ts',
  output: {
    name: M,
    banner: `/* ${M} version ' + ${masterVersion} */`,
    footer: '/* follow me on Github! @AiWeiEr324 */'
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      useTsconfigDeclarationDir: true,
    })
  ]
}

const esmPackage = {
  ...common,
  output: {
    file: `./dist/midApis.esm.js`,
    format: 'es',
    sourcemap: true,
    ...common.output
  },
  plugins: [
    ...common.plugins,
    clear({
      targets: ['./dist']
    })
  ]
}
const cjsPackage = {
  ...common,
  external: [],
  output: {
    file: `./dist/midApis.js`,
    format: 'cjs',
    sourcemap: true,
    minifyInternalExports: true,
    ...common.output
  },
  plugins: [...common.plugins]
}

const iifePackage = {
  ...common,
  external: [],
  output: {
    file: `./dist/MidApis.min.js`,
    format: 'iife',
    ...common.output
  },
  plugins: [...common.plugins, terser()]
}

const total = {
  esmPackage,
  cjsPackage,
  iifePackage
}

export default [...Object.values(total)]