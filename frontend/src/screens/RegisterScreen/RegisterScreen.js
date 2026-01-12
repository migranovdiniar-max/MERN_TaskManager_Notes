import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainScreen from '../../components/MainScreen';
import './RegisterScreen.css';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pic, setPic] = useState(''); 

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    // простая проверка совпадения паролей на фронте
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('/api/users', {
        name,
        email,
        password,
        pic: pic || undefined, 
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/mynotes');

    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Ошибка при регистрации. Попробуйте позже.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainScreen title="SIGN UP">
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPic">
          <Form.Label>Avatar link (optional)</Form.Label>
          <Form.Control
            type="url"
            placeholder="https://example.com/avatar.jpg"
            value={pic}
            onChange={(e) => setPic(e.target.value)}
            disabled={loading}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="w-100"
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{' '}
              Registration...
            </>
          ) : (
            'Sign up'
          )}
        </Button>
      </Form>
    </MainScreen>
  );
};

export default RegisterScreen;