import Cabecalho from "./components/Cabecalho";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Inicio from "./components/Inicio";
import AutProvider, { useAutCtx } from "./AutCtx";
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

function HomePage(){

    function AuthenticateRoute({ children }) {
        const atCtx = useAutCtx();
        if (atCtx.selecionado) {
          return children;
        }
        return <Navigate to="/" />;
      }

    return (
        <AutProvider>
            <BrowserRouter>
            <Cabecalho />
                <Routes>
                    <Route path="/" element={<Inicio />}></Route>
                    <Route path="/inicial" element={<Inicial />}></Route>
                    <Route path="/loja/cadastro" element={<CadastroLoja />}></Route>
                    <Route path="/alunos" element={<Alunos />}></Route>
                    <Route path="/aluno/cadastro" element={<CadastroAluno />}></Route>
                    <Route path="/professor" element={<Profissionais />}></Route>
                    <Route path="/professor/cadastro" element={<CadastroProfissional />}></Route>
                    <Route path="/equipamento" element={<Equipamentos />}></Route>
                    <Route path="/equipamento/cadastro" element={<CadastroEquipamento />}></Route>
                    <Route path="/atividade" element={<Atividades />}></Route>
                    <Route path="/atividade/cadastro" element={<CadastroAtividade />}></Route>
                    <Route path="/horario" element={<Horarios />}></Route>
                    <Route path="/horario/cadastro" element={<CadastroHorario />}></Route>
                </Routes>
            </BrowserRouter>
        </AutProvider>
    );
}

export default HomePage;