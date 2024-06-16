import { useNavigate } from "react-router-dom";
import { useAutCtx } from "../AutCtx";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteProdutoApi, deleteVendaApi, obterVendasApi } from "../Api/Service";


function Vendas() {
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;
    const navigate = useNavigate();
    const [vendas, setVendas] = useState([]);
    useEffect(() => atualizarVendas());

    function atualizarVendas() {
        obterVendasApi(loja)
            .then((resposta) => {
                if(resposta.data !== ''){
                    setVendas(resposta.data);
                }
            })
            .catch((erro) => console.log(erro));
    }

    function novaVenda() {
        navigate("/venda/cadastro")
    }

    function visualizarVenda(id) {
        navigate(`/produtoDetalhes/${id}`);
    }

    const handleDelete = async (id) => {
        let exclusao = await deleteVendaApi(id);
        if(exclusao.data){
            const updatedRegistros = vendas.filter(venda => venda.id !== id);
            setVendas(updatedRegistros);
        }
    };

    return (
        <div>
            <div className="text-center">
                <h4>Consulta de Vendas</h4>
            </div> 
            <Button variant="primary" onClick={() => novaVenda()} style={{ marginBottom: '10px', marginLeft: '10px' }}>
                Novo
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}>Id</th>
                        <th style={{ width: '15%' }}>Data</th>                        
                        <th style={{ width: '55%' }}>Cliente</th>
                        <th style={{ width: '10%' }}>Valor</th>
                        <th style={{ width: '15%' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.map((venda) => (
                        <tr key={venda.id}>
                            <td>{venda.id}</td>
                            <td>{venda.data}</td>
                            <td>{venda.nomeAluno == '' ? venda.cliente : venda.nomeAluno}</td>
                            <td>{venda.valorTotal}</td>
                            <td>
                                <Button variant="primary" onClick={() => visualizarVenda(venda.id)}>Ver +</Button>
                                <Button variant="danger" onClick={() => handleDelete(venda.id)} style={{ marginLeft : '10px'}}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )



}

export default Vendas;