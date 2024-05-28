import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import { useAutCtx } from "../AutCtx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { atualizaMatriculaApi, obterAlunosApi, obterMatriculaApi, registerMatriculaApi } from "../Api/Service";


function MatriculaDetalhes() {
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;
    let navigate = useNavigate();
    const [codigo, setCodigo] = useState('');
    const [aluno, setAluno] = useState('');
    const [mensalidade, setMensalidade] = useState('');
    const [valorMatricula, setValorMatricula] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [dataMensalidade, setDataMensalidade] = useState('');
    const [dataExame, setDataExame] = useState('');
    const [show, setShow] = useState(false);
    const [alunos, setAlunos] = useState([]);
    const { id } = useParams();
    useEffect(() => obterMatricula(id), [id]);
    useEffect(() => atualizarAlunos());

    function obterMatricula(id) {
        obterMatriculaApi(id)
            .then((resposta) => carregaDados(resposta))
            .catch((erro) => console.log(erro));
    }

    function carregaDados(resposta) {
        const dados = resposta.data;
        setCodigo(dados.id);
        setAluno(dados.aluno);
        setMensalidade(dados.valorMensalidade);
        setValorMatricula(dados.valorMatricula);
        setPeriodo(dados.periodo);
        setDataCadastro(dados.dataCadastro);
        setDataMensalidade(dados.dataMensalidade);
        setDataExame(dados.dataExame);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const matricula = {
            id: id,
            aluno: aluno,
            dataCadastro: dataCadastro,
            periodo: periodo,
            dataExame: dataExame,
            valorMatricula: valorMatricula,
            valorMensalidade: mensalidade,
            dataMensalidade: dataMensalidade,
            loja: loja
        };
        await atualizaMatriculaApi(matricula);
        navigate("/matriculas");
    };

    function cancelar() {
        navigate("/matriculas");
    }

    return (
        <Container fluid>
            <div className="text-center">
                <h3>Cadastro de Matrícula</h3>
            </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={1}>
                        <Form.Group className="mb-2" controlId="formGridId">
                            <Form.Label>id</Form.Label>
                            <Form.Control type="number" disabled value={codigo} />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group controlId="aluno">
                            <Form.Label> Aluno</Form.Label>
                            <Form.Control disabled as="select" value={aluno} onChange={(e) => setAluno(e.target.value)}>
                                <option value="">Selecione</option>
                                {alunos.map((aluno) => (
                                    <option value={aluno.id}>{aluno.nome}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                            <Toast.Body><strong>Aluno já possui uma matrícula cadastrada!</strong></Toast.Body>
                        </Toast>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="dataCadastro">
                            <Form.Label>Data do Cadastro</Form.Label>
                            <Form.Control required type="date" value={dataCadastro} onChange={(e) => setDataCadastro(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="periodo">
                            <Form.Label>Período de Contrato</Form.Label>
                            <Form.Control required as="select" value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
                                <option value=''>Selecione...</option>
                                <option value='3'>3 Meses</option>
                                <option value='6'>6 Meses</option>
                                <option value='12'>12 Meses</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="dataExame">
                            <Form.Label>Data do Exame</Form.Label>
                            <Form.Control required type="date" value={dataExame} onChange={(e) => setDataExame(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="matricula">
                            <Form.Label>Valor da Matrícula (R$)</Form.Label>
                            <Form.Control required type="number" placeholder="Informe o valor da matrícula" value={valorMatricula} onChange={(e) => setValorMatricula(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="mensalidade">
                            <Form.Label>Valor da Mensalidade (R$)</Form.Label>
                            <Form.Control required type="number" placeholder="Informe o valor da mensalidade" value={mensalidade} onChange={(e) => setMensalidade(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="dataVencimento">
                            <Form.Label>Data de Vencimento Mensalidade</Form.Label>
                            <Form.Control type="date" value={dataMensalidade} onChange={(e) => setDataMensalidade(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button variant="primary" type="submit" style={{ marginTop: '10px', marginLeft: '5px' }}>
                        Confirmar
                    </Button>
                    <Button variant="secondary" style={{ marginTop: '10px', marginLeft: '5px' }} onClick={cancelar}>
                        Cancelar
                    </Button>
                </div>
            </Form>
        </Container>
    )

}

export default MatriculaDetalhes;