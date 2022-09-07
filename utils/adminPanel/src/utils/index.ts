function wrapInAPIResponse({
  value,
  status = 200,
}: {
  value: unknown;
  status?: number;
}): Promise<APIResponse> {
  return new Promise(p => p({ status, data: value }));
}

function sleep(ms: number): Promise<APIResponse> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const svgAssets = require.context(`${ASSETS}/svg`, true, /\.svg$/);

function getSvg(filename: string): string {
  try {
    return svgAssets(filename);
  } catch (e) {
    console.error(e);
    return null;
  }
}

function numberWithSeparator(x: number, sep = ' '): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

export { wrapInAPIResponse, sleep, getSvg, numberWithSeparator };
