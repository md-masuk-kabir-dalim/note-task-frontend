import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3b1d73",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 96,
            height: 118,
            background: "#ffffff",
            borderRadius: 14,
            padding: "22px 16px 16px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 64,
              height: 8,
              borderRadius: 4,
              background: "#3b1d73",
              opacity: 0.35,
            }}
          />
          <div
            style={{
              width: 48,
              height: 8,
              borderRadius: 4,
              background: "#3b1d73",
              opacity: 0.35,
              marginTop: 12,
            }}
          />
          <div
            style={{
              marginTop: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              width: 36,
              height: 28,
              borderRadius: 8,
              background: "#3b1d73",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
