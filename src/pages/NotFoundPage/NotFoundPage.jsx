import { Container } from "react-bootstrap";
import "./NotFoundPage.css";
import underConstructionImg from "./under-construction.png";
function NotFoundPage() {
  return (
    <Container className="p-5">
      <h1 className="display-2">Page Not Found</h1>
      <img src={underConstructionImg} alt="under-construction" className="not-found-img"/>
      <p className="display-5">This page doesn't seem to exist or it could be under development</p>
    </Container>
  );
}

export default NotFoundPage;
