import { useNavigate } from "react-router-dom";
import { useAutCtx } from "../AutCtx";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { registerCaixaApi } from "../Api/Service";


function CadastroCaixa() {
    const autCtx = useAutCtx();
    const idLoja = autCtx.lojaId;
    const navigate = useNavigate();
    const [dataAtual, setDataAtual] = useState('');
    const [valorAbertura, setValorAbertura] = useState('');
    const [situacao, setSituacao] = useState(1);
    useEffect(() => {
        const obterDataAtual = () => {
            const hoje = new Date();
            const ano = hoje.getFullYear();
            const mes = String(hoje.getMonth() + 1).padStart(2, '0');
            const dia = String(hoje.getDate()).padStart(2, '0');
            return `${ano}-${mes}-${dia}`;
        };

        setDataAtual(obterDataAtual());
    }, []);

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

        const caixa = {
            data: dataAtual,
            valorAbertura: parseFloat(valorAbertura),
            valorFechamento: parseFloat(0),
            situacao: situacao,
            loja: idLoja
        };

        await registerCaixaApi(caixa);
        navigate("/caixas");
    };


    function cancelar() {
        navigate("/caixas");
    }

    return (
        <Container fluid>
            <div className="text-center">
                <h4>Cadastro de Caixa</h4>
            </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="formData" />
                        <Form.Label>Data</Form.Label>
                        <Form.Control type="date" disabled value={dataAtual} onChange={(e) => setDataAtual(e.target.value)} />
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
    )
}

export default CadastroCaixa;