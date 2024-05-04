import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { registerLojaApi } from "../Api/Service";
import { useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';

function CadastroLoja() {

    const [nome, setNome] = useState("");
    const [cidade, setCidade] = useState("");
    const [cnpj, setCnpj] = useState("");
    const navigate = useNavigate();

    const cadastraLoja = async (event) => {
        event.preventDefault();
        const loja = {
            nome: nome,
            cidade:cidade,
            cnpj:cnpj
        }

        registerLojaApi(loja)
            .then(() => { })
            .catch((erro) => console.log(erro));

        resetCampos();
        navigate("/");
    }

    function resetCampos() {
        setNome("");
    }

    function retornar() {
        navigate("/");
    }

    return (
        <Container>
            <h4>Cadastro de Loja</h4>
            <Form onSubmit={cadastraLoja}>
                <Row>
                    <Col>
                        <FormGroup controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup controlId="formCidade">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control type="text" id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup controlId="formCnpj">
                            <Form.Label>Cnpj</Form.Label>
                            <InputMask required mask="999.999.999/9999-99" maskChar="_" alwaysShowMask={true} className="form-control" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <div className="text-center">
                        <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                            Cadastrar
                        </Button>
                        <Button variant="secondary" style={{ marginTop: '10px', marginLeft: '5px' }} onClick={() => retornar()}>
                            Cancelar
                        </Button>
                    </div>
                </Row>
            </Form>
        </Container>
    )
}

export default CadastroLoja;