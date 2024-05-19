import { useEffect, useState } from "react";
import { atualizaAlunoApi, obterAlunoApi, obterAlunosApi, registerAlunoApi } from "../Api/Service";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import "./CadastroAluno.css";
import InputMask from 'react-input-mask';
import { useNavigate, useParams } from "react-router-dom";
import { useAutCtx } from "../AutCtx";

function AlunoDetalhes() {
    const autCtx = useAutCtx();
    const idLoja = autCtx.lojaId;
    const [codigo, setCodigo] = useState("");
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [sexo, setSexo] = useState('1');
    const [ativo, setAtivo] = useState('1');
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUF] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [temPlanoSaude, setTemPlanoSaude] = useState('0');
    const [praticaEsporte, setPraticaEsporte] = useState('0');
    const [planoSaude, setPlanoSaude] = useState("");
    const [esporte, setEsporte] = useState("");
    const [motivoAcademia, setMotivoAcademia] = useState("");
    const [quemInformou, setQuemInformou] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [isDisabledEsporte, setIsDisabledEsporte] = useState(true);
    const [isDisabledAcademia, setIsDisabledAcademia] = useState(true);
    let navigate = useNavigate();
    const [checkAcademia, setCheckAcademia] = useState([
        { id: 1, label: 'Aprender a nadar', checked: false },
        { id: 2, label: 'Bronquite', checked: false },
        { id: 3, label: 'Coluna', checked: false },
        { id: 4, label: 'Obesidade', checked: false },
        { id: 5, label: 'Treinar', checked: false },
        { id: 6, label: 'Manter a forma', checked: false },
        { id: 7, label: 'Gestante', checked: false },
        { id: 8, label: 'Conselho médico', checked: false },
        { id: 9, label: 'Outros - Especifique', checked: false }
    ]);
    const [isDisabledIndicado, setIsDisabledIndicado] = useState(true);
    const [checkIndicado, setCheckIndicado] = useState([
        { id: 1, label: 'Jornal', checked: false },
        { id: 2, label: 'Placa', checked: false },
        { id: 3, label: 'Cartaz', checked: false },
        { id: 4, label: 'Panfleto', checked: false },
        { id: 5, label: 'Amigos', checked: false },
        { id: 6, label: 'Outdoor', checked: false },
        { id: 7, label: 'Internet', checked: false },
        { id: 8, label: 'Passando em Frente', checked: false },
        { id: 9, label: 'Outros', checked: false },
        { id: 10, label: 'Aluno da Academia', checked: false }
    ]);
    const { id } = useParams();
    useEffect(() => obterAluno(id), [id]);

    function obterAluno(id) {
        obterAlunoApi(id)
            .then((resposta) => carregaDados(resposta))
            .catch((erro) => console.log(erro));
    }

    function carregaDados(resposta){
        const dados = resposta.data;
        setCodigo(dados.id);
        setNome(dados.nome);
        setDataNascimento(dados.dataNascimento);
        setSexo(dados.sexo);
        setAtivo(dados.ativo);
        setCelular(dados.celular);
        setEmail(dados.email);
        setCidade(dados.cidade);
        setUF(dados.uf);
        setCep(dados.cep);
        setRua(dados.rua);
        setNumero(dados.numero);
        setBairro(dados.bairro);
        setPlanoSaude(dados.planoSaude);
        if(dados.planoSaude == ''){
            setTemPlanoSaude('0')
        } else {
            setTemPlanoSaude('1');
            setIsDisabled(false);
        }
        
        if(dados.esporte == ''){
            setPraticaEsporte('0')
        } else {
            setEsporte(dados.esporte);
            setPraticaEsporte('1');
            setIsDisabledEsporte(false);
        }
        
        const opcoesAcademia = JSON.parse(dados.academia);
        opcoesAcademia.forEach((numero) => {
            selecionaOpcaoAcademia(numero);
        });
        setMotivoAcademia(dados.motivoAcademia);
        dados.motivoAcademia == '' ? setIsDisabledAcademia(true) : setIsDisabledAcademia(false);
        setQuemInformou(dados.quemInformou);
        dados.quemInformou == '' ? setIsDisabledIndicado(true) : setIsDisabledIndicado(false);
        checkIndicado.map(checkbox => (
            checkbox.id == dados.comoSoube ? checkbox.checked = true : true
        ));
    }

    function selecionaOpcaoAcademia(id){
        checkAcademia.map(checkbox => (            
            checkbox.id === id ? checkbox.checked = true : true
        ));
    }

    const handleCheckboxChange = (id) => {
        if (id === 9) {
            checkAcademia.map(checkbox => (
                checkbox.id === id && checkbox.checked ? desabilitaOpcoesAcademia(true) :
                    checkbox.id === id && !checkbox.checked ? desabilitaOpcoesAcademia(false) : true
            ));
            setCheckAcademia(prevCheckboxes =>
                prevCheckboxes.map(checkbox =>
                    checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } :
                        isDisabledAcademia ? { ...checkbox, checked: false } : checkbox
                )
            );
        } else {
            checkAcademia.map(checkbox => (
                checkbox.id === 9 && checkbox.checked ? desabilitaOpcoesAcademia(true) : true
            ));
            setCheckAcademia(prevCheckboxes =>
                prevCheckboxes.map(checkbox =>
                    checkbox.id === 9 ? { ...checkbox, checked: false } :
                        checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
                )
            );
        }
    };

    const handleCheckboxIndicado = (id) => {
        if (id === 10) {
            checkIndicado.map(checkbox => (
                checkbox.id === id && !checkbox.checked ? desabilitaOpcoesIndicado(false) : true
            ));

        } else {
            desabilitaOpcoesIndicado(true);
        }
        setCheckIndicado(prevCheckboxes =>
            prevCheckboxes.map(checkbox =>
                checkbox.id === id && checkbox.checked ? checkbox :
                    checkbox.id === id && !checkbox.checked ? { ...checkbox, checked: !checkbox.checked } : { ...checkbox, checked: false }
            )
        );
    };

    function desabilitaOpcoesAcademia(retorno) {
        setIsDisabledAcademia(retorno);
        if (retorno) {
            setMotivoAcademia('');
        }
    }

    function desabilitaOpcoesIndicado(retorno) {
        setIsDisabledIndicado(retorno);
        if (retorno) {
            setQuemInformou('');
        }
    }

    function handlerNome(event) {
        setNome(event.target.value);
    }

    function handlerDataNascimento(event) {
        setDataNascimento(event.target.value);
    }

    function handlerSexo(event) {
        setSexo(event.target.value);
    }

    function handlerAtivo(event) {
        setAtivo(event.target.value);
    }

    function handlerEmail(event) {
        setEmail(event.target.value);
    }

    function handlerCelular(event) {
        setCelular(event.target.value);
    }

    function handlerRua(event) {
        setRua(event.target.value);
    }

    function handlerNumero(event) {
        setNumero(event.target.value);
    }

    function handlerBairro(event) {
        setBairro(event.target.value);
    }

    function handlerCidade(event) {
        setCidade(event.target.value);
    }

    function handlerCep(event) {
        setCep(event.target.value);
    }

    function handlerUF(event) {
        setUF(event.target.value);
    }

    function handleToggleDisable(event) {
        setTemPlanoSaude(event.target.value);
        if (event.target.value == 0) {
            setTemPlanoSaude()
            setIsDisabled(true);
            setPlanoSaude('');
        } else {
            setIsDisabled(false);
        }
    }

    function handlePraticaEsporte(event) {
        setPraticaEsporte(event.target.value)
        if (event.target.value == 0) {
            setIsDisabledEsporte(true);
            setEsporte('');
        } else {
            setIsDisabledEsporte(false);
        }
    }

    function handlerPlanoSaude(event) {
        setPlanoSaude(event.target.value);
    }

    function handlerEsporte(event) {
        setEsporte(event.target.value);
    }

    function handlerMotivoAcademia(event) {
        setMotivoAcademia(event.target.value);
    }

    function handlerQuemInformou(event) {
        setQuemInformou(event.target.value);
    }

    const handleSubmitAluno = async (event) => {
        event.preventDefault();

        const listaAcademia = [];
        checkAcademia.map(checkbox => (
            checkbox.checked ? listaAcademia.push(checkbox.id) : true
        ));

        const jsonAcademia = JSON.stringify(listaAcademia);

        let indicado = '';
        checkIndicado.map(checkbox => (
            checkbox.checked ? indicado = checkbox.id : true
        ));

        const aluno = {
            id: codigo,
            nome: nome,
            dataNascimento: dataNascimento,
            sexo: parseInt(sexo),
            ativo: parseInt(ativo),
            celular: celular,
            email: email,
            cidade: cidade,
            uf: uf,
            cep: cep,
            rua: rua,
            numero: numero,
            bairro: bairro,
            loja: idLoja,
            planoSaude: planoSaude,
            esporte: esporte,
            academia: jsonAcademia,
            motivoAcademia: motivoAcademia,
            comoSoube: indicado,
            quemInformou: quemInformou
        };

        await atualizaAlunoApi(aluno);
        navigate("/alunos");
    }

    function cancelar() {
        navigate("/alunos");
    }

    return (
        <Form>
            <div className="dadosPessoais">
                <div className="pessoa">
                    <h4>Dados Pessoais</h4>
                    <Row className="mb-2">
                        <FormGroup as={Col} className="mb-2" controlId="formGridId">
                            <Form.Label>id</Form.Label>
                            <Form.Control type="number" disabled value={codigo}/>
                        </FormGroup>
                        <FormGroup as={Col} className="mb-2" controlId="formGridNome">
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control type="text" placeholder="Nome Completo" value={nome} onChange={handlerNome} />
                        </FormGroup>
                        <FormGroup as={Col} className="mb-2" controlId="formGridDataNascimento">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control type="date" value={dataNascimento} onChange={handlerDataNascimento} />
                        </FormGroup>
                        <FormGroup as={Col} className="mb-2" controlId="formGridSexo">
                            <Form.Label>Sexo</Form.Label>
                            <Form.Select size="md" value={sexo} onChange={handlerSexo} >
                                <option value='1'>Masculino</option>
                                <option value='2'>Feminino</option>
                            </Form.Select>
                        </FormGroup>
                        <FormGroup as={Col} className="mb-2" controlId="formGridAtivo">
                            <Form.Label>Ativo</Form.Label>
                            <Form.Select size="md" value={ativo} onChange={handlerAtivo}>
                                <option value='1'>Ativo</option>
                                <option value='0'>Inativo</option>
                            </Form.Select>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} className="mb-2" controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="E-mail" value={email} onChange={handlerEmail} />
                        </FormGroup>
                        <FormGroup as={Col} className="mb-2" controlId="formGridCelular">
                            <Form.Label>Celular</Form.Label>
                            <InputMask mask="(99) 99999-9999" maskChar="_" alwaysShowMask={true} className="form-control" value={celular} onChange={handlerCelular} />
                        </FormGroup>
                    </Row>
                </div>
            </div>
            <br />
            <div className="endereco">
                <h4>Dados Residenciais</h4>
            </div>
            <br />
            <div className="dadosPessoais">
                <Row className="mb-2">
                    <FormGroup as={Col} controlId="formGridRua">
                        <Form.Label>Rua</Form.Label>
                        <Form.Control type="text" placeholder="Rua" value={rua} onChange={handlerRua} />
                    </FormGroup>
                    <FormGroup as={Col} controlId="formGridNumero">
                        <Form.Label>Número</Form.Label>
                        <Form.Control type="number" placeholder="Número Casa ou Apt" value={numero} onChange={handlerNumero} />
                    </FormGroup>
                </Row>
                <Row className="mb-2">
                    <FormGroup as={Col} controlId="formGridBairro">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control type="text" placeholder="Bairro" value={bairro} onChange={handlerBairro} />
                    </FormGroup>
                    <FormGroup as={Col} controlId="formGridCidade">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control type="text" placeholder="Cidade" value={cidade} onChange={handlerCidade} />
                    </FormGroup>
                    <FormGroup as={Col} controlId="formGridCEP">
                        <Form.Label>CEP</Form.Label>
                        <InputMask mask="99999-999" maskChar="_" alwaysShowMask={true} className="form-control" value={cep} onChange={handlerCep} />
                    </FormGroup>
                    <FormGroup as={Col} controlId="formGridUF">
                        <Form.Label>UF</Form.Label>
                        <InputMask mask="aa" value={uf} onChange={handlerUF} maskChar={null} className="form-control" />
                    </FormGroup>
                </Row>
            </div>
            <br />
            <div className="endereco">
                <h4>Questionário</h4>
            </div>
            <br />
            <div className="dadosPessoais">
                <Row>
                    <FormGroup as={Col} controlId="formGridPossuiPlano">
                        <Form.Label>Possui Plano de Saúde?</Form.Label>
                        <Form.Select size="md" value={temPlanoSaude} onChange={handleToggleDisable}>
                            <option value='0' >Não</option>
                            <option value='1'>Sim</option>
                        </Form.Select>
                    </FormGroup>
                    <FormGroup as={Col} controlId="formGridPlano">
                        <Form.Label>Nome do Plano de Saúde</Form.Label>
                        <Form.Control type="text" disabled={isDisabled} value={planoSaude} onChange={handlerPlanoSaude} />
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup as={Col} controlId="formGridPraticaEsporte">
                        <Form.Label>Pratica algum esporte?</Form.Label>
                        <Form.Select size="md" value={praticaEsporte} onChange={handlePraticaEsporte}>
                            <option value='0'>Não</option>
                            <option value='1'>Sim</option>
                        </Form.Select>
                    </FormGroup>
                    <FormGroup as={Col} controlId="formGridEsporte">
                        <Form.Label>Esporte Praticado</Form.Label>
                        <Form.Control type="text" disabled={isDisabledEsporte} value={esporte} onChange={handlerEsporte} />
                    </FormGroup>

                </Row>
                <Row>
                    <Form.Label>Porque faz academia?</Form.Label>
                </Row>
                <Row>
                    <FormGroup as={Col} controlId="formGridPorqueAcademia">
                        {checkAcademia.map(checkbox => (
                            <label key={checkbox.id} style={{ marginRight: '10px' }}>
                                <input
                                    type="checkbox"
                                    checked={checkbox.checked || false} // Fix: handle undefined case
                                    onChange={() => handleCheckboxChange(checkbox.id)}
                                    style={{ marginRight: '5px' }}
                                />
                                {checkbox.label}
                            </label>
                        ))}
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup as={Col} controlId="formGridMotivoAcademia">
                        <Form.Control type="text" disabled={isDisabledAcademia} value={motivoAcademia} onChange={handlerMotivoAcademia} />
                    </FormGroup>
                </Row>
                <Row>
                    <Form.Label>Como soube da Academia?</Form.Label>
                </Row>
                <Row>
                    <FormGroup as={Col} controlId="formGridComoSoube">
                        {checkIndicado.map(checkbox => (
                            <label key={checkbox.id} style={{ marginRight: '10px' }}>
                                <input
                                    type="checkbox"
                                    checked={checkbox.checked || false} // Fix: handle undefined case
                                    onChange={() => handleCheckboxIndicado(checkbox.id)}
                                    style={{ marginRight: '5px' }}
                                />
                                {checkbox.label}
                            </label>
                        ))}
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup as={Col} controlId="formGridAlunoAcademia">
                        <Form.Control type="text" disabled={isDisabledIndicado} value={quemInformou} onChange={handlerQuemInformou} />
                    </FormGroup>
                </Row>
            </div>
            <div className="text-center">
                <Button variant="primary" className="mb-2" style={{ marginTop: '10px' }} onClick={handleSubmitAluno}>
                    Confirmar
                </Button>
                <Button variant="secondary" className="mb-2" style={{ marginTop: '10px', marginLeft: '5px' }} onClick={cancelar}>
                    Cancelar
                </Button>
            </div>
        </Form >
    );
}

export default AlunoDetalhes;