import { createContext, useContext, useState } from "react";
import { autenticarApi, obterLojaIdApi, obterUserEmailApi } from "./Api/Service";
import { Navigate } from "react-router-dom";

export const AutCtx = createContext();
export const useAutCtx = () => useContext(AutCtx);

export default function AutProvider({ children }) {

    const [lojaId, setLojaId] = useState(null);
    const [lojaNome, setLojaNome] = useState(null);
    const [selecionado, setSelecionado] = useState(true);
    const [autenticado, setAutenticado] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [usuarioNome, setUsuarioNome] = useState(null);

    async function setaLoja(id) {
        const lojaApi = await obterLojaIdApi(id);
        const idLoja = lojaApi.data.id;
        const nome = lojaApi.data.nome;
        if (id > 0 && nome != null) {
            setLojaId(idLoja);
            setLojaNome(nome);
            setSelecionado(true);
        } else {
            setLojaId(null);
            setLojaNome(null);
            setSelecionado(true);
            Navigate(`/login`);
        }
    }

    async function autenticar(usuario, senha) {
        const credencial = { "userEmail": usuario, "senha": senha };
        const resposta = await autenticarApi(credencial);
        const foiAutenticado = resposta.data;

        if (foiAutenticado) {
            const user = await obterUserEmailApi(credencial.userEmail);
            const id = user.data.id;
            const nome = user.data.nome;
            setUsuario(id);
            setUsuarioNome(nome);
            setAutenticado(true);
            return true;
        } else {
            setAutenticado(false);
            setUsuario(null);
            setUsuarioNome(null);
            return false;
        }
    }

    function atualizaDadosCadastro(usuario, nome) {
        setUsuario(usuario);
        setUsuarioNome(nome);
        setAutenticado(true);
    }

    function sair() {
        setAutenticado(false);
        setUsuario(null);
        setUsuarioNome(null);
        setLojaId(null);
        setLojaNome(null);
    }

    return (
        <div>
            <AutCtx.Provider value={{ selecionado, autenticado, setaLoja, autenticar, atualizaDadosCadastro, sair, lojaId, lojaNome, usuario, usuarioNome }}>
                {children}
            </AutCtx.Provider>
        </div>
    )
}