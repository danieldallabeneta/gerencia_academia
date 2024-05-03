import { useAutCtx } from "../AutCtx";
import { useNavigate } from "react-router-dom";
import "./Cabecalho.css";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

function Cabecalho() {

  const autCtx = useAutCtx();
  const selecionado = autCtx.selecionado;
  const nome = autCtx.lojaNome;
  let navigate = useNavigate();

  return (
    <header className="border-bottom border-light border-5 mb-5 p-3">
      <Container fluid>
        <Navbar bg="light">
          <Navbar.Brand>
            <img alt="logo" src="./img/logo.png" width="80" height="80" className="d-inline-block align-top" />
            {selecionado && nome && (
              <Navbar.Text>
                Empresa: {autCtx.lojaNome}
              </Navbar.Text>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {selecionado && nome && (<Nav.Link onClick = {(e) => (navigate("/inicial"))}>Home</Nav.Link>)}
              {selecionado && nome && (
                <NavDropdown title="Cadastro" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick = {(e) => (navigate("/alunos"))}>Aluno</NavDropdown.Item>
                  <NavDropdown.Item onClick = {(e) => (navigate("/professor"))}>Professor</NavDropdown.Item>
                  <NavDropdown.Item onClick = {(e) => (navigate("/equipamento"))}>Equipamento</NavDropdown.Item>
                  <NavDropdown.Item onClick = {(e) => (navigate("/atividade"))}>Atividade</NavDropdown.Item>
                  <NavDropdown.Item onClick = {(e) => (navigate("/horario"))}>Horário</NavDropdown.Item>
                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {/* {selecionado && (
              <Nav.Link href="/">Alterar Loja</Nav.Link>
            )} */}
            {nome && (
              <Nav.Link onClick = {(e) => (navigate("/"))} ><h4>Sair</h4></Nav.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Container>
      {/* <div className="row">
        <div className="row">
          {selecionado && nome && (<a class="navbar-brand">Loja: {autCtx.lojaNome}</a>)}
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <img alt="logo" src="./img/logo.png" />
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
                <li className="nav=item">
                  {selecionado && nome && (<Link className="nav-link" to="/atividade">
                    <a>Atividades</a>
                  </Link>)}
                </li>
                <li className="nav=item">
                  {selecionado && nome && (<Link className="nav-link" to="/horario">
                    <a>Horários</a>
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
      </div> */}
    </header>

  );
}

export default Cabecalho;