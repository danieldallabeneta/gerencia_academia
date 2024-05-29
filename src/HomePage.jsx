import Cabecalho from "./components/Cabecalho";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Inicio from "./components/Inicio";
import Inicial from "./components/Inicial";
import CadastroLoja from "./components/CadastroLoja";
import Alunos from "./components/Alunos";
import CadastroAluno from "./components/CadastroAluno";
import CadastroProfissional from "./components/CadastroProfissional";
import Profissionais from "./components/Profissionais";
import CadastroEquipamento from "./components/CadastroEquipamento";
import Equipamentos from "./components/Equipamentos";
import CadastroAtividade from "./components/CadastroAtividade";
import Atividades from "./components/Atividades";
import CadastroHorario from "./components/CadastroHorario";
import Horarios from "./components/Horarios";
import Rodape from "./components/Rodape";
import CadastroBanco from "./components/CadastroBanco";
import Bancos from "./components/Bancos";
import Cadastro from "./components/Cadastro";
import Login from "./components/Login";
import AutProvider, { useAutCtx } from "./AutCtx";
import AlunoDetalhes from "./components/AlunoDetalhes";
import ProfissionalDetalhes from "./components/ProfissionalDetalhes";
import EquipamentoDetalhes from "./components/EquipamentoDetalhes";
import AtividadeDetalhes from "./components/AtividadeDetalhes";
import HorarioDetalhes from "./components/HorarioDetalhes";
import BancoDetalhes from "./components/BancoDetalhes";
import CadastroProduto from "./components/CadastroProduto";
import Produtos from "./components/Produto";
import ProdutoDetalhes from "./components/ProdutoDetalhes";
import Matricula from "./components/Matricula";
import CadastroMatricula from "./components/CadastroMatricula";
import MatriculaDetalhes from "./components/MatriculaDetalhes";
import MatriculaAtividades from "./components/MatriculaAtividades";
import Caixas from "./components/Caixas";
import CadastroCaixa from "./components/CadastroCaixa";

function HomePage() {

    function AuthenticateRoute({ children }) {
        const atCtx = useAutCtx();
        if (atCtx.autenticado) {
            return children;
        }
        return <Navigate to="/login" />;
    }

    return (
        <div className="HomePage">
            <AutProvider>
                <BrowserRouter>
                    <Cabecalho />
                    <div className="container-fluid mt-5 mb-5" style={{ paddingTop: '56px', minHeight: 'calc(100vh - 56px)' }}>
                        <div className="row">
                            <div className="col-md-12 overflow-auto" style={{ paddingTop: '3%' }}>
                                <Routes>
                                    <Route path="/login" element={<Login />}></Route>
                                    <Route path="/cadastro" element={<Cadastro />}></Route>
                                    {<Route path="/" element={<AuthenticateRoute><Inicio/></AuthenticateRoute>}></Route>}    
                                    {<Route path="/inicio" element={<AuthenticateRoute><Inicio/></AuthenticateRoute>}></Route>}                                
                                    {<Route path="/inicial" element={<AuthenticateRoute><Inicial /></AuthenticateRoute>}></Route>}

                                    {<Route path="/loja/cadastro" element={<AuthenticateRoute><CadastroLoja/></AuthenticateRoute>}></Route>}
                                    {<Route path="/alunos" element={<AuthenticateRoute><Alunos/></AuthenticateRoute>}></Route>}
                                    {<Route path="/alunoDetalhes/:id" element={<AuthenticateRoute><AlunoDetalhes/></AuthenticateRoute>}></Route>}
                                    {<Route path="/aluno/cadastro" element={<AuthenticateRoute><CadastroAluno/></AuthenticateRoute>}></Route>}
                                    {<Route path="/professor" element={<AuthenticateRoute><Profissionais/></AuthenticateRoute>}></Route>}
                                    {<Route path="/professor/cadastro" element={<AuthenticateRoute><CadastroProfissional/></AuthenticateRoute>}></Route>}
                                    {<Route path="/professorDetalhes/:id" element={<AuthenticateRoute><ProfissionalDetalhes/></AuthenticateRoute>}></Route>}
                                    {<Route path="/equipamento" element={<AuthenticateRoute><Equipamentos/></AuthenticateRoute>}></Route>}
                                    {<Route path="/equipamento/cadastro" element={<AuthenticateRoute><CadastroEquipamento/></AuthenticateRoute>}></Route>}
                                    {<Route path="/equipamentoDetalhes/:id" element={<AuthenticateRoute><EquipamentoDetalhes/></AuthenticateRoute>}></Route>}
                                    {<Route path="/atividade" element={<AuthenticateRoute><Atividades/></AuthenticateRoute>}></Route>}
                                    {<Route path="/atividade/cadastro" element={<AuthenticateRoute><CadastroAtividade/></AuthenticateRoute>}></Route>}
                                    {<Route path="/atividadeDetalhes/:id" element={<AuthenticateRoute><AtividadeDetalhes/></AuthenticateRoute>}></Route>}
                                    {<Route path="/horario" element={<AuthenticateRoute><Horarios/></AuthenticateRoute>}></Route>}
                                    {<Route path="/horario/cadastro" element={<AuthenticateRoute><CadastroHorario/></AuthenticateRoute>}></Route>}
                                    {<Route path="/horarioDetalhes/:id" element={<AuthenticateRoute><HorarioDetalhes/></AuthenticateRoute>}></Route>}
                                    {<Route path="/banco" element={<AuthenticateRoute><Bancos/></AuthenticateRoute>}></Route>}
                                    {<Route path="/banco/cadastro" element={<AuthenticateRoute><CadastroBanco/></AuthenticateRoute>}></Route>}
                                    {<Route path="/bancoDetalhes/:id" element={<AuthenticateRoute><BancoDetalhes/></AuthenticateRoute>}></Route>}
                                    {<Route path="/produtos" element={<AuthenticateRoute><Produtos/></AuthenticateRoute>}></Route>}
                                    {<Route path="/produto/cadastro" element={<AuthenticateRoute><CadastroProduto/></AuthenticateRoute>}></Route>}
                                    {<Route path="/produtoDetalhes/:id" element={<AuthenticateRoute><ProdutoDetalhes/></AuthenticateRoute>}></Route>}
                                    {<Route path="/matriculas" element={<AuthenticateRoute><Matricula/></AuthenticateRoute>}></Route>}
                                    {<Route path="/matricula/cadastro" element={<AuthenticateRoute><CadastroMatricula/></AuthenticateRoute>}></Route>}
                                    {<Route path="/matriculaDetalhes/:id" element={<AuthenticateRoute><MatriculaDetalhes/></AuthenticateRoute>}></Route>}
                                    {<Route path="/matriculaAtividades/:id" element={<AuthenticateRoute><MatriculaAtividades/></AuthenticateRoute>}></Route>}

                                    {<Route path="/caixas" element={<AuthenticateRoute><Caixas/></AuthenticateRoute>}></Route>}
                                    {<Route path="/caixa/cadastro" element={<AuthenticateRoute><CadastroCaixa/></AuthenticateRoute>}></Route>}

                                </Routes>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
                <Rodape />
            </AutProvider>
        </div>
    );
}

export default HomePage;