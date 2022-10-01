/**
 * @File AxiosでAPIを呼び出す場合にプロキシを噛ませる
 */
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await httpProxyMiddleware(req, res, {
    // FIXME: 今はポケモンAPI
    target: `https://pokeapi.co`,
    changeOrigin: true,
    pathRewrite: {
      "^/proxy": "/v2",
    },
  });
};

export default handler;
