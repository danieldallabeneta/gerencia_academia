import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAutCtx } from '../AutCtx';
import { atualizaHorarioApi, obterAtividadesApi, obterHorarioApi } from '../Api/Service';
import { useNavigate, useParams } from 'react-router-dom';

const HorarioDetalhes = () => {
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;
    let navigate = useNavigate();
    const [codigo, setCodigo] = useState('');
    const [atividades, setAtividades] = useState([]);
    const [atividade, setAtividade] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaTermino, setHoraTermino] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [diaSemana, setDiaSemana] = useState('');

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
    const { id } = useParams();
    useEffect(() => obterHorario(id), [id]);

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

    function obterHorario(id) {
        obterHorarioApi(id)
            .then((resposta) => carregaDados(resposta))
            .catch((erro) => console.log(erro));
    }

    function carregaDados(resposta) {
        const dados = resposta.data;
        console.log(dados);
        setCodigo(dados.id);
        setAtividade(dados.atividade);
        setDiaSemana(dados.diaSemana);
        var [hours, minutes] = dados.horaInicio.split(':');
        var newTimeString = `${hours}:${minutes}`;
        setHoraInicio(dados.horaInicio);

        [hours, minutes] = dados.horaTermino.split(':');
        newTimeString = `${hours}:${minutes}`;
        setHoraTermino(dados.horaTermino);
        setCapacidade(dados.capacidade);
    }

    const handlerHoraInicio = (e) => {
        const hora = e.target.value;
        setHoraInicio(hora +":00");

    }

    const handlerHoraTermino = (e) => {
        const hora = e.target.value;
        setHoraTermino(hora +":00");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const horaInicial = StringTime(horaInicio);
        const horaFinal = StringTime(horaTermino);
        
        const horarioAux = {
            id: codigo,
            atividade: atividade,
            loja: loja,
            diaSemana: diaSemana,
            horaInicio: horaInicial,
            horaTermino: horaFinal,
            capacidade: capacidade
        };

        await atualizaHorarioApi(horarioAux);
        navigate("/horario");
    };

    function StringTime(tempo){
        var [hours, minutes, seconds] = tempo.split(':').map(Number);
        var now = new Date();
        var timeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
        return timeDate;
    }

    function cancelar() {
        navigate("/horario");
    }

    return (
        <Container fluid>
            <h3>Cadastro de Horários</h3>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={1}>
                        <Form.Group controlId="formGridId">
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="number" disabled value={codigo} />
                        </Form.Group>
                    </Col>
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
                <Row>
                    <Col>
                        <Form.Group controlId={'formDiaSemana'}>
                            <Form.Label>Dia da Semana</Form.Label>
                            <Form.Control required as="select" value={diaSemana} onChange={(e) => setDiaSemana(e.target.value)}>
                                <option value="">Selecione...</option>
                                {diasSemana.map((dia) => (
                                    <option value={dia.id}>{dia.nome}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={'formHoraInicio'}>
                            <Form.Label>Hora Início</Form.Label>
                            <Form.Control type="time" value={horaInicio} onChange={handlerHoraInicio} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={'formHoraTermino'}>
                            <Form.Label>Hora Término</Form.Label>
                            <Form.Control type="time" value={horaTermino} onChange={handlerHoraTermino} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='formCapacidade'>
                            <Form.Label>Informe a Capacidade do Horário</Form.Label>
                            <Form.Control type="number" required value={capacidade} onChange={(e) => setCapacidade(e.target.value)} />
                        </Form.Group>
                    </Col>
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

export default HorarioDetalhes;
