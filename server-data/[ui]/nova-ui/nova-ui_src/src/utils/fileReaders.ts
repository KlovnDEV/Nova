const svgReader = (r: __WebpackModuleApi.RequireContext): void => r.keys().forEach(r);

const imgReader = function (
  r: __WebpackModuleApi.RequireContext,
): Array<{ originalPath: string; processedPath: string }> {
  return r.keys().map(path => ({
    originalPath: path,
    processedPath: r(path).default,
  }));
};

export { svgReader, imgReader };
