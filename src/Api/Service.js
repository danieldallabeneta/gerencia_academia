import axios from "axios";

const clienteApi = axios.create({
    baseURL: 'http://localhost:8080'
});

export const obterLojasApi = () => clienteApi.get(`/lojas`);
export const obterLojaIdApi = (id) => clienteApi.get(`/lojas/${id}`);
export const registerLojaApi = (loja) => clienteApi.post(`/loja`,loja);


export const obterAlunosApi = (id) => clienteApi.get(`/alunos/${id}`);

export const registerAlunoApi = (aluno) => clienteApi.post(`/aluno`,aluno);
export const deleteAlunoApi= (id) => clienteApi.delete(`/aluno/${id}`);

export const registerProfissionalApi = (profissional) => clienteApi.post(`/profissional`,profissional);
export const obterProfissionaisApi= (id) => clienteApi.get(`/profissionais/${id}`);
export const deleteProfissionalApi= (id) => clienteApi.delete(`/profissional/${id}`);