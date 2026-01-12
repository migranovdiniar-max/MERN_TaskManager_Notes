import MainScreen from '../../components/MainScreen';
import { Link } from 'react-router-dom';
import { Accordion, Button, Card, Badge } from 'react-bootstrap'; 
import { useEffect, useState } from 'react';
import axios from 'axios';

const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      console.log("Delete Note", id);
      // Здесь можно добавить реальный delete-запрос к API, например:
      // await axios.delete(`/api/notes/${id}`);
      // fetchNotes(); // обновить список после удаления
    }
  };

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("/api/notes");
      setNotes(data);
    } catch (error) {
      console.error("Ошибка загрузки заметок:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainScreen title="Welcome Back">
      <Link to="/createnote">
        <Button style={{ marginLeft: '10px', marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>

      <Accordion>
        {notes.map((note) => (
          <Accordion.Item eventKey={String(note.id || note._id)} key={note.id || note._id}>
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
                  <Button variant="primary" size="sm" href={`note/${note.id || note._id}`}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    size="sm"
                    onClick={() => deleteHandler(note.id || note._id)}
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
                    <cite>Created on - {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Unknown'}</cite>
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