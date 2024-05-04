import React, { useEffect, useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { obterProfissionaisApi, registerAtividadeApi } from '../Api/Service';
import { useNavigate } from 'react-router-dom';
import { useAutCtx } from '../AutCtx';

function CadastroAtividade() {
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;
    let navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [local, setLocal] = useState('');
    const [descricao, setDescricao] = useState('');
    const [professor, setProfessor] = useState(null);
    useEffect(() => atualizarProfissional());
    const [options, setProfissional] = useState([]);

    function atualizarProfissional() {
        obterProfissionaisApi(loja)
            .then((resposta) => {
                const dados = [];
                resposta.data.map((data) => (
                    dados.push({ id: data.id, nome: data.nome })
                ))
                setProfissional(dados);
            })

            .catch((erro) => console.log(erro));
    }

    const handleSubmitAtividade = async (e) => {
        e.preventDefault();

        const atividade = {
            nome:nome,
            professor: parseInt(professor),
            local: local,
            descricao: descricao,
            loja:loja
        };

        await registerAtividadeApi(atividade);

        navigate("/atividade");
    }

    const onClickCancelar = ()=>{
        navigate("/atividade");
    }

    return (
        <Container fluid>
            <h2>Cadastro de Atividades</h2>
            <Form onSubmit={handleSubmitAtividade}>
                <Row>
                    <Col>
                        <Form.Group controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control required type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formProfessor">
                            <Form.Label>Selecione o Professor(a)</Form.Label>
                            <Form.Control required as="select" value={professor} onChange={(e) => setProfessor(e.target.value)}>
                                <option value="">Selecione</option>
                                {options.map((option) => (
                                    <option value={option.id}>{option.nome}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formLocal">
                            <Form.Label>Local</Form.Label>
                            <Form.Control required type="text" placeholder="Local" value={local} onChange={(e) => setLocal(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="descricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" rows={2} placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                        Cadastrar
                    </Button>
                    <Button variant="secondary" style={{ marginTop: '10px', marginLeft : '10px'}} onClick={onClickCancelar}>
                        Cancelar
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default CadastroAtividade;
