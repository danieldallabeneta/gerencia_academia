import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { obterVendaProdutosApi } from "../Api/Service";
import { useEffect, useState } from "react";

function VendaDetalhes() {
    const navigate = useNavigate();
    let [totalVenda, setTotalVenda] = useState(0);
    const [produtos, setProdutos] = useState([]);
    const { id } = useParams();
    useEffect(() => atualizarProdutos(id), [id]);

    function atualizarProdutos(id) {
        obterVendaProdutosApi(id)
            .then((resposta) => {
                if (resposta.data !== '') {
                    let valor = 0;
                    setProdutos(resposta.data);

                    resposta.data.forEach(item =>{
                        valor += parseFloat(item.valorTotal)
                    })
                    setTotalVenda(valor.toString());
                }
            })
            .catch((erro) => console.log(erro));
    }

    function cancelar() {
        navigate("/vendas");
    }

    return (
        <Container>
            <div className="text-center">
                <h4>Produtos</h4>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '7%' }}>Id</th>
                        <th style={{ width: '40%' }}>Produto</th>
                        <th style={{ width: '13%' }}>Quantidade</th>
                        <th style={{ width: '20%' }}>Valor Unitário</th>
                        <th style={{ width: '20%' }}>Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.produto}>
                            <td>{produto.produto}</td>
                            <td>{produto.nomeProduto}</td>
                            <td>{produto.quantidade}</td>
                            <td>{produto.valorUnitario}</td>
                            <td>{produto.valorTotal}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Row className="justify-content-end">
                <Col md={2}>
                    <Form.Group controlId="formCampo">
                        <Form.Label>Total (R$)</Form.Label>
                        <Form.Control type="text" disabled style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'right' }} placeholder="999.999,99" value={totalVenda} onChange={(e) => setTotalVenda(e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            <div className="text-center">
                <Button variant="secondary" style={{ marginTop: '10px', marginLeft: '5px' }} onClick={cancelar}>
                    Fechar
                </Button>
            </div>
        </Container>
    );
}


export default VendaDetalhes;