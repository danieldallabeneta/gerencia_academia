import { useNavigate } from "react-router-dom";
import { useAutCtx } from "../AutCtx";
import { useEffect, useState } from "react";
import { obterMensalidadesApi } from "../Api/Service";
import { Button, Table } from "react-bootstrap";


function Mensalidades(){
    const autCtx = useAutCtx();
    const loja = autCtx.lojaId;
    const navigate = useNavigate();
    const [mensalidades, setMensalidade] = useState([]);
    useEffect(() => atualizarMensalidades());

    function atualizarMensalidades() {
        obterMensalidadesApi(loja)
            .then((resposta) => {
                if(resposta.data !== ''){
                    setMensalidade(resposta.data);
                }
            })
            .catch((erro) => console.log(erro));
    }

    function novaMensalidade() {
        navigate("/mensalidade/cadastro")
    }

    return (
        <div>
            <div className="text-center">
                <h4>Consulta de Mensalidades</h4>
            </div>   
            <Button variant="primary" onClick={() => novaMensalidade()} style={{ marginBottom: '10px' , marginLeft : '10px'}}>
                Novo
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}>Id</th>
                        <th style={{ width: '20%' }}>Data</th>                        
                        <th style={{ width: '30%' }}>Aluno</th>                        
                        <th style={{ width: '15%' }}>Valor(R$)</th>
                        <th style={{ width: '15%' }}>Desconto</th>
                        <th style={{ width: '15%' }}>Total(R$)</th>
                    </tr>
                </thead>
                <tbody>
                    {mensalidades.map((mensalidade) => (
                        <tr key={mensalidade.id}>
                            <td>{mensalidade.id}</td>
                            <td>{mensalidade.data}</td>
                            <td>{mensalidade.nomeAluno}</td>
                            <td>{mensalidade.valor}</td>
                            <td>{mensalidade.desconto}</td>
                            <td>{mensalidade.valorTotal}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );

}

export default Mensalidades;