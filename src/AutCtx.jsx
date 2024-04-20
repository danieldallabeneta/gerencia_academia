import { createContext, useContext, useState } from "react";
import { obterLojaIdApi } from "./Api/Service";
import { Navigate } from "react-router-dom";

export const AutCtx    = createContext();
export const useAutCtx = () =>useContext(AutCtx);

export default function AutProvider({children}){

    const [lojaId, setLojaId] = useState(null);
    const [lojaNome, setLojaNome] = useState(null);
    const [selecionado, setSelecionado] = useState(true);

    async function setaLoja(id){        
        const lojaApi = await obterLojaIdApi(id);
        const idLoja = (await lojaApi).data.id;
        const nome = (await lojaApi).data.nome;
        if(id > 0 && nome != null){
            setLojaId(idLoja);
            setLojaNome(nome);
            setSelecionado(true);
        } else {
            setLojaId(null);
            setLojaNome(null);
            setSelecionado(true);
            Navigate(`/`);
        }
    }

    function sair(){
        setLojaId(null);
        setLojaNome(null);
        Navigate(`/`);
    }

    return (
        <div>
            <AutCtx.Provider value={{selecionado, setaLoja, lojaId, lojaNome}}>
                {children}                
            </AutCtx.Provider>            
        </div>       
    )
}