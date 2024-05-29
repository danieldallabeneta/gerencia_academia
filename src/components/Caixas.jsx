import { useNavigate } from "react-router-dom";
import { useAutCtx } from "../AutCtx";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { deleteCaixaApi, obterCaixasApi } from "../Api/Service";


function Caixas() {
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;
    const navigate = useNavigate();
    const [caixas, setCaixas] = useState([]);
    useEffect(() => atualizarCaixas());

    function atualizarCaixas() {
        obterCaixasApi(loja)
            .then((resposta) => {
                if(resposta.data !== ''){
                    setCaixas(resposta.data);
                }
            })
            .catch((erro) => console.log(erro));
    }

    function visualizarCaixa(id) {
        navigate(`/caixaDetalhes/${id}`);
    }

    function novoCaixa() {
        navigate("/caixa/cadastro")
    }

    const handleDelete = async (id) => {
        await deleteCaixaApi(id);
        const updatedRegistros = caixas.filter(caixa => caixa.id !== id);
        setCaixas(updatedRegistros);
    };

    return (
        <div>
            <div className="text-center">
                <h4>Consulta de Caixas</h4>
            </div>
            <Button variant="primary" onClick={() => novoCaixa()} style={{ marginBottom: '10px', marginLeft: '10px' }}>
                Novo
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}>Id</th>
                        <th style={{ width: '30%' }}>Data</th>
                        <th style={{ width: '20%' }}>Valor Abertura</th>
                        <th style={{ width: '20%' }}>Valor Fechamento</th>
                        <th style={{ width: '10%' }}>Situação</th>
                        <th style={{ width: '15%' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {caixas.map((caixa) => (
                        <tr key={caixa.id}>
                            <td>{caixa.id}</td>
                            <td>{caixa.data}</td>
                            <td>{caixa.valorAbertura}</td>
                            <td>{caixa.valorFechamento}</td>
                            <td>{caixa.situacao == 1 ? 'Aberto' : 'Fechado'}</td>
                            <td>
                                <Button variant="primary" onClick={() => visualizarCaixa(caixa.id)}>Ver +</Button>
                                <Button variant="primary" onClick={() => visualizarCaixa(caixa.id)} style={{ marginLeft: '10px' }}>Vendas</Button>
                                <Button variant="danger" onClick={() => handleDelete(caixa.id)} style={{ marginLeft: '10px' }}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Caixas;