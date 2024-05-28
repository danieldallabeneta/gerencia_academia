import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteHorarioApi, obterHorariosApi } from "../Api/Service";
import { useAutCtx } from "../AutCtx";
import { Button, Table } from "react-bootstrap";

export default function Horarios() {
    const [horarios, setHorarios] = useState([]);
    const navigate = useNavigate();
    useEffect(() => atualizarHorarios());
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;

    function atualizarHorarios() {
        obterHorariosApi(loja)
            .then((resposta) => {
                if(resposta.data !== ''){
                    setHorarios(resposta.data);
                }
            })
            .catch((erro) => console.log(erro));
    }

    function visualizarHorario(id) {
        navigate(`/horarioDetalhes/${id}`);
    }

    function novoHorario() {
        navigate("/horario/cadastro")
    }

    const handleDelete = async (id) => {
        await deleteHorarioApi(id);
        const updatedRegistros = horarios.filter(horario => horario.id !== id);
        setHorarios(updatedRegistros);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => novoHorario()} style={{ marginBottom: '10px' , marginLeft : '10px'}}>
                Novo
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}>Id</th>
                        <th style={{ width: '15%' }}>Atividade</th>
                        <th style={{ width: '10%' }}>Professor</th>
                        <th style={{ width: '15%' }}>Dia da Semana</th>
                        <th style={{ width: '10%' }}>Hora Início</th>
                        <th style={{ width: '10%' }}>Hora Término</th>
                        <th style={{ width: '10%' }}>Capacidade</th>
                        <th style={{ width: '10%' }}>Disponibilidade</th>
                        <th style={{ width: '20%' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {horarios.map((horario) => (
                        <tr key={horario.id}>
                            <td>{horario.id}</td>
                            <td>{horario.nomeAtividade}</td>
                            <td>{horario.nomeProfessor}</td>
                            <td>{horario.diaSemana === 0 ? 'Domingo' : horario.diaSemana === 1 ? 'Segunda-Feira': horario.diaSemana === 2 ? 'Terça-Feira' : horario.diaSemana === 3 ? 'Quarta-ferira':
                            horario.diaSemana === 4 ? 'Quinta-feira': horario.diaSemana === 5 ? 'Sexta-feira' : 'Sábado'}</td>
                            <td>{horario.horaInicio}</td>
                            <td>{horario.horaTermino}</td>
                            <td>{horario.capacidade}</td>
                            <td>{horario.capacidade - horario.consumo}</td>
                            <td>
                                <Button variant="primary" onClick={() => visualizarHorario(horario.id)}>Ver +</Button>
                                <Button variant="danger" onClick={() => handleDelete(horario.id)} style={{ marginLeft: '10px' }}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
