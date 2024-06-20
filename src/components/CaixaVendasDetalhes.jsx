import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obterCaixaVendasApi } from "../Api/Service";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";


function CaixaVendasDetalhes() {
    const navigate = useNavigate();
    let [totalVenda, setTotalVenda] = useState(0);
    const [vendas, setVendas] = useState([]);
    const { id } = useParams();
    useEffect(() => atualizarVendasCaixa(id), [id]);

    function atualizarVendasCaixa(id) {
        obterCaixaVendasApi(id)
            .then((resposta) => {
                if (resposta.data !== '') {
                    let valor = 0;
                    setVendas(resposta.data);

                    resposta.data.forEach(item =>{
                        valor += parseFloat(item.valorTotal)
                    })
                    setTotalVenda(valor.toString());
                }
            })
            .catch((erro) => console.log(erro));
    }

    function cancelar() {
        navigate("/caixas");
    }

    return (
        <Container>
            <div className="text-center">
                <h4>Vendas</h4>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '7%' }}>Id</th>
                        <th style={{ width: '10%' }}>Tipo Cliente</th>
                        <th style={{ width: '20%' }}>Cliente</th>
                        <th style={{ width: '15%' }}>Tipo de Venda</th>
                        <th style={{ width: '15%' }}>Tipo de Pagamento</th>
                        <th style={{ width: '20%' }}>Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.map((venda) => (
                        <tr key={venda.id}>
                            <td>{venda.id}</td>
                            <td>{venda.nomeAluno == null ? 'Visitante' : 'Aluno'}</td>
                            <td>{venda.nomeAluno == null ? venda.nome : venda.nomeAluno}</td>
                            <td>{venda.tipoVenda == 1 ? 'Bar' : venda.tipoVenda == 2 ? 'Loja' : 'Mensalidade'}</td>
                            <td>{venda.tipoPagamento == 1 ? 'À  Vista' : 'À Prazo'}</td>
                            <td>{venda.valorTotal}</td>
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

export default CaixaVendasDetalhes;