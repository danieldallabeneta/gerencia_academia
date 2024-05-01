import { useAutCtx } from "../AutCtx";
import { Link } from "react-router-dom";
import "./Cabecalho.css";

function Cabecalho() {

  const autCtx = useAutCtx(); 
  const selecionado = autCtx.selecionado;
  const nome = autCtx.lojaNome

  function sair() {
    autCtx.sair();
  }

    return (
      <header className="border-bottom border-light border-5 mb-5 p-3">
      <div className="row">
        <div className="row">
          {selecionado && nome && (<a class="navbar-brand">Loja: {autCtx.lojaNome}</a>)}
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <img alt="logo" src="./img/logo.png"/>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav=item">
                {selecionado && nome && (<Link className="nav-link" to="/inicial">
                    <a>Home</a>
                  </Link>)}
                </li>
                <li className="nav=item">
                {selecionado && nome && (<Link className="nav-link" to="/alunos">
                    <a>Alunos</a>
                  </Link>)}
                </li>
                <li className="nav=item">
                  {selecionado && nome && (<Link className="nav-link" to="/professor">
                      <a>Professor</a>
                    </Link>)}
                </li>
                <li className="nav=item">
                  {selecionado && nome && (<Link className="nav-link" to="/equipamento">
                      <a>Equipamentos</a>
                    </Link>)}
                </li>
              </ul>
            </div>
            <div>
              <ul class="navbar-nav justify-content-end">                
                <li class="nav-item">
                {selecionado && (<Link className="nav-link" to="/">
                      Alterar Loja
                    </Link>)}
                </li> 
                <li className="nav=item">
                  {nome && (
                    <Link className="nav-link" onClick={sair}>
                      Sair
                    </Link>
                  )}
                </li>               
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>



        
      );
  }
  
  export default Cabecalho;