import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";

import.meta.env.PROD && AgoraRTC.setLogLevel(3);

const appId = "23f413f9d84249f89eda300d22a7abfa";
const token = null;

export const config = {
  mode: "rtc",
  codec: "vp8",
  appId: appId,
  token: token,
};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
