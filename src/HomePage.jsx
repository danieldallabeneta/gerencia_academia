import Cabecalho from "./components/Cabecalho";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Inicio from "./components/Inicio";
import AutProvider, { useAutCtx } from "./AutCtx";
import Inicial from "./components/Inicial";
import CadastroLoja from "./components/CadastroLoja";
import Alunos from "./components/Alunos";
import CadastroAluno from "./components/CadastroAluno";

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
                </Routes>
            </BrowserRouter>
        </AutProvider>
    );
}

export default HomePage;