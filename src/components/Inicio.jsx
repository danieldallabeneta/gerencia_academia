import { useEffect, useState } from "react";
import { Button, Container, Figure, Form, ModalTitle } from "react-bootstrap";
import { obterLojasApi } from "../Api/Service";
import { useNavigate } from "react-router-dom";
import { useAutCtx } from "../AutCtx";

function Inicio() {
    const [lojas, setLojas] = useState([]);
    const [selecao, setSelecao] = useState('');
    const autCtx = useAutCtx();
    let navigate = useNavigate();
    useEffect(() => buscaLojas(), []);

    function buscaLojas() {
        obterLojasApi()
            .then((resposta) => {
                setLojas(resposta.data);
            })

            .catch((erro) => console.log(erro));
    }

    function entrar() {
        const autent = autCtx.setaLoja(selecao);
        if (autent) {
            navigate("/inicial")
        }
    }
    
    function novaLoja() {
        navigate("/loja/cadastro");
    }

    const setaOpcao = (event) => {
        setSelecao(event.target.value);
    }

    return (
        <Container>
            <Figure>
                <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src="./img/logo.png"
                />
            </Figure>
            <ModalTitle>Seleciona a Loja para continuar</ModalTitle>
            <Form.Select size="lg" onChange={setaOpcao}>
                <option>Selecione...</option>
                {lojas.map(loja => (
                    <option value={loja.id}>{loja.nome}</option>)
                )}
            </Form.Select>
            <Button variant="primary" onClick={() => entrar()}>
                Confirmar
            </Button>
            <Button variant="primary" onClick={() => novaLoja()}>
                Nova Loja
            </Button>
        </Container>
    );
}

export default Inicio;