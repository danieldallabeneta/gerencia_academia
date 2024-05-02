import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAtividadeApi, obterAtividadesApi } from "../Api/Service";
import { useAutCtx } from "../AutCtx";
import { Button, Table } from "react-bootstrap";

export default function Atividades() {
    const [atividades, setAtividades] = useState([]);
    const navigate = useNavigate();
    useEffect(() => atualizarAtividades());
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;

    function atualizarAtividades() {
        obterAtividadesApi(loja)
            .then((resposta) => {
                if(resposta.data !== ''){
                    setAtividades(resposta.data);    
                }
            })
            .catch((erro) => console.log(erro));
    }

    function visualizarAtividade(id) {
        navigate(`/atividadeDetalhes/${id}`);
    }

    function novaAtividade() {
        navigate("/atividade/cadastro")
    }

    const handleDelete = async (id) => {
        await deleteAtividadeApi(id);
        const updatedRegistros = atividades.filter(atividade => atividade.id !== id);
        setAtividades(updatedRegistros);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => novaAtividade()} style={{ marginBottom: '10px' , marginLeft : '10px'}}>
                Novo
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}>Id</th>
                        <th style={{ width: '40%' }}>Nome</th>
                        <th style={{ width: '20%' }}>Professor(a)</th>
                        <th style={{ width: '20%' }}>Local</th>
                        <th style={{ width: '15%' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {atividades.map((atividade) => (
                        <tr key={atividade.id}>
                            <td>{atividade.id}</td>
                            <td>{atividade.nome}</td>
                            <td>{atividade.nomeProfissional}</td>
                            <td>{atividade.local}</td>
                            <td>
                                <Button variant="primary" onClick={() => visualizarAtividade(atividade.id)}>Ver +</Button>
                                <Button variant="danger" onClick={() => handleDelete(atividade.id)} style={{ marginLeft: '10px' }}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
