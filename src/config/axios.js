import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://rickandmortyapi.com/api'
});
export default clienteAxios;