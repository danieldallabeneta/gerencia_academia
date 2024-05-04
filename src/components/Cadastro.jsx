import { Form, Col, FormControl, FormGroup, Row, Container } from "react-bootstrap";
import "./Cadastro.css";
import { useState } from "react";
import { registerUserApi } from "../Api/Service";
import { useNavigate } from "react-router-dom";
import { useAutCtx } from "../AutCtx";
import InputMask from 'react-input-mask';

function Cadastro() {

  const navigate = useNavigate();
  const autCtx = useAutCtx();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");

  async function registerUser() {
    const user = {
      nome: nome,
      cpf: cpf,
      email: email,
      password: senha,
      cep: cep,
      rua: rua,
      bairro: bairro,
      numero: numero,
      cidade: cidade,
      estado: estado,
      complemento: complemento
    };
    const resposta = await registerUserApi(user);
    const idInsert = resposta.data.id;

    if (idInsert != null) {
      autCtx.atualizaDadosCadastro(idInsert, nome);
      navigate(`/`);
    } else {
      autCtx.setAutenticado(false);
      autCtx.setUsuario(null);
    }
  }

  return (
    <Container fluid>
      <h4>Cadastro de Usuário</h4>
      <Form>
        <Row>
          <Col>
            <FormGroup controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formGridPassword">
              <Form.Label>Senha</Form.Label>
              <FormControl type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup controlId="formGridName">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control type="text" placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formGridCpf">
              <Form.Label>CPF</Form.Label>
              <InputMask mask="999.999.999-99" maskChar="_" alwaysShowMask={true} className="form-control" value={cpf} onChange={(e) => setCpf(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup controlId="formGridRua">
              <Form.Label>Rua</Form.Label>
              <Form.Control type="text" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formGridBairro">
              <Form.Label>Bairro</Form.Label>
              <Form.Control type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formGridCidade">
              <Form.Label>Cidade</Form.Label>
              <Form.Control type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formGridNumero">
              <Form.Label>Número</Form.Label>
              <Form.Control type="number" placeholder="Número Casa ou Apt" value={numero} onChange={(e) => setNumero(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={1}>
            <FormGroup controlId="formGridCEP">
              <Form.Label>CEP</Form.Label>
              <InputMask mask="99999-999" maskChar="_" alwaysShowMask={true} className="form-control" value={cep} onChange={(e) => setCep(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={1}>
            <FormGroup as={Col} controlId="formGridEstado">
              <Form.Label>UF</Form.Label>
              <InputMask mask="aa" value={estado} onChange={(e) => setEstado(e.target.value)} maskChar={null} className="form-control" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="mb-2" controlId="formGridComplemento">
              <Form.Label>Complemento</Form.Label>
              <Form.Control placeholder="Complemento ou referencias" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <div className="btnCadastrar">
            <a href="#" class="btn btn-white btn-animate" onClick={registerUser}>
              Cadastrar
            </a>
          </div>
        </Row>
      </Form>
    </Container >

  );
}

export default Cadastro;
