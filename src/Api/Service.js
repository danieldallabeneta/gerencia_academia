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
export const obterAlunoApi = (id) => clienteApi.get(`/aluno/${id}`);
export const atualizaAlunoApi = (aluno) => clienteApi.put(`/aluno`,aluno);
export const registerAlunoApi = (aluno) => clienteApi.post(`/aluno`,aluno);
export const deleteAlunoApi= (id) => clienteApi.delete(`/aluno/${id}`);

/* Rest de Profissionais*/
export const obterProfissionaisApi= (id) => clienteApi.get(`/profissionais/${id}`);
export const obterProfissionalApi = (id) => clienteApi.get(`/profissional/${id}`);
export const atualizaProfissionalApi = (profissional) => clienteApi.put(`/profissional`,profissional);
export const registerProfissionalApi = (profissional) => clienteApi.post(`/profissional`,profissional);
export const deleteProfissionalApi= (id) => clienteApi.delete(`/profissional/${id}`);

/* Rest de Equipamentos*/
export const obterEquipamentosApi = (id) => clienteApi.get(`/equipamentos/${id}`);
export const obterEquipamentoApi = (id) => clienteApi.get(`/equipamento/${id}`);
export const atualizaEquipamentoApi = (equipamento) => clienteApi.put(`/equipamento`,equipamento);
export const registerEquipamentoApi = (equipamento) => clienteApi.post(`/equipamento`,equipamento);
export const deleteEquipamentoApi= (id) => clienteApi.delete(`/equipamento/${id}`);

/* Rest de Atividades */
export const registerAtividadeApi = (atividade) => clienteApi.post(`/atividade`,atividade);
export const obterAtividadesApi= (id) => clienteApi.get(`/atividades/${id}`);
export const obterAtividadeApi= (id) => clienteApi.get(`/atividade/${id}`);
export const deleteAtividadeApi= (id) => clienteApi.delete(`/atividade/${id}`);
export const atualizaAtividadeApi = (atividade) => clienteApi.put(`/atividade`,atividade);

/* Rest de Horarios */
export const obterHorariosApi = (id) => clienteApi.get(`/horarios/${id}`);
export const obterHorariosCapacidadeApi = (id) => clienteApi.get(`/horariosCap/${id}`);
export const obterHorarioApi = (id) => clienteApi.get(`/horario/${id}`);
export const registerHorarioApi = (horario) => clienteApi.post(`/horario`,horario);
export const deleteHorarioApi= (id) => clienteApi.delete(`/horario/${id}`);
export const atualizaHorarioApi = (horario) => clienteApi.put(`/horario`,horario);

/* Rest de Bancos */
export const obterBancosApi = (id) => clienteApi.get(`/bancos/${id}`);
export const obterBancoApi = (id) => clienteApi.get(`/banco/${id}`);
export const registerBancoApi = (banco) => clienteApi.post(`/banco`,banco);
export const deleteBancoApi= (id) => clienteApi.delete(`/banco/${id}`);
export const atualizaBancoApi = (banco) => clienteApi.put(`/banco`,banco);

/* Rest de Usuário */
export const registerUserApi = (user) => clienteApi.post(`/users`,user);
export const atualizaUserApi = (user) => clienteApi.put(`/user`,user);
export const obterUserIdApi = (id) => clienteApi.get(`/users/${id}`);
export const obterUsuariosApi = () => clienteApi.get(`/users`);
export const obterUserEmailApi = (email) => clienteApi.get(`/usuario/${email}`);
export const autenticarApi = (credencial) => clienteApi.post(`/autenticar`,credencial);

/* Rest de Produto */
export const registerProdutoApi = (produto) => clienteApi.post(`/products`,produto);
export const obterProdutosApi= (id) => clienteApi.get(`/products/${id}`);
export const obterProdutoApi= (id) => clienteApi.get(`/product/${id}`);
export const deleteProdutoApi= (id) => clienteApi.delete(`/product/${id}`);
export const atualizaProdutoApi = (produto) => clienteApi.put(`/product`,produto);

/* Rest de Matricula */
export const registerMatriculaApi = (matricula) => clienteApi.post(`/matricula`,matricula);
export const obterMatriculasApi= (id) => clienteApi.get(`/matriculas/${id}`);
export const obterMatriculaApi= (id) => clienteApi.get(`/matricula/${id}`);
export const deleteMatriculaApi= (id) => clienteApi.delete(`/matricula/${id}`);
export const atualizaMatriculaApi = (matricula) => clienteApi.put(`/matricula`,matricula);

/* Rest de Matricula Atividade*/
export const registerMatriculaAtividadeApi = (matriculaAtividade) => clienteApi.post(`/matriculaAtividade`, matriculaAtividade);
export const obterMatriculaAtividadeApi= (id) => clienteApi.get(`/matriculaAtividade/${id}`);

/* Rest de Caixa */
export const registerCaixaApi = (caixa) => clienteApi.post(`/caixa`,caixa);
export const obterCaixasApi= (id) => clienteApi.get(`/caixas/${id}`);
export const obterCaixaApi= (id) => clienteApi.get(`/caixa/${id}`);
export const deleteCaixaApi= (id) => clienteApi.delete(`/caixa/${id}`);
export const atualizaCaixaApi = (caixa) => clienteApi.put(`/caixa`,caixa);
export const fecharCaixaApi = (id) => clienteApi.put(`/caixa/fechar/${id}`);
export const reabrirCaixaApi = (id) => clienteApi.put(`/caixa/reabrir/${id}`);

/* Rest de Vendas */
export const obterVendasApi= (id) => clienteApi.get(`/vendas/${id}`);
export const deleteVendaApi= (id) => clienteApi.delete(`/venda/${id}`);