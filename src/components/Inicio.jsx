import { useEffect, useState } from "react";
import { Button, Col, Container, Figure, Form, ModalTitle, Row } from "react-bootstrap";
import { obterLojasApi } from "../Api/Service";
import { useNavigate } from "react-router-dom";
import { useAutCtx } from "../AutCtx";

function Inicio() {
    const [lojas, setLojas] = useState([]);
    const [selecao, setSelecao] = useState('');
    const autCtx = useAutCtx();
    let navigate = useNavigate();
    useEffect(() => buscaLojas(), []);

    function buscaLojas() {
        obterLojasApi()
            .then((resposta) => {
                if (resposta.data !== '') {
                    setLojas(resposta.data);
                }
            })
            .catch((erro) => console.log(erro));
    }

    function entrar() {
        if (selecao > 0) {
            const autent = autCtx.setaLoja(selecao);
            if (autent) {
                navigate("/inicial")
            }
        }
    }

    function novaLoja() {
        navigate("/loja/cadastro");
    }

    const setaOpcao = (event) => {
        setSelecao(event.target.value);
    }

    return (
        <Container style={{ minHeight: '600px', minWidth: '300px', maxWidth: '800px'}}>
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <Figure>
                        <Figure.Image width={171} height={180} alt="171x180" src="./img/logo.png" style={{ opacity: 0.8 }} />
                    </Figure>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalTitle>Seleciona a Loja</ModalTitle>
                    <Form.Select size="lg" className="mb-2" onChange={setaOpcao}>
                        <option>Selecione...</option>
                        {lojas.map(loja => (
                            <option value={loja.id}>{loja.nome}</option>)
                        )}
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <div className="text-center">
                    <Button className="confirmar" variant="primary" style={{ marginTop: '10px', outline: 'none' }} onClick={() => entrar()}>
                        Confirmar
                    </Button>
                    <Button variant="primary" style={{ marginTop: '10px', marginLeft: '5px', outline: 'none' }} onClick={() => novaLoja()}>
                        Nova Loja
                    </Button>
                </div>
            </Row>
        </Container>
    );
}

export default Inicio;