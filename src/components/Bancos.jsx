import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAlunoApi, deleteBancoApi, obterAlunosApi, obterBancosApi } from "../Api/Service";
import { useAutCtx } from "../AutCtx";
import { Button, Container, Table } from "react-bootstrap";

export default function Bancos() {
    const [bancos, setBancos] = useState([]);
    const navigate = useNavigate();
    useEffect(() => atualizarBancos());
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;

    function atualizarBancos() {
        obterBancosApi(loja)
            .then((resposta) => {
                if (resposta.data !== '') {
                    setBancos(resposta.data);
                }
            })
            .catch((erro) => console.log(erro));
    }

    function visualizarBanco(id) {
        navigate(`/bancoDetalhes/${id}`);
    }

    function novoBanco() {
        navigate("/banco/cadastro")
    }

    const handleDelete = async (id) => {
        await deleteBancoApi(id);
        const updatedRegistros = bancos.filter(banco => banco.id !== id);
        setBancos(updatedRegistros);
    };

    return (
        <Container fluid>
            <div>
                <Button variant="primary" onClick={() => novoBanco()} style={{ marginBottom: '10px', marginLeft: '10px' }}>
                    Novo
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>Id</th>
                            <th style={{ width: '20%' }}>Nome</th>
                            <th style={{ width: '10%' }}>Código Banco</th>
                            <th style={{ width: '10%' }}>Agência</th>
                            <th style={{ width: '10%' }}>Dígito Agência</th>
                            <th style={{ width: '10%' }}>Conta</th>
                            <th style={{ width: '10%' }}>Dígito Conta</th>
                            <th style={{ width: '10%' }}>Data Cadastro</th>
                            <th style={{ width: '15%' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bancos.map((banco) => (
                            <tr key={banco.id}>
                                <td>{banco.id}</td>
                                <td>{banco.nome}</td>
                                <td>{banco.codigo}</td>
                                <td>{banco.agencia}</td>
                                <td>{banco.digitoAgencia}</td>
                                <td>{banco.conta}</td>
                                <td>{banco.digitoConta}</td>
                                <td>{banco.dataCadastro}</td>
                                <td>
                                    <Button variant="primary" onClick={() => visualizarBanco(banco.id)}>Ver +</Button>
                                    <Button variant="danger" onClick={() => handleDelete(banco.id)} style={{ marginLeft: '10px' }}>Excluir</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>

    );
}
