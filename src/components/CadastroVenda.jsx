import { Button, Col, Container, Form, FormCheck, Row } from "react-bootstrap";
import { useAutCtx } from "../AutCtx";
import { useEffect, useState } from "react";
import { obterAlunosApi, obterProdutoApi, obterProdutosApi } from "../Api/Service";
import { useNavigate } from "react-router-dom";


function CadastroVenda() {
    const autCtx = useAutCtx();
    const idLoja = autCtx.lojaId;
    let navigate = useNavigate();
    const [data, setData] = useState('');
    const [aluno, setAluno] = useState('');
    const [alunos, setAlunos] = useState([]);
    const [produto, setProduto] = useState('');
    const [descricaoProduto, setDescricaoProduto] = useState('');
    const [valorUnit, setValorUnit] = useState('');
    const [qtdUnit, setQtdUnit] = useState('');
    const [totalUnit, setTotalUnit] = useState('');
    const [totalVenda, setTotalVenda] = useState('');
    const [valorNull, setValorNull] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [selectedOption, setSelectedOption] = useState('aluno');
    const [tipoVenda, setTipoVenda] = useState('1');
    const [tipoPagamento, setTipoPagamento] = useState('1');
    const [produtosVenda, setProdutosVenda] = useState([]);

    useEffect(() => {
        const obterDataAtual = () => {
            const hoje = new Date();
            const ano = hoje.getFullYear();
            const mes = String(hoje.getMonth() + 1).padStart(2, '0');
            const dia = String(hoje.getDate()).padStart(2, '0');
            return `${ano}-${mes}-${dia}`;
        };

        setData(obterDataAtual());
    }, []);
    useEffect(() => atualizarAlunos());
    useEffect(() => atualizarProdutos());

    function atualizarAlunos() {
        obterAlunosApi(idLoja)
            .then((resposta) => {
                const dados = [];
                resposta.data.map((data) => (
                    dados.push({ id: data.id, nome: data.nome })
                ))
                setAlunos(dados);
            })
            .catch((erro) => console.log(erro));
    }

    function atualizarProdutos() {
        obterProdutosApi(idLoja)
            .then((resposta) => {
                const dados = [];
                resposta.data.map((data) => (
                    dados.push({ id: data.id, nome: data.descricao })
                ))
                setProdutos(dados);
            })
            .catch((erro) => console.log(erro));
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleTipoVendaChange = (event) => {
        setTipoVenda(event.target.value);
    };

    const handleTipoPagamentoChange = (event) => {
        setTipoPagamento(event.target.value);
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

    const handleQtdUnitChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) { // Verifica se o valor é um número inteiro
            setQtdUnit(value);
            if (value !== '') {
                let formattedValue = '';
                const novoValorUnit = valorUnit.toString().replace(",", ".");
                let totalAux = (parseInt(value) * parseFloat(novoValorUnit)).toFixed(2);
                var a = totalAux.toString().split('.')[1].length
                if (a == 1) {
                    const aux = totalAux.toString() + '0';
                    formattedValue = formatCurrency(aux);
                } else {
                    formattedValue = formatCurrency(totalAux.toString());
                }
                setTotalUnit(formattedValue);
            } else {
                setTotalUnit('');
            }
        }
    };

    const handleProdutoChange = (e) => {
        obterProdutoApi(e.target.value)
            .then((resposta) => carregaValorUnit(resposta))
            .catch((erro) => limpaCampoProduto());
    }

    function carregaValorUnit(resposta) {
        const dados = resposta.data;
        setProduto(dados.id);
        setDescricaoProduto(dados.descricao);
        const valorAux = dados.preco.toString().replace(".", ",");
        setValorUnit(valorAux);
        setValorNull(true);
    }

    function limpaCampoProduto() {
        setProduto('');
        setValorUnit('');
        setValorNull(false);
        setQtdUnit('');
        setTotalUnit('');
    }

    const handleProdutoVendaChange = (index, field, value) => {
        const updatedExperiencias = [...produtosVenda];
        updatedExperiencias[index][field] = value;
        setProdutosVenda(updatedExperiencias);
    };

    const adicionarProdutoVenda = () => {
        console.log(produto)
        setProdutosVenda([...produtosVenda, { codigo: produto, descricao: descricaoProduto, valor: valorUnit, quantidade: qtdUnit, total: totalUnit }]);

        if (totalVenda == '') {
            setTotalVenda(totalUnit);
        } else {
            let formattedValue = '';
            const novoValorTotal = totalVenda.toString().replace(",", ".");
            const novoValorUnit = totalUnit.toString().replace(",", ".");
            let valorFinal = (parseFloat(novoValorTotal) + parseFloat(novoValorUnit)).toFixed(2);
            console.log(valorFinal);
            var a = valorFinal.toString().split('.')[1].length
            if (a == 1) {
                const aux = valorFinal.toString() + '0';
                formattedValue = formatCurrency(aux);
            } else {
                formattedValue = formatCurrency(valorFinal.toString());
            }
            setTotalVenda(formattedValue);
        }
        limpaCampoProduto();
    };

    const removerProdutoVenda = (index) => {
        var totalDimin = produtosVenda[index]['total'];
        let formattedValue = '';
        const novoValorTotal = totalVenda.toString().replace(",", ".");
        const novoValorUnit = totalDimin.toString().replace(",", ".");
        let valorFinal = (parseFloat(novoValorTotal) - parseFloat(novoValorUnit)).toFixed(2);
        var a = valorFinal.toString().split('.')[1].length
        if (a == 1) {
            const aux = valorFinal.toString() + '0';
            formattedValue = formatCurrency(aux);
        } else {
            formattedValue = formatCurrency(valorFinal.toString());
        }
        setTotalVenda(formattedValue);
        const updatedExperiencias = produtosVenda.filter((_, i) => i !== index);
        setProdutosVenda(updatedExperiencias);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const vendasTotais = JSON.stringify(produtosVenda);
    }

    function cancelar() {
        navigate("/vendas");
    }

    return (
        <Container fluid>
            <div className="text-center">
                <h4>Cadastro de Venda</h4>
            </div>
            <Form onSubmit={handleSubmit}>
                <div className="text-center">
                    <h4>Cliente</h4>
                </div>
                <Row>
                    <Col md={2}>
                        <Form.Group controlId="formData" />
                        <Form.Label>Data:</Form.Label>
                        <Form.Control type="date" value={data} onChange={(e) => setData(e.target.value)} />
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="formTipoUsuario">
                            <Form.Label>Venda Para:</Form.Label>
                            <FormCheck type="radio" label="Aluno" value="aluno" checked={selectedOption === 'aluno'} onChange={handleOptionChange} />
                            <FormCheck type="radio" label="Visitante" value="visitante" checked={selectedOption === 'visitante'} onChange={handleOptionChange} />
                        </Form.Group>
                    </Col>
                    {selectedOption === 'aluno' && (
                        <Col>
                            <Form.Group controlId="formAluno">
                                <Form.Label>Aluno:</Form.Label>
                                <Form.Control required as="select" value={aluno} onChange={(e) => setAluno(e.target.value)}>
                                    <option value="">Selecione</option>
                                    {alunos.map((aluno) => (
                                        <option value={aluno.id}>{aluno.nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    )}
                    {selectedOption === 'visitante' && (
                        <Col>
                            <Form.Group>
                                <Form.Label>Visitante:</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome do Visitante" />
                            </Form.Group>
                        </Col>
                    )}
                </Row>
                <div className="text-center">
                    <h4>Venda</h4>
                </div>
                <Row>
                    <Col md={2}>
                        <Form.Group controlId="formTipoVenda">
                            <Form.Label>Tipo de Venda:</Form.Label>
                            <FormCheck type="radio" label="Bar" value="1" checked={tipoVenda === "1"} onChange={handleTipoVendaChange} />
                            <FormCheck type="radio" label="Loja" value="2" checked={tipoVenda === "2"} onChange={handleTipoVendaChange} />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="formTipoPagamento">
                            <Form.Label>Tipo de Pagamento:</Form.Label>
                            <FormCheck type="radio" label="À Vista" value="1" checked={tipoPagamento === "1"} onChange={handleTipoPagamentoChange} />
                            <FormCheck type="radio" label="À Prazo" value="2" checked={tipoPagamento === "2"} onChange={handleTipoPagamentoChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formProduto">
                            <Form.Label>Produto:</Form.Label>
                            <Form.Control required as="select" value={produto} onChange={handleProdutoChange}>
                                <option value="">Selecione</option>
                                {produtos.map((produto) => (
                                    <option value={produto.id}>{produto.nome}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formValorUnit">
                            <Form.Label>Valor (R$)</Form.Label>
                            <Form.Control disabled type="text" placeholder="999.999,99" value={valorUnit} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formQtdUnit">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control type="text" disabled={!valorNull} value={qtdUnit} onChange={handleQtdUnitChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formTotalUnit">
                            <Form.Label>Total (R$)</Form.Label>
                            <Form.Control disabled type="text" placeholder="999.999,99" value={totalUnit} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="success" style={{ marginTop: '10px', marginLeft: '5px' }} onClick={adicionarProdutoVenda}>
                            Adicionar Produto
                        </Button>
                    </Col>
                </Row>
                <div className="text-center">
                    <h4>Produtos</h4>
                </div>
                {produtosVenda.map((product, index) => (
                    <Row key={index}>
                        <Col>
                            <Form.Group controlId={`formCodigo-${index}`}>
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="number" disabled value={product.codigo} onChange={(e) => handleProdutoVendaChange(index, 'codigo', e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`formDescricao-${index}`}>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control disabled type="text" value={product.descricao} onChange={(e) => handleProdutoVendaChange(index, 'descricao', e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`formValor-${index}`}>
                                <Form.Label>Valor Unitário(R$)</Form.Label>
                                <Form.Control disabled type="text" placeholder="999.999,99" value={product.valor} onChange={(e) => handleProdutoVendaChange(index, 'valor', e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`formQtd-${index}`}>
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control type="text" disabled value={product.quantidade} onChange={(e) => handleProdutoVendaChange(index, 'quantidade', e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`formValor-${index}`}>
                                <Form.Label>Valor Total(R$)</Form.Label>
                                <Form.Control disabled type="text" placeholder="999.999,99" value={product.total} onChange={(e) => handleProdutoVendaChange(index, 'total', e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={1}>
                            <Button variant="danger" style={{ marginTop: '10px', marginLeft: '5px' }} onClick={() => removerProdutoVenda(index)}>Remover</Button>
                        </Col>
                    </Row>
                ))}
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
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" style={{ marginTop: '10px', marginLeft: '5px' }}>
                        Cadastrar
                    </Button>
                </div>
            </Form>
        </Container>
    )

}

export default CadastroVenda;