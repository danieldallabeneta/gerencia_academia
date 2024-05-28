import { useNavigate } from "react-router-dom";
import { useAutCtx } from "../AutCtx";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { registerProdutoApi } from "../Api/Service";


function CadastroProduto() {
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;
    let navigate = useNavigate();
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [informacao, setInformacao] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const produto = {
            descricao: descricao,
            quantidade: quantidade,
            preco: preco,
            informacao: informacao,
            loja: loja
        };
        console.log(produto);
        await registerProdutoApi(produto);
        navigate("/produtos");
    };

    function cancelar() {
        navigate("/produtos");
    }

    return (
        <Container fluid>
            <div className="text-center">
                <h3>Cadastro de Produto</h3>
            </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="descricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control required type="text" placeholder="Descrição do Produto" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="quantidade">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control required type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="preco">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control required type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="informacoes">
                            <Form.Label>Informações</Form.Label>
                            <Form.Control as="textarea" name="informacoes" value={informacao} onChange={(e) => setInformacao(e.target.value)} rows={3} />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button variant="primary" type="submit" style={{ marginTop: '10px', marginLeft: '5px' }}>
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

export default CadastroProduto;