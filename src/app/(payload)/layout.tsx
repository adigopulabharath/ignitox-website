//==============================================================================
// PAYLOAD ADMIN — ROOT LAYOUT
//==============================================================================
// Standard Payload mounting layout (kept close to the official template so
// upgrades stay painless). Serves the /admin panel and its server functions.
//------------------------------------------------------------------------------

import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";

import { importMap } from "./admin/importMap.js";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

function Layout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}

export default Layout;
