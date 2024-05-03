import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAlunoApi, obterAlunosApi } from "../Api/Service";
import { useAutCtx } from "../AutCtx";
import { Button, Container, Table } from "react-bootstrap";

export default function Alunos() {
    const [alunos, setAlunos] = useState([]);
    const navigate = useNavigate();
    useEffect(() => atualizarAlunos());
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;

    function atualizarAlunos() {
        obterAlunosApi(loja)
            .then((resposta) => {
                if (resposta.data !== '') {
                    setAlunos(resposta.data);
                }
            })

            .catch((erro) => console.log(erro));
    }

    function visualizarAluno(id) {
        navigate(`/alunoDetalhes/${id}`);
    }

    function novoAluno() {
        navigate("/aluno/cadastro")
    }

    const handleDelete = async (id) => {
        await deleteAlunoApi(id);
        const updatedRegistros = alunos.filter(aluno => aluno.id !== id);
        setAlunos(updatedRegistros);
    };

    return (
        <Container fluid>
            <div>
                <Button variant="primary" onClick={() => novoAluno()} style={{ marginBottom: '10px', marginLeft: '10px' }}>
                    Novo
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>Id</th>
                            <th style={{ width: '55%' }}>Nome</th>
                            <th style={{ width: '15%' }}>Data de Nascimento</th>
                            <th style={{ width: '10%' }}>Ativo</th>
                            <th style={{ width: '15%' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.map((aluno) => (
                            <tr key={aluno.id}>
                                <td>{aluno.id}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.dataNascimento}</td>
                                <td>{aluno.ativo === 1 ? 'Sim' : 'Não'}</td>
                                <td>
                                    <Button variant="primary" onClick={() => visualizarAluno(aluno.id)}>Ver +</Button>
                                    <Button variant="danger" onClick={() => handleDelete(aluno.id)} style={{ marginLeft: '10px' }}>Excluir</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>

    );
}
