import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";

const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);
  return (
    <>
      <h1>Room</h1>
      <h4>
        {remoteSocketId ? "Some one is trying to Connect" : "No one in room"}
      </h4>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {myStream && (
        <>
          <h2>My Stream</h2>
          <ReactPlayer
            playing
            muted
            height={"400px"}
            width={"400px"}
            url={myStream}
          />
        </>
      )}
    </>
  );
};

export default Room;
