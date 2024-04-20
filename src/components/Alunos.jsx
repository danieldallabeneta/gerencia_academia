import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obterAlunosApi } from "../Api/Service";
import { useAutCtx } from "../AutCtx";
import { Button } from "react-bootstrap";

export default function Alunos() {
    const [alunos, setAlunos] = useState([]);
    const navigate = useNavigate();
    useEffect(() => atualizarAlunos(), []);
    const autCtx = useAutCtx();

    function atualizarAlunos() {
        obterAlunosApi(autCtx.id)
            .then((resposta) => {
                setAlunos(resposta.data);
            })

            .catch((erro) => console.log(erro));
    }

    function visualizarAluno(id) {
        navigate(`/alunoDetalhes/${id}`);
    }

    function novoAluno() {
        navigate("/aluno/cadastro")
    }

    return (
        <div class="container">
            <nav>

            </nav>
            <Button variant="primary" onClick={() => novoAluno()}>
                Novo
            </Button>
            <table className="table">
                <tbody>
                    {alunos.map((aluno) => (
                        <tr key={aluno.id}>
                            <td>{aluno.nome}</td>
                            <td>{aluno.dataNascimento}</td>
                            <td>
                                <button class="btn btn-success" onClick={() => visualizarAluno(aluno.id)}> Ver + </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
