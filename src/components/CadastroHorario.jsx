import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAutCtx } from '../AutCtx';
import { obterAtividadesApi, registerHorarioApi } from '../Api/Service';
import { useNavigate } from 'react-router-dom';

const CadastroHorario = () => {
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;
    let navigate = useNavigate();
    const [atividades, setAtividades] = useState([]);
    const [atividade, setAtividade] = useState('');
    const [horarios, setHorarios] = useState([
        { horaInicio: '', horaTermino: '', diaSemana: '', capacidade: '' }
    ]);

    const [diasSemana] = useState([
        { id: 0, nome: 'Domingo' },
        { id: 1, nome: 'Segunda-Feira' },
        { id: 2, nome: 'Terça-Feira' },
        { id: 3, nome: 'Quarta-Feira' },
        { id: 4, nome: 'Quinta-Feira' },
        { id: 5, nome: 'Sexta-Feira' },
        { id: 6, nome: 'Sábado' }
    ]);
    useEffect(() => atualizarAtividades());

    function atualizarAtividades() {
        obterAtividadesApi(loja)
            .then((resposta) => {
                if (resposta.data !== '') {
                    const dados = [];
                    resposta.data.map((data) => (
                        dados.push({ id: data.id, nome: data.nome })
                    ))
                    setAtividades(dados);
                }
            })

            .catch((erro) => console.log(erro));
    }

    const adicionarHorario = () => {
        setHorarios([...horarios, { horaInicio: '', horaTermino: '', diaSemana: '', capacidade: '' }]);
    };

    const handleHorarioChange = (index, field, value) => {
        const updatedHorarios = [...horarios];
        updatedHorarios[index][field] = value;
        setHorarios(updatedHorarios);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const horarioNew = JSON.stringify(horarios);
        const horarioAux = {
            atividade: atividade,
            loja: loja,
            horarios: horarioNew
        }

        await registerHorarioApi(horarioAux);
        navigate("/horario");
    };

    function cancelar() {
        navigate("/horario");
    }

    return (
        <Container fluid>
            <div className="text-center">
                <h3>Cadastro de Horários</h3>
            </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="formAtividade">
                            <Form.Label>Selecione a Atividade</Form.Label>
                            <Form.Control required as="select" value={atividade} onChange={(e) => setAtividade(e.target.value)}>
                                <option value="">Selecione...</option>
                                {atividades.map((ativ) => (
                                    <option value={ativ.id}>{ativ.nome}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>

                </Row>
                <div className="text-center">
                    <Button variant="secondary" onClick={adicionarHorario} style={{ marginTop: '10px' }}>Adicionar Horário</Button>
                </div>
                <Row>
                    {horarios.map((hora, index) => (
                        <Row key={index}>
                            <Col>
                                <Form.Group controlId={`formDiaSemana-${index}`}>
                                    <Form.Label>Dia da Semana</Form.Label>
                                    <Form.Control required as="select" value={hora.diaSemana} onChange={(e) => handleHorarioChange(index, 'diaSemana', e.target.value)}>
                                        <option value="">Selecione...</option>
                                        {diasSemana.map((dia) => (
                                            <option value={dia.id}>{dia.nome}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={`formHoraInicio-${index}`}>
                                    <Form.Label>Hora Início</Form.Label>
                                    <Form.Control type="time" value={hora.horaInicio} onChange={(e) => handleHorarioChange(index, 'horaInicio', e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={`formHoraTermino-${index}`}>
                                    <Form.Label>Hora Término</Form.Label>
                                    <Form.Control type="time" value={hora.horaTermino} onChange={(e) => handleHorarioChange(index, 'horaTermino', e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='formCapacidade'>
                                    <Form.Label>Informe a Capacidade do Horário</Form.Label>
                                    <Form.Control type="number" required value={hora.capacidade} onChange={(e) => handleHorarioChange(index, 'capacidade', e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                    ))}
                </Row>
                <div className="text-center">
                    <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                        Cadastrar
                    </Button>
                    <Button variant="secondary" style={{ marginTop: '10px', marginLeft: '5px' }} onClick={cancelar}>
                        Cancelar
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default CadastroHorario;
