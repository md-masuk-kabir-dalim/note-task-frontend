import { destroyCookie } from "nookies";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/constant/cookies";

export function clearClientAuthCookies() {
  destroyCookie(null, ACCESS_COOKIE);
  destroyCookie(null, REFRESH_COOKIE);
  destroyCookie(null, "accessToken");
  destroyCookie(null, "refreshToken");
}
