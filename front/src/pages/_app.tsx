import { LoadingContextProvider } from "@/contexts/LoadingContext";
import { TaskAtualContextProvider } from "@/contexts/TaskAtualContext";
import { TaskContextProvider } from "@/contexts/TaskContext";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({Component, pageProps} : Readonly<AppProps>) {
  return (
    <TaskContextProvider>
        <TaskAtualContextProvider>
          <LoadingContextProvider>
            <Component {...pageProps} />
          </LoadingContextProvider>
        </TaskAtualContextProvider>
    </TaskContextProvider>
  );
}
