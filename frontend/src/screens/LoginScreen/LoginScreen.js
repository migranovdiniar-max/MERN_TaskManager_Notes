import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainScreen from '../../components/MainScreen';
import './LoginScreen.css';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    setError('');          
    setLoading(true);

    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));

      navigate('/mynotes');

    } catch (err) {
      setError(
        err.response?.data?.message || 'Ошибка входа. Попробуйте позже.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainScreen title="LOGIN">
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
              Вход...
            </>
          ) : (
            'Sign up'
          )}
        </Button>
      </Form>
    </MainScreen>
  );
};

export default LoginScreen;