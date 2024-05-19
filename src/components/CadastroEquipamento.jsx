import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { useAutCtx } from '../AutCtx';
import { registerEquipamentoApi } from '../Api/Service';
import { useNavigate } from 'react-router-dom';

const CadastroEquipamento = () => {
  const autCtx = useAutCtx();
  const idLoja = autCtx.lojaId;
  let navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [anoFabricacao, setAnoFabricacao] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [condicao, setCondicao] = useState('');
  const [dataAquisicao, setDataAquisicao] = useState('');
  const [valorAquisicao, setValorAquisicao] = useState('');

  const handleInputChange = (event) => {
    const rawValue = event.target.value;
    const formattedValue = formatCurrency(rawValue);
    setValorAquisicao(formattedValue);
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

    const equipamento = {
      nome: nome,
      tipo: parseInt(tipo),
      fabricante: fabricante,
      condicao: parseInt(condicao),
      ano: parseInt(anoFabricacao),
      numeroSerie: numeroSerie,
      dataAquisicao: dataAquisicao,
      valor: parseFloat(valorAquisicao),
      descricao: descricao,
      loja: idLoja
    };

    await registerEquipamentoApi(equipamento);
    navigate("/equipamento");
  };

  return (
    <Container fluid>
      <h3>Cadastro de Equipamento</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={5}>
            <Form.Group controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control required type="text" placeholder="Nome do equipamento" value={nome} onChange={(e) => setNome(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="tipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control required as="select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Selecione</option>
                <option value="1">Halteres</option>
                <option value="2">Caneleiras</option>
                <option value="3">Bancos de Musculação</option>
                <option value="4">Step</option>
                <option value="5">Colchonetes</option>
                <option value="6">Bolas</option>
                <option value="7">Prancha Abdominal</option>
                <option value="8">Bicicleta Ergométrica</option>
                <option value="9">Esteira Ergométrica</option>
                <option value="10">Mini Jump</option>
                <option value="11">Barras</option>
                <option value="12">Kit Anilhas</option>
                <option value="13">Cross Over</option>
                <option value="14">Máquina de Desenvolvimento Ombro</option>
                <option value="15">Cadeira Flexora</option>
                <option value="16">Mesa Flexora</option>
                <option value="17">Cadeira Adutora</option>
                <option value="18">Cadeira Abdutora</option>
                <option value="19">Leg Press Horisontal 45º</option>
                <option value="20">Cadeira Extensora</option>
                <option value="21">Remada Frente</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="fabricante">
              <Form.Label>Fabricante</Form.Label>
              <Form.Control required type="text" placeholder="Fabricante do equipamento" value={fabricante} onChange={(e) => setFabricante(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Form.Group controlId="condicao">
              <Form.Label>Condição</Form.Label>
              <Form.Control required as="select" value={condicao} onChange={(e) => setCondicao(e.target.value)}>
                <option value="">Selecione</option>
                <option value="1">Novo</option>
                <option value="2">Usado</option>
                <option value="3">Reformado</option>
                <option value="4">Sucata</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="anoFabricacao">
              <Form.Label>Ano de Fabricação</Form.Label>
              <InputMask required mask="9999" maskChar="" alwaysShowMask={true} className="form-control" value={anoFabricacao} onChange={(e) => setAnoFabricacao(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="numeroSerie">
              <Form.Label>Número de Série</Form.Label>
              <Form.Control type="text" placeholder="Número de série do equipamento" value={numeroSerie} onChange={(e) => setNumeroSerie(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="dataAquisicao">
              <Form.Label>Data de Aquisição</Form.Label>
              <Form.Control required type="date" value={dataAquisicao} onChange={(e) => setDataAquisicao(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="valorAquisicao">
              <Form.Label>Valor de Aquisição (R$)</Form.Label>
              <Form.Control required type="text" placeholder="999.999,99" value={valorAquisicao} onChange={handleInputChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="descricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Descrição do equipamento" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
            Cadastrar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CadastroEquipamento;
