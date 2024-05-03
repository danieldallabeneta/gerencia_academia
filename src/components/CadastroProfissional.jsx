import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { useAutCtx } from '../AutCtx';
import { registerProfissionalApi } from '../Api/Service';
import { useNavigate } from 'react-router-dom';

const CadastroProfissional = () => {
  const autCtx = useAutCtx();
  const idLoja = autCtx.lojaId;
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [sexo, setSexo] = useState('1');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [celular, setCelular] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [numero, setNumero] = useState('');
  let navigate = useNavigate();
  const [experiencias, setExperiencias] = useState([
    { empresa: '', dataInicio: '', dataTermino: '', atividades: '' }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const experiencia = JSON.stringify(experiencias);
    const profissonal = {
      nome: nome,
      dataNascimento: dataNascimento,
      cpf : cpf,
      sexo: parseInt(sexo),
      ativo: 1,
      email: email,
      telefone:telefone,
      celular: celular,
      loja : idLoja,
      rua: rua,
      bairro: bairro,
      cidade: cidade,
      cep: cep,
      uf: uf,      
      numero:numero,
      experiencia:experiencia
    };
    
    await registerProfissionalApi(profissonal);
    navigate("/professor");
  };

  // Função para adicionar uma nova experiência profissional
  const adicionarExperiencia = () => {
    setExperiencias([...experiencias, { empresa: '', dataInicio: '', dataTermino: '', atividades: '' }]);
  };

    // Função para atualizar os campos de experiência profissional
    const handleExperienciaChange = (index, field, value) => {
      const updatedExperiencias = [...experiencias];
      updatedExperiencias[index][field] = value;
      setExperiencias(updatedExperiencias);
    };

  const handleUfChange = (e) => {
    const inputValue = e.target.value.toUpperCase();
    const sanitizedValue = inputValue.replace(/[^A-Z]/g, '');

    setUf(sanitizedValue);
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>

        {/* Dados Principais */}
        <h2>Dados Principais</h2>
        <Row>
          <Col>
            <Form.Group controlId="formNome">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control type="text" placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formDataNascimento">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCPF">
              <Form.Label>CPF</Form.Label>
              <InputMask mask="999.999.999-99" maskChar="_" alwaysShowMask={true} className="form-control" value={cpf} onChange={(e) => setCpf(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formSexo">
              <Form.Label>Sexo</Form.Label>
              <Form.Control as="select" value={sexo} onChange={(e) => setSexo(e.target.value)}>
                <option value='1'>Masculino</option>
                <option value='2'>Feminino</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <h2>Contato</h2>
        <Row>
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Digite o email do professor" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTelefone">
              <Form.Label>Telefone</Form.Label>
              <InputMask mask="+99 (99) 9999-9999" maskChar="_" alwaysShowMask={true} className="form-control" value={telefone} onChange={(e) => setTelefone(e.target.value)} />              
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCelular">
              <Form.Label>Celular</Form.Label>
              <InputMask mask="(99) 99999-9999" maskChar="_" alwaysShowMask={true} className="form-control" value={celular} onChange={(e) => setCelular(e.target.value)} />              
            </Form.Group>
          </Col>
        </Row>
        <h2>Endereço</h2>
        <Row>
          <Col>
            <Form.Group controlId="formRua">
              <Form.Label>Rua</Form.Label>
              <Form.Control type="text" placeholder="Digite a rua do professor" value={rua} onChange={(e) => setRua(e.target.value)}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBairro">
              <Form.Label>Bairro</Form.Label>
              <Form.Control type="text" placeholder="Digite o bairro do professor" value={bairro} onChange={(e) => setBairro(e.target.value)}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCidade">
              <Form.Label>Cidade</Form.Label>
              <Form.Control type="text" placeholder="Digite a cidade do professor" value={cidade} onChange={(e) => setCidade(e.target.value)}/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formCEP">
              <Form.Label>CEP</Form.Label>
              <InputMask mask="99999-999" maskChar="_" alwaysShowMask={true} className="form-control" value={cep} onChange={(e) => setCep(e.target.value)} />              
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formUF">
              <Form.Label>UF</Form.Label>
              <InputMask mask="aa" value={uf} onChange={handleUfChange} maskChar={null} className="form-control"/>             
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formNumero">
              <Form.Label>Número</Form.Label>
              <Form.Control type="number" placeholder="Digite o número do endereço" value={numero} onChange={(e) => setNumero(e.target.value)}/>
            </Form.Group>
          </Col>
        </Row>
        <h2>Experiência Profissional</h2>
        {experiencias.map((experiencia, index) => (
          <Row key={index}>
            <Col>
              <Form.Group controlId={`formEmpresa-${index}`}>
                <Form.Label>Empresa</Form.Label>
                <Form.Control type="text" placeholder="Digite o nome da empresa"  value={experiencia.empresa} onChange={(e) => handleExperienciaChange(index, 'empresa', e.target.value)}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`formDataInicio-${index}`}>
                <Form.Label>Data de Início</Form.Label>
                <Form.Control type="date" value={experiencia.dataInicio} onChange={(e) => handleExperienciaChange(index, 'dataInicio', e.target.value)}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`formDataTermino-${index}`}>
                <Form.Label>Data de Término</Form.Label>
                <Form.Control type="date" value={experiencia.dataTermino} onChange={(e) => handleExperienciaChange(index, 'dataTermino', e.target.value)}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`formAtividades-${index}`}>
                <Form.Label>Atividades Desenvolvidas</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Descreva as atividades desenvolvidas" value={experiencia.atividades} onChange={(e) => handleExperienciaChange(index, 'atividades', e.target.value)}/>
              </Form.Group>
            </Col>
          </Row>
        ))}
        <Button variant="secondary" onClick={adicionarExperiencia}>Adicionar Experiência</Button>
        <Button variant="primary" type="submit"> Cadastrar </Button>
      </Form>
    </Container>
  );
};

export default CadastroProfissional;
