import { Container, Figure } from "react-bootstrap";
import './Inicial.css';


function Inicial(){

    return (
        <div id="container">
            <Figure id="flex_container">
                <Figure.Image
                    width={200}
                    height={200}
                    alt="171x180"
                    src="./img/logo.png"
                />
            </Figure>
        </div>
        
    );

}

export default Inicial;