import AgoraRTC from "agora-rtc-sdk-ng"
import axios from "axios"
import store from "../store/index"
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let rtc = {
    localAudioTrack: null,
    localVideoTrack: null,
    client: null
};



let options = {
    // Pass your App ID here.
    appId: "1dd8d304d2ca43929025aed73ede6976",
    // Set the channel name.  改成医生或者患者ID
    channel:window.sessionStorage.getItem("patientID"),
    // channel:'test',
    // Set the user ID.  改成用户ID
    // uid: 123456,
    uid: window.sessionStorage.getItem("userID"),
};

// 从 服务器获取 Token  地址要改
function fetchToken(uid, channelName) {
    return new Promise(function(resolve) {
        axios.get("http://100.78.144.140:9780/webrtc/getToken/" + channelName + "/" + uid
                // 'webrtc-service/' + 'webrtc/getToken/'
                // , {
                //     headers: {
                //         'Content-Type': 'application/json; charset=UTF-8'
                //     }
                // }
            )
            .then(function(response) {
                const token = response.data;
                console.log(token);
                resolve(token);
            })
            .catch(function(error) {
                console.log(error);
            });
    })
}

export async function startBasicCall() {

    console.log("11111111111");
    console.log(window.sessionStorage.getItem("patientID"));
    // Create an AgoraRTCClient object.
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
    rtc.client.on("user-published", async(user, mediaType) => {
        // Subscribe to the remote user when the SDK triggers the "user-published" event
        await rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");

        // If the remote user publishes a video track.
        if (mediaType === "video") {
            // Get the RemoteVideoTrack object in the AgoraRTCRemoteUser object.
            const remoteVideoTrack = user.videoTrack;
            // Dynamically create a container in the form of a DIV element for playing the remote video track.
            const remotePlayerContainer = document.createElement("div");
            // Specify the ID of the DIV container. You can use the uid of the remote user.
            remotePlayerContainer.id = user.uid.toString();
            remotePlayerContainer.textContent = "对方画面";
            remotePlayerContainer.style.width = "560px";
            remotePlayerContainer.style.height = "400px";
            remotePlayerContainer.style.position = "absolute";
            remotePlayerContainer.style.top = "28%";
            remotePlayerContainer.style.left = "1%";
            remotePlayerContainer.style.font = "1%";
            document.body.append(remotePlayerContainer);

            // Play the remote video track.
            // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
            remoteVideoTrack.play(remotePlayerContainer);

            // Or just pass the ID of the DIV container.
            // remoteVideoTrack.play(playerContainer.id);
        }

        // If the remote user publishes an audio track.
        if (mediaType === "audio") {
            // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
            const remoteAudioTrack = user.audioTrack;
            // Play the remote audio track. No need to pass any DOM element.
            remoteAudioTrack.play();
        }

        // Listen for the "user-unpublished" event
        rtc.client.on("user-unpublished", user => {
            // Get the dynamically created DIV container.
            const remotePlayerContainer = document.getElementById(user.uid);
            // Destroy the container.
            remotePlayerContainer.remove();
        });

    });

    window.onload = function() {

        document.getElementById("join").onclick = async function() {
            // Join an RTC channel.
            let token = await fetchToken(options.uid, options.channel);
            // let token = "0061dd8d304d2ca43929025aed73ede6976IABB545VtwO8kd/alywGeh45yRX5kPgco1T2vgy+hQEQuQx+f9gcOvXLIgBdmbqwrQ3IYQQAAQA9ysZhAgA9ysZhAwA9ysZhBAA9ysZh";
            await rtc.client.join(options.appId, options.channel, token, options.uid);
            // Create a local audio track from the audio sampled by a microphone.
            rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            // Create a local video track from the video captured by a camera.
            rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            // Publish the local audio and video tracks to the RTC channel.
            await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
            // Dynamically create a container in the form of a DIV element for playing the local video track.
            const localPlayerContainer = document.createElement("div");
            // Specify the ID of the DIV container. You can use the uid of the local user.
            localPlayerContainer.id = options.uid;
            localPlayerContainer.textContent = "您的画面";
            localPlayerContainer.style.width = "280px";
            localPlayerContainer.style.height = "210px";
            localPlayerContainer.style.position = "absolute";
            localPlayerContainer.style.top = "8%";
            localPlayerContainer.style.left = "46%";
            // localPlayerContainer.style.
            document.body.append(localPlayerContainer);

            // Play the local video track.
            // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
            rtc.localVideoTrack.play(localPlayerContainer);
            console.log("publish success!");
        }

        document.getElementById("leave").onclick = async function() {
            // Destroy the local audio and video tracks.
            rtc.localAudioTrack.close();
            rtc.localVideoTrack.close();

            // Traverse all remote users.
            rtc.client.remoteUsers.forEach(user => {
                // Destroy the dynamically created DIV containers.
                const playerContainer = document.getElementById(user.uid);
                playerContainer && playerContainer.remove();
            });

            // Leave the channel.
            await rtc.client.leave();
        }
    }
}