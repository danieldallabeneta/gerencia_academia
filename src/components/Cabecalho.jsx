import { useAutCtx } from "../AutCtx";
import { useNavigate } from "react-router-dom";
import "./Cabecalho.css";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

function Cabecalho() {

  const autCtx = useAutCtx();
  const selecionado = autCtx.selecionado;
  const autenticado = autCtx.autenticado;
  const nome = autCtx.lojaNome;
  let navigate = useNavigate();

  const sair = () => {
    autCtx.sair();

  }

  return (
    <header className="bg-white text-white text-center py-4 fixed-top border-bottom border-black">
      <Container fluid >
        <Navbar bg="white">
          <Navbar.Brand>
            <img alt="logo" src="./img/logo.png" width="80" height="80" className="d-inline-block align-top" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {selecionado && nome && (<Nav.Link onClick={(e) => (navigate("/inicial"))}>Home</Nav.Link>)}
              {selecionado && nome && (
                <NavDropdown title="Cadastro" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={(e) => (navigate("/alunos"))}>Aluno</NavDropdown.Item>
                  <NavDropdown.Item onClick={(e) => (navigate("/professor"))}>Professor</NavDropdown.Item>
                  <NavDropdown.Item onClick={(e) => (navigate("/equipamento"))}>Equipamento</NavDropdown.Item>
                  <NavDropdown.Item onClick={(e) => (navigate("/atividade"))}>Atividade</NavDropdown.Item>
                  <NavDropdown.Item onClick={(e) => (navigate("/horario"))}>Horário</NavDropdown.Item>
                  <NavDropdown.Item onClick={(e) => (navigate("/banco"))}>Banco</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {nome && autenticado && (
              <Nav.Link onClick={(e) => (navigate("/"))} style={{ color: 'gray', marginRight:'20px'}}><h5>Alterar Estabelecimento</h5></Nav.Link>
            )}
            {nome && autenticado && (
              <Nav.Link onClick={sair} style={{ color: 'gray' }}><h5>Sair</h5></Nav.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header >
  );
}

export default Cabecalho;