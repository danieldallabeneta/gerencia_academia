import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { obterAlunosApi, obterHorariosCapacidadeApi, obterMatriculaAtividadeApi, registerMatriculaAtividadeApi } from "../Api/Service";
import { useAutCtx } from "../AutCtx";

function MatriculaAtividades() {

    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;
    let navigate = useNavigate();

    const [codigo, setCodigo] = useState('');
    const [aluno, setAluno] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [alunos, setAlunos] = useState([]);
    const [atividades, setAtividades] = useState([]);
    const { id } = useParams();
    useEffect(() => obterMatricula(id), [id]);
    useEffect(() => atualizarAlunos());
    useEffect(() => atualizarAtividades());
    const [horarios, setHorarios] = useState([
        { horario: '' }
    ]);
    function atualizarAtividades() {
        obterHorariosCapacidadeApi(loja)
            .then((resposta) => {
                const dados = [];
                resposta.data.map((data) => (
                    dados.push({
                        id: data.id, nome: data.nomeAtividade, diaSemana: data.diaSemana === 1 ? 'Segunda-Feira' : data.diaSemana === 2 ? 'Terça-Feira' : data.diaSemana === 3 ? 'Quarta-Feira' :
                            data.diaSemana === 4 ? 'Quinta-Feira' : data.diaSemana === 5 ? 'Sexta-Feira' : data.diaSemana === 6 ? 'Sábado' : 'Domingo', horaInicio: data.horaInicio, horaTermino: data.horaTermino
                    })
                ))
                setAtividades(dados);
            })
            .catch((erro) => console.log(erro));
    }

    function atualizarAlunos() {
        obterAlunosApi(loja)
            .then((resposta) => {
                const dados = [];
                resposta.data.map((data) => (
                    dados.push({ id: data.id, nome: data.nome })
                ))
                setAlunos(dados);
            })
            .catch((erro) => console.log(erro));
    }

    function obterMatricula(id) {
        obterMatriculaAtividadeApi(id)
            .then((resposta) => carregaDados(resposta))
            .catch((erro) => console.log(erro));
    }

    function carregaDados(resposta) {
        const dados = resposta.data;
        setCodigo(dados.id);
        setAluno(dados.aluno);
        setDataCadastro(dados.dataCadastro);
        const horarioAtividade = JSON.parse(dados.horarios);
        if (horarioAtividade.length > 0) {
            setHorarios(horarioAtividade);
        }

    }

    const adicionarHorario = () => {
        setHorarios([...horarios, { horario: '' }]);
    };

    const handleHorarioChange = (index, field, value) => {
        const updatedHorarios = [...horarios];
        updatedHorarios[index][field] = value;
        setHorarios(updatedHorarios);
    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const horarioAtiv = JSON.stringify(horarios);
        const matriculaAtividade = {
            id: id,
            horarios: horarioAtiv
        };
        await registerMatriculaAtividadeApi(matriculaAtividade);
        navigate("/matriculas");
    };

    function cancelar() {
        navigate("/matriculas");
    }

    return (
        <Container fluid>
            <div className="text-center">
                <h4>Atividades da Matrícula</h4>
            </div>
            <Form onSubmit={handlerSubmit}>
                <div className="text-center">
                    <h4>Dados da Matrícula</h4>
                </div>
                <Row>
                    <Col>
                        <Form.Group controlId="formGridId">
                            <Form.Label>id</Form.Label>
                            <Form.Control type="number" disabled value={codigo} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="aluno">
                            <Form.Label> Aluno</Form.Label>
                            <Form.Control disabled as="select" value={aluno} onChange={(e) => setAluno(e.target.value)}>
                                <option value="">Selecione</option>
                                {alunos.map((aluno) => (
                                    <option value={aluno.id}>{aluno.nome}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="dataCadastro">
                            <Form.Label>Data do Cadastro</Form.Label>
                            <Form.Control disabled type="date" value={dataCadastro} onChange={(e) => setDataCadastro(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="text-center">
                    <h4>Atividades</h4>
                </div>
                {horarios.map((atividade, index) => (
                    <Row key={index}>
                        <Col>
                            <Form.Group controlId={`formHorario-${index}`}>
                                <Form.Label>Horário</Form.Label>
                                <Form.Control as="select" value={atividade.horario} onChange={(e) => handleHorarioChange(index, 'horario', e.target.value)}>
                                    <option value="">Selecione</option>
                                    {atividades.map((ativid) => (
                                        <option value={ativid.id}>{ativid.nome} - {ativid.diaSemana} - {ativid.horaInicio} - {ativid.horaTermino}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                ))}
                <div className="text-center">
                    <Button variant="secondary" style={{ marginTop: '10px', marginLeft: '5px' }} onClick={adicionarHorario}>
                        Adicionar Atividade
                    </Button>
                    <Button variant="secondary" style={{ marginTop: '10px', marginLeft: '5px' }} onClick={cancelar}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" style={{ marginTop: '10px', marginLeft: '5px' }}>
                        Confirmar
                    </Button>
                </div>
            </Form>
        </Container>
    )

}

export default MatriculaAtividades;