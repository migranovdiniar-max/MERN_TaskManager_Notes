import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions'; // ← подставь правильный путь
import MainScreen from '../../components/MainScreen';
import './RegisterScreen.css';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pic, setPic] = useState(
    'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получаем состояние регистрации и логина из Redux
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Если пользователь уже авторизован (в т.ч. после успешной регистрации) — редирект
  useEffect(() => {
    if (userInfo) {
      navigate('/mynotes');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // Можно оставить локальную проверку, это нормально
      alert('Пароли не совпадают'); // или использовать setError
      return;
    }

    // Отправляем регистрацию через Redux action
    dispatch(register(name, email, password, pic));
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