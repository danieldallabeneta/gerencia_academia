import { useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { registerLojaApi } from "../Api/Service";
import { useNavigate } from "react-router-dom";


function CadastroLoja() {

    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    const cadastraLoja = async (event) => {
        event.preventDefault();
        const loja = {
            nome: nome
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

    function setNomeLoja(event) {
        setNome(event.target.value);
    }

    function retornar() {
        navigate("/");
    }

    return (
        <Container>
            <Form onSubmit={cadastraLoja}>
                <Row>
                    <FormGroup as={Col}>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" id="nome" value={nome} onChange={setNomeLoja} />
                    </FormGroup>
                </Row>
                <Row>
                    <div className="d-grid gap-2 col-2 mx-auto">
                        <button className="btn btn-primary" type="submit">Cadastrar</button>
                    </div>
                    <div className="d-grid gap-2 col-2 mx-auto">
                        <button className="btn btn-primary" onClick={() => retornar()}>Cancelar</button>
                    </div>
                </Row>
            </Form>
        </Container>
    )
}

export default CadastroLoja;