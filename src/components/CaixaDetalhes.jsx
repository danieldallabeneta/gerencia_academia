import { useNavigate, useParams } from "react-router-dom";
import { useAutCtx } from "../AutCtx";
import { useEffect, useState } from "react";
import { atualizaCaixaApi, obterCaixaApi } from "../Api/Service";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function CaixaDetalhes() {
    const autCtx = useAutCtx();
    const idLoja = autCtx.lojaId;
    const navigate = useNavigate();
    const [codigo, setCodigo] = useState('');
    const [data, setData] = useState('');
    const [valorAbertura, setValorAbertura] = useState('');
    const [valorFechamento, setValorFechamento] = useState('');
    const [situacao, setSituacao] = useState('');

    const { id } = useParams();
    useEffect(() => obterCaixa(id), [id]);

    function obterCaixa(id) {
        obterCaixaApi(id)
            .then((resposta) => carregaDados(resposta))
            .catch((erro) => console.log(erro));
    }

    function carregaDados(resposta) {
        const dados = resposta.data;
        console.log(dados);
        setCodigo(dados.id);
        setData(dados.data);
        const valorAbertura = dados.valorAbertura.toString().replace(".", ",");
        setValorAbertura(valorAbertura);
        const valorFechamento = dados.valorFechamento.toString().replace(".", ",");
        setValorFechamento(valorFechamento);
        setSituacao(dados.situacao);
    }

    const handleInputChange = (event) => {
        const rawValue = event.target.value;
        const formattedValue = formatCurrency(rawValue);
        setValorAbertura(formattedValue);
    };

    const formatCurrency = (value) => {
        const cleanedValue = value.replace(/[^\d]/g, '');
        let integerPart = cleanedValue.slice(0, cleanedValue.length - 2);
        let decimalPart = cleanedValue.slice(-2);
        if (integerPart.length > 3) {
            integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        return `${integerPart},${decimalPart}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novoAbertura = valorAbertura.toString().replace(",", ".");
        const novoFechamento = valorFechamento.toString().replace(",", ".");
        const caixa = {
            id: id,
            data: data,
            valorAbertura: parseFloat(novoAbertura),
            valorFechamento: parseFloat(novoFechamento),
            situacao: situacao,
            loja: idLoja
        };
        await atualizaCaixaApi(caixa);
        navigate("/caixas");
    };

    function cancelar() {
        navigate("/caixas");
    }

    return (
        <Container fluid>
            <div className="text-center">
                <h4>Detalhes de Caixa</h4>
            </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="formId">
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="number" disabled value={codigo} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formData" />
                        <Form.Label>Data</Form.Label>
                        <Form.Control type="date" disabled value={data} onChange={(e) => setData(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Group controlId="formSituacao">
                            <Form.Label>Situação</Form.Label>
                            <Form.Control required disabled as="select" value={situacao} onChange={(e) => setSituacao(e.target.value)}>
                                <option value="">Selecione</option>
                                <option value="1">Aberto</option>
                                <option value="2">Fechado</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="valorAbertura">
                            <Form.Label>Valor de Abertura (R$)</Form.Label>
                            <Form.Control required type="text" placeholder="999.999,99" value={valorAbertura} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="valorFechamento">
                            <Form.Label>Valor de Fechamento (R$)</Form.Label>
                            <Form.Control disabled type="text" placeholder="999.999,99" value={valorFechamento} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
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

export default CaixaDetalhes;