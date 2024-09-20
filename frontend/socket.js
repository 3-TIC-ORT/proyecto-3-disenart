const socket = io("http://localhost:3000");


const postData = (type, data, callback = () => {}) => {
  socket.emit("POSTEvent", type, data, callback);
};


const fetchData = (type, data, callback) => {
  socket.emit("GETEvent", type, data, callback);
};
