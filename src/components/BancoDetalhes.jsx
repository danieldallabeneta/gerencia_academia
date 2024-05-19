import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { useNavigate, useParams } from 'react-router-dom';
import { useAutCtx } from '../AutCtx';
import { atualizaBancoApi, obterBancoApi } from '../Api/Service';

const BancoDetalhes = () => {
    const autCtx = useAutCtx();
    const idLoja = autCtx.lojaId;
    let navigate = useNavigate();

    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [agencia, setAgencia] = useState('');
    const [codigoBanco, setCodigoBanco] = useState('');
    const [digitoAgencia, setDigitoAgencia] = useState('');
    const [conta, setConta] = useState('');
    const [digitoConta, setDigitoConta] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const { id } = useParams();
    useEffect(() => obterBanco(id), [id]);

    function obterBanco(id) {
        obterBancoApi(id)
            .then((resposta) => carregaDados(resposta))
            .catch((erro) => console.log(erro));
    }

    function carregaDados(resposta) {
        const dados = resposta.data;
        setCodigo(dados.id);
        setNome(dados.nome);
        setAgencia(dados.agencia);
        setCodigoBanco(dados.codigo);
        setDigitoAgencia(dados.digitoAgencia);
        setConta(dados.conta);
        setDigitoConta(dados.digitoConta);
        setDataCadastro(dados.dataCadastro);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const banco = {
            id: codigo,
            nome: nome,
            codigo: codigoBanco,
            agencia: agencia,
            digitoAgencia: digitoAgencia,
            conta: conta,
            digitoConta: digitoConta,
            dataCadastro: dataCadastro,
            loja: idLoja
        };

        await atualizaBancoApi(banco);
        navigate("/banco");
    };

    function cancelar() {
        navigate("/bancos");
    }

    return (
        <Container fluid>
            <h3>Cadastro de Bancos</h3>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formNome">
                            <Form.Label>Nome do Banco</Form.Label>
                            <Form.Control type="text" required placeholder="Digite o nome do banco" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="formCodigoBanco">
                            <Form.Label>Código do Banco</Form.Label>
                            <InputMask required mask="999" maskChar="" alwaysShowMask={true} className="form-control" value={codigoBanco} onChange={(e) => setCodigoBanco(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="formAgencia">
                            <Form.Label>Agência</Form.Label>
                            <Form.Control type="number" placeholder="Digite a agência" value={agencia} onChange={(e) => setAgencia(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="formDigitoAgencia">
                            <Form.Label>Dígito da Agência</Form.Label>
                            <Form.Control type="number" placeholder="Digite o dígito da agência" value={digitoAgencia} onChange={(e) => setDigitoAgencia(e.target.value)} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formConta">
                            <Form.Label>Conta</Form.Label>
                            <Form.Control type="number" placeholder="Digite a conta" value={conta} onChange={(e) => setConta(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formDigitoConta">
                            <Form.Label>Dígito da Conta</Form.Label>
                            <Form.Control type="numer" placeholder="Digite o dígito da conta" value={digitoConta} onChange={(e) => setDigitoConta(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formDataCadastro">
                            <Form.Label>Data do Cadastro</Form.Label>
                            <Form.Control type="date" value={dataCadastro} onChange={(e) => setDataCadastro(e.target.value)} required />
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

export default BancoDetalhes;
