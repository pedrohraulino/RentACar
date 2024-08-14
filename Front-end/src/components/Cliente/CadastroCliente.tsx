import React, { useState } from 'react';
import ClienteModel from '../../Interfaces/Cliente';
import api from '../../services/api';

interface CadastroClienteProps {
  onSuccess: (message: string, type: 'success' | 'danger') => void;
}

const CadastroCliente: React.FC<CadastroClienteProps> = ({ onSuccess }) => {
  const [cliente, setCliente] = useState<Omit<ClienteModel, 'id'>>({
    nome: '',
    contato: '',
    cnh: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post('/api/Cliente/CriarCliente', cliente, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCliente({
        nome: '',
        contato: '',
        cnh: ''
      });
      onSuccess('Cliente cadastrado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao cadastrar Cliente:', error);
      onSuccess('Cliente  com CNH já cadastrado!', 'danger');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="pt-2 pb-5">
        <div className='form-group d-flex align-items-end'>
          <div className='w-100 mr-5'>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="form-control"
              value={cliente.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className='w-100 mr-5'>
            <label htmlFor="contato">Contato</label>
            <input
              type="text"
              id="contato"
              name="contato"
              className="form-control"
              value={cliente.contato}
              onChange={handleChange}
              required
            />
          </div>
          <div className='w-100 mr-5'>
            <label htmlFor="cnh">CNH</label>
            <input
              type="text"
              id="cnh"
              name="cnh"
              className="form-control"
              value={cliente.cnh}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Cadastrar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CadastroCliente;
