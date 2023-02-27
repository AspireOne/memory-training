import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { MantineProvider } from '@mantine/core';
import "~/styles/globals.css";
import { NotificationsProvider } from "@mantine/notifications";

const MyApp: AppType = ({ Component, pageProps }) => {

  return (
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
        }}
      >
        <NotificationsProvider>
          <div className={`bg-[#151628] px-4 py-16 min-h-screen`}>
            <Component {...pageProps} />
          </div>
        </NotificationsProvider>
      </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
