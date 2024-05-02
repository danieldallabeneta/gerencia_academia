import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAutCtx } from '../AutCtx';
import { deleteProfissionalApi, obterProfissionaisApi } from '../Api/Service';

function Profissionais() {
    const [profissionais, setProfissionais] = useState([]);
    const navigate = useNavigate();
    useEffect(() => atualizarProfissionais());
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;

    function atualizarProfissionais() {
        obterProfissionaisApi(loja)
            .then((resposta) => {
                if(resposta.data !== ''){
                    setProfissionais(resposta.data);
                }
            })
            .catch((erro) => console.log(erro));
    }

    function visualizarProfissional(id) {
        navigate(`/professorDetalhes/${id}`);
    }

    function novoProfissional() {
        navigate("/professor/cadastro")
    }

    const handleDelete = async (id) => {
        let exclusao = await deleteProfissionalApi(id);
        if(exclusao.data){
            const updatedRegistros = profissionais.filter(profissional => profissional.id !== id);
            setProfissionais(updatedRegistros);
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={() => novoProfissional()} style={{ marginBottom: '10px' , marginLeft : '10px'}}>
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
                    {profissionais.map((profissional) => (
                        <tr key={profissional.id}>
                            <td>{profissional.id}</td>
                            <td>{profissional.nome}</td>
                            <td>{profissional.dataNascimento}</td>
                            <td>{profissional.ativo === 1 ? 'Sim' : 'Não'}</td>
                            <td>
                                <Button variant="primary" onClick={() => visualizarProfissional(profissional.id)}>Ver +</Button>
                                <Button variant="danger" onClick={() => handleDelete(profissional.id)} style={{ marginLeft : '10px'}}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Profissionais;