import axios from "axios";

const clienteApi = axios.create({
    baseURL: 'http://localhost:8080'
});

/* Rest de Loja*/
export const obterLojasApi = () => clienteApi.get(`/lojas`);
export const obterLojaIdApi = (id) => clienteApi.get(`/lojas/${id}`);
export const registerLojaApi = (loja) => clienteApi.post(`/loja`,loja);

/* Rest de Alunos*/
export const obterAlunosApi = (id) => clienteApi.get(`/alunos/${id}`);
export const registerAlunoApi = (aluno) => clienteApi.post(`/aluno`,aluno);
export const deleteAlunoApi= (id) => clienteApi.delete(`/aluno/${id}`);

/* Rest de Profissionais*/
export const obterProfissionaisApi= (id) => clienteApi.get(`/profissionais/${id}`);
export const registerProfissionalApi = (profissional) => clienteApi.post(`/profissional`,profissional);
export const deleteProfissionalApi= (id) => clienteApi.delete(`/profissional/${id}`);

/* Rest de Equipamentos*/
export const obterEquipamentosApi = (id) => clienteApi.get(`/equipamentos/${id}`);
export const registerEquipamentoApi = (equipamento) => clienteApi.post(`/equipamento`,equipamento);
export const deleteEquipamentoApi= (id) => clienteApi.delete(`/equipamento/${id}`);

/* Rest de Atividades */
export const registerAtividadeApi = (atividade) => clienteApi.post(`/atividade`,atividade);
export const obterAtividadesApi= (id) => clienteApi.get(`/atividades/${id}`);
export const deleteAtividadeApi= (id) => clienteApi.delete(`/atividade/${id}`);

/* Rest de Horarios */
export const obterHorariosApi = (id) => clienteApi.get(`/horarios/${id}`);
export const registerHorarioApi = (horario) => clienteApi.post(`/horario`,horario);
export const deleteHorarioApi= (id) => clienteApi.delete(`/horario/${id}`);

/* Rest de Bancos */
export const obterBancosApi = (id) => clienteApi.get(`/bancos/${id}`);
export const registerBancoApi = (banco) => clienteApi.post(`/banco`,banco);
export const deleteBancoApi= (id) => clienteApi.delete(`/banco/${id}`);
