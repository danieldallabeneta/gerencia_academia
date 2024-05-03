import { Col, Container, Row } from "react-bootstrap";
import { useAutCtx } from "../AutCtx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Rodape() {
  const autCtx = useAutCtx();
  const selecionado = autCtx.selecionado;
  const nome = autCtx.lojaNome;

  return (
    <footer className="footer py-4 text-white" style={{marginTop: '30px', background: 'black'}}>
      <Container>
        <Row className="justify-content-center">
          <Col className="text-left" style={{ marginRight: '40%', color: 'white' }} xs="auto">
            <p>
              <strong>Horário de Funcionamento:</strong>
              <br />
              Segunda à sexta: 06h15 às 22h30
              <br />
              Sábado e Domingo: 09h00 às 12h30
              <br />
              <br />
              <strong>Email:</strong>
              <br />
              gymmanegement@gmail.com
            </p>
          </Col>
          {selecionado && nome && (
            <Col className="text-center" style={{ color: 'white' }} xs="auto">
              <div>
                <span>Empresa Atual: {autCtx.lojaNome}</span>
              </div>
            </Col>
          )}
        </Row>
        <Row className="justify-content-center mt-3" style={{ marginBottom: '10px' }}>
          <Col className="text-center" xs="auto">
            <FontAwesomeIcon icon={faInstagram} color="white" size="1x" style={{ marginRight: '10px' }} />
            <FontAwesomeIcon icon={faFacebook} color="white" size="1x" style={{ marginRight: '10px' }} />
            <FontAwesomeIcon icon={faWhatsapp} color="white" size="1x" />
          </Col>
          <Col className="text-center" xs="auto" style={{ marginLeft: '20%', marginRight: '20%' }}>
            <span style={{ fontSize: '11px', color: 'white' }}>© 2024 Sua Empresa. Todos os direitos reservados.</span>
          </Col>
          <Col className="text-center" xs="auto">
            <span style={{ fontSize: '11px', color: 'white' }}>Desenvolvido por: Daniel Valdo Dallabeneta</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Rodape;
