import { useNavigate } from "react-router-dom";
import { useAutCtx } from "../AutCtx";
import { useEffect, useState } from "react";
import { obterAlunoApi, obterAlunosApi, obterMatriculaAlunoApi, registerMensalidadeApi } from "../Api/Service";
import { Button, Col, Container, Form, Row } from "react-bootstrap";


function CadastroMensalidade() {
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;
    const user = autCtx.usuario;
    const navigate = useNavigate();
    const [alunos, setAlunos] = useState([]);
    const [data, setData] = useState('');
    const [aluno, setAluno] = useState('');
    const [valor, setValor] = useState('');
    const [desconto, setDesconto] = useState('');
    const [valorTotal, setValorTotal] = useState('');
    const [valorNull, setValorNull] = useState(false);
    useEffect(() => atualizarAlunos());
    useEffect(() => {
        setData(obterDataAtual());
    }, []);

    function atualizarAlunos() {
        obterAlunosApi(loja)
            .then((resposta) => {
                const dados = [];
                resposta.data.map((data) => (
                    dados.push({ id: data.id, nome: data.nome })
                ))
                setAlunos(dados);
            })
            .catch((erro) => console.log(erro));
    }

    const obterDataAtual = () => {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
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

    const handleDescontoChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) { // Verifica se o valor é um número inteiro
            setDesconto(value);
            if (value !== '') {
                let formattedValue = '';
                const novoValorUnit = valor.toString().replace(",", ".");
                const valorNow = parseFloat(novoValorUnit).toFixed(2);
                let  newValor = (valorNow - (valorNow * parseInt(value)) / 100).toFixed(2);

                var a = newValor.toString().split('.')[1].length
                if (a == 1) {
                    const aux = newValor.toString() + '0';
                    formattedValue = formatCurrency(aux);
                } else {
                    formattedValue = formatCurrency(newValor.toString());
                }
                setValorTotal(formattedValue);
            } else {
                setValorTotal(valor);
            }
        } else {
            setValorTotal(valor);
        }
    };

    const handleAlunoChange = (e) => {
        obterMatriculaAlunoApi(e.target.value)
            .then((resposta) => carregaValor(resposta))
            .catch((erro) => limpaCampoProduto());
    }

    function carregaValor(resposta) {
        const dados = resposta.data;
        const valorAux = dados.valorMensalidade.toString().replace(".", ",");
        setValor(valorAux);
        setValorNull(true);
        setValorTotal(valorAux);
        setAluno(dados.aluno);
    }

    function limpaCampoProduto() {
        setAluno('');
        setValor('');
        setValorNull(false);
        setValorTotal('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const totalValor = valorTotal.toString().replace(",", ".");
        const newValor = valor.toString().replace(",", ".");

        const alunoMensalidade = {
            aluno: aluno,
            valor: newValor,
            data: data,
            desconto: parseInt(desconto),
            valorTotal: totalValor,
            loja: loja,
            usuario: user
        }

        await registerMensalidadeApi(alunoMensalidade);
        navigate("/mensalidades");
    }

    function cancelar() {
        navigate("/mensalidades");
    }


    return (
        <Container fluid>
            <div className="text-center">
                <h4>Cadastro de Mensalidade</h4>
            </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="formData" />
                        <Form.Label>Data:</Form.Label>
                        <Form.Control type="date" value={data} onChange={(e) => setData(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Group controlId="formAluno">
                            <Form.Label>Aluno:</Form.Label>
                            <Form.Control required as="select" value={aluno} onChange={handleAlunoChange}>
                                <option value="">Selecione</option>
                                {alunos.map((aluno) => (
                                    <option value={aluno.id}>{aluno.nome}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formValor">
                            <Form.Label>Valor (R$)</Form.Label>
                            <Form.Control disabled type="text" placeholder="999.999,99" value={valor} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formDesconto">
                            <Form.Label>Desconto</Form.Label>
                            <Form.Control type="text" disabled={!valorNull} value={desconto} onChange={handleDescontoChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formValorTotal">
                            <Form.Label>Total (R$)</Form.Label>
                            <Form.Control disabled type="text" placeholder="999.999,99" value={valorTotal} />
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
    );

}

export default CadastroMensalidade;