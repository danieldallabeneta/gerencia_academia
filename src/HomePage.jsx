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
                                    {<Route path="/aluno/cadastro" element={<AuthenticateRoute><CadastroAluno/></AuthenticateRoute>}></Route>}
                                    {<Route path="/professor" element={<AuthenticateRoute><Profissionais/></AuthenticateRoute>}></Route>}
                                    {<Route path="/professor/cadastro" element={<AuthenticateRoute><CadastroProfissional/></AuthenticateRoute>}></Route>}
                                    {<Route path="/equipamento" element={<AuthenticateRoute><Equipamentos/></AuthenticateRoute>}></Route>}
                                    {<Route path="/equipamento/cadastro" element={<AuthenticateRoute><CadastroEquipamento/></AuthenticateRoute>}></Route>}
                                    {<Route path="/atividade" element={<AuthenticateRoute><Atividades/></AuthenticateRoute>}></Route>}
                                    {<Route path="/atividade/cadastro" element={<AuthenticateRoute><CadastroAtividade/></AuthenticateRoute>}></Route>}
                                    {<Route path="/horario" element={<AuthenticateRoute><Horarios/></AuthenticateRoute>}></Route>}
                                    {<Route path="/horario/cadastro" element={<AuthenticateRoute><CadastroHorario/></AuthenticateRoute>}></Route>}
                                    {<Route path="/banco" element={<AuthenticateRoute><Bancos/></AuthenticateRoute>}></Route>}
                                    {<Route path="/banco/cadastro" element={<AuthenticateRoute><CadastroBanco/></AuthenticateRoute>}></Route>}
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