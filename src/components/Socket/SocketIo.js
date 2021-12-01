import {API_URL} from '@env';

import io from 'socket.io-client';
let socket = io(API_URL);

export default socket;
