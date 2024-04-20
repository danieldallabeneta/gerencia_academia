import axios from "axios";

const clienteApi = axios.create({
    baseURL: 'http://localhost:8080'
});

export const obterLojasApi = () => clienteApi.get(`/lojas`);
export const obterLojaIdApi = (id) => clienteApi.get(`/lojas/${id}`);
export const registerLojaApi = (loja) => clienteApi.post(`/loja`,loja);


export const obterAlunosApi = (id) => clienteApi.get(`/alunos/${id}`);
export const registerAlunoApi = (aluno) => clienteApi.post(`/aluno`,aluno);