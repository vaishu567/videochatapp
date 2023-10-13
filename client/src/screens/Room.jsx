import React, { useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

const Room = () => {
  const socket = useSocket();
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);
  return <div>Room</div>;
};

export default Room;
