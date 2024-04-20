import { useState } from "react";
import { registerAlunoApi } from "../Api/Service";
import { Col, Form, FormGroup, Row } from "react-bootstrap";

function CadastroAluno() {
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [sexo, setSexo] = useState("");
    /* const [ativo, setAtivo] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUF] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState(""); */

    function handlerNome(event) {
        setNome(event.target.value);
    }

    function handlerDataNascimento(event) {
        setDataNascimento(event.target.value);
    }

    function handlerSexo(event) {
        console.log(event.target.value);
        setSexo(event.target.value);
    }

    const handleSubmitAluno = async (event) => {
        event.preventDefault();

        const aluno = {
            nome: nome,
            dataNascimento: dataNascimento,
            sexo: sexo
        };

        await registerAlunoApi(aluno);
        resetCampos();
    }

    function resetCampos() {

    }

    return (
        <div className="container">
            <form onSubmit={handleSubmitAluno}>
                <Row>
                    <FormGroup as={Col}>
                        <Form.Label htmlFor="nome">Nome</Form.Label>
                        <Form.Control type="text" id="nome" value={nome} onChange={handlerNome} />
                    </FormGroup>
                    <FormGroup as={Col} controlId="formGridDataNascimento">
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control type="date" id="dataNascimento" value={dataNascimento} onChange={handlerDataNascimento} />
                    </FormGroup>
                    <FormGroup as={Col} controlId="formGridSexo">
                        <Form.Label>Sexo</Form.Label>
                        <Form.Select size="md" onChange={handlerSexo}>
                            <option>Selecione...</option>
                            <option value='1'>Masculino</option>
                            <option value='2'>Feminino</option>
                        </Form.Select>
                    </FormGroup>
                </Row>
                <Row>
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button class="btn btn-primary" type="submit">Confirmar</button>
                    </div>
                </Row>
            </form>
        </div>
    );
}


export default CadastroAluno;