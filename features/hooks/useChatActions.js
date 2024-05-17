
const useChatActions = () => {

    const joinRoom = (roomID) => {
    }

    const leaveRoom = (roomID) => {
    }

    const sendMessage = (text, roomID, userName) => {
        if(! text) {
            return;
        }
                
    }

    return {
        joinRoom,
        sendMessage,
        leaveRoom
    }
};

export default useChatActions;