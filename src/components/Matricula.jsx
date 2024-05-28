import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAutCtx } from "../AutCtx";
import { deleteMatriculaApi, obterMatriculasApi } from "../Api/Service";


function Matricula() {
    const navigate = useNavigate();
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;
    const [matriculas, setMatriculas] = useState([]);
    useEffect(() => atualizarMatriculas());
    
    function atualizarMatriculas() {
        obterMatriculasApi(loja)
            .then((resposta) => {
                if(resposta.data !== ''){
                    setMatriculas(resposta.data);
                }
            })
            .catch((erro) => console.log(erro));
    }

    function visualizarMatricula(id) {
        navigate(`/matriculaDetalhes/${id}`);
    }

    function visualizarAtividades(id) {
        navigate(`/matriculaAtividades/${id}`);
    }

    function novaMatricula() {
        navigate("/matricula/cadastro")
    }

    const handleDelete = async (id) => {
        let exclusao = await deleteMatriculaApi(id);
        if(exclusao.data){
            const updatedRegistros = matriculas.filter(matricula => matricula.id !== id);
            setMatriculas(updatedRegistros);
        }
    };

    return (
        <div>    
            <div className="text-center">
                <h4>Consulta de Matriculas</h4>
            </div>        
            <Button variant="primary" onClick={() => novaMatricula()} style={{ marginBottom: '10px', marginLeft: '10px' }}>
                Novo
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}>Id</th>
                        <th style={{ width: '55%' }}>Aluno</th>                        
                        <th style={{ width: '15%' }}>Data Cadastro</th>
                        <th style={{ width: '10%' }}>Período</th>
                        <th style={{ width: '15%' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {matriculas.map((matricula) => (
                        <tr key={matricula.id}>
                            <td>{matricula.id}</td>
                            <td>{matricula.nomeAluno}</td>
                            <td>{matricula.dataCadastro}</td>
                            <td>{matricula.periodo}</td>
                            <td>
                                <Button variant="primary" onClick={() => visualizarMatricula(matricula.id)}>Ver +</Button>
                                <Button variant="primary" onClick={() => visualizarAtividades(matricula.id)} style={{ marginLeft : '10px'}}>Atividades</Button>
                                <Button variant="danger" onClick={() => handleDelete(matricula.id)} style={{ marginLeft : '10px'}}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )


}

export default Matricula;