import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEquipamentoApi, obterEquipamentosApi } from "../Api/Service";
import { useAutCtx } from "../AutCtx";
import { Button, Table } from "react-bootstrap";

export default function Equipamentos() {
    const [equipamentos, setEquipamentos] = useState([]);
    const navigate = useNavigate();
    useEffect(() => atualizarEquipamentos());
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;

    function atualizarEquipamentos() {
        obterEquipamentosApi(loja)
            .then((resposta) => {
                if(resposta.data !== ''){
                    setEquipamentos(resposta.data);
                }
            })
            .catch((erro) => console.log(erro));
    }

    function visualizarEquipamento(id) {
        navigate(`/equipamentoDetalhes/${id}`);
    }

    function novoEquipamento() {
        navigate("/equipamento/cadastro")
    }

    const handleDelete = async (id) => {
        await deleteEquipamentoApi(id);
        const updatedRegistros = equipamentos.filter(equipamento => equipamento.id !== id);
        setEquipamentos(updatedRegistros);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => novoEquipamento()} style={{ marginBottom: '10px', marginLeft: '10px' }}>
                Novo
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}>Id</th>
                        <th style={{ width: '40%' }}>Nome</th>
                        <th style={{ width: '30%' }}>Número de Série</th>
                        <th style={{ width: '10%' }}>Data Aquisição</th>
                        <th style={{ width: '15%' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {equipamentos.map((equip) => (
                        <tr key={equip.id}>
                            <td>{equip.id}</td>
                            <td>{equip.nome}</td>
                            <td>{equip.numeroSerie}</td>
                            <td>{equip.dataAquisicao}</td>
                            <td>
                                <Button variant="primary" onClick={() => visualizarEquipamento(equip.id)}>Ver +</Button>
                                <Button variant="danger" onClick={() => handleDelete(equip.id)} style={{ marginLeft: '10px' }}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
