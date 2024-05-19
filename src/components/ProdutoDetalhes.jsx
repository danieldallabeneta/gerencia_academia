import { useNavigate, useParams } from "react-router-dom";
import { useAutCtx } from "../AutCtx";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { atualizaProdutoApi, obterProdutoApi } from "../Api/Service";


function ProdutoDetalhes() {
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;
    let navigate = useNavigate();
    const [codigo, setCodigo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [informacao, setInformacao] = useState('');
    const { id } = useParams();
    useEffect(() => obterProduto(id), [id]);

    function obterProduto(id) {
        obterProdutoApi(id)
            .then((resposta) => carregaDados(resposta))
            .catch((erro) => console.log(erro));
    }

    function carregaDados(resposta) {
        const dados = resposta.data;
        setCodigo(dados.id);
        setDescricao(dados.descricao);
        setQuantidade(dados.quantidade);
        setPreco(dados.preco);
        setInformacao(dados.informacao);
    }




    const handleSubmit = async (e) => {
        e.preventDefault();

        const produto = {
            id: codigo,
            descricao: descricao,
            quantidade: quantidade,
            preco: preco,
            informacao: informacao,
            loja: loja
        };
        await atualizaProdutoApi(produto);
        navigate("/produtos");
    };

    function cancelar() {
        navigate("/produtos");
    }

    return (
        <Container fluid>
            <h3>Cadastro de Produto</h3>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={1}>
                        <Form.Group className="mb-2" controlId="formGridId">
                            <Form.Label>id</Form.Label>
                            <Form.Control type="number" disabled value={codigo} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="descricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control required type="text" placeholder="Descrição do Produto" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="quantidade">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control required type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
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

export default ProdutoDetalhes;