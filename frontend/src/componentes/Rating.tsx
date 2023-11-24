import { ReactNode, ReactPortal, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Contexto } from '../Contexto';

function Rating({onClick, setOnclick, starRefs}: { onClick: boolean, setOnclick: Function, starRefs : HTMLDivElement }) 
{
  const [show, setShow] = useState(false);
  //const {estado: {infoDeUsuario}} = useContext(Contexto)

  useEffect(() =>
  {
    setShow(onClick)
  }, [onClick])

  const handleCloseModal = () =>
  {
    setShow(false)
    setOnclick()
  }

  console.log(starRefs)
  console.log(typeof starRefs)

  return (
    <>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Avaliar</b>
            <div dangerouslySetInnerHTML={{__html: starRefs?.innerHTML}} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label><b>Comentário</b></Form.Label>
              <Form.Control as="textarea" rows={10} style={{borderRadius: "15px 15px 15px 15px"}} maxLength={440}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary">
            Enviar Avaliação
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Rating;