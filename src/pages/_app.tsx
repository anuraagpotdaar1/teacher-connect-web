import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SideNav from "../componants/sidenav";
import LoginForm from "./login";

export default function App({ Component, pageProps }: AppProps) {
  const isLoginForm = Component === LoginForm;
  const containerClasses = `relative ${isLoginForm ? "pl-0" : "pl-64"}`;
  return (
    <div className={containerClasses}>
      {!isLoginForm && <SideNav />}
      <Component {...pageProps} />
    </div>
  );
}
