import {io} from "socket.io-client";

export const initSocket2 = async()=> {
    // connect to backend -> server2.js
    const options = {
        'force new connection' : true ,
        'reconnectionAttempts' : 'Infinity' ,
        'timeout' : 10000 ,
        'transports' : ['websocket']
    }

    return io("http://localhost:5050" , options);
}