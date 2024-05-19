import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAutCtx } from '../AutCtx';
import { deleteProdutoApi, obterProdutosApi } from '../Api/Service';

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();
    useEffect(() => atualizarProdutos());
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;

    function atualizarProdutos() {
        obterProdutosApi(loja)
            .then((resposta) => {
                if(resposta.data !== ''){
                    setProdutos(resposta.data);
                }
            })
            .catch((erro) => console.log(erro));
    }

    function visualizarProduto(id) {
        navigate(`/produtoDetalhes/${id}`);
    }

    function novoProduto() {
        navigate("/produto/cadastro")
    }

    const handleDelete = async (id) => {
        let exclusao = await deleteProdutoApi(id);
        if(exclusao.data){
            const updatedRegistros = produtos.filter(produto => produto.id !== id);
            setProdutos(updatedRegistros);
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={() => novoProduto()} style={{ marginBottom: '10px' , marginLeft : '10px'}}>
                Novo
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}>Id</th>
                        <th style={{ width: '55%' }}>Descrição</th>                        
                        <th style={{ width: '15%' }}>Preço(R$)</th>
                        <th style={{ width: '10%' }}>Quantidade</th>
                        <th style={{ width: '15%' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.descricao}</td>
                            <td>{produto.preco}</td>
                            <td>{produto.quantidade}</td>
                            <td>
                                <Button variant="primary" onClick={() => visualizarProduto(produto.id)}>Ver +</Button>
                                <Button variant="danger" onClick={() => handleDelete(produto.id)} style={{ marginLeft : '10px'}}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Produtos;