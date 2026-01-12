import MainScreen from '../../components/MainScreen';
import { Link } from 'react-router-dom';
import { Accordion, Button, Card, Badge } from 'react-bootstrap'; 
import notes from '../../data/notes';

const MyNotes = () => {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      console.log("Delete Note", id);
    }
  };

  return (
    <MainScreen title="Welcome Back">
      <Link to="/createnote">
        <Button style={{ marginLeft: '10px', marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>

      <Accordion>
        {notes.map((note, index) => (
          <Accordion.Item eventKey={String(index)} key={note.id}>
            <Card style={{ margin: '10px 0' }}>
              <Card.Header
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Accordion.Button
                  as="span"
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                    flex: 1,
                    cursor: 'pointer',
                    fontSize: '18px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                  }}
                >
                  {note.title}
                </Accordion.Button>

                <div>
                  <Button variant="primary" size="sm" href={`note/${note.id}`}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    size="sm"
                    onClick={() => deleteHandler(note.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>

              <Accordion.Body>
                <h4>
                  <Badge pill bg="info" text="dark">
                    {note.category || 'General'}
                  </Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    <cite>Created on - {note.createdAt || '2025-04-05'}</cite>
                  </footer>
                </blockquote>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
        ))}
      </Accordion>
    </MainScreen>
  );
};

export default MyNotes;
