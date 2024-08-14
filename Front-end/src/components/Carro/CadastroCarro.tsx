import React, { useState } from 'react';
import CarroModel from '../../Interfaces/Carro';
import api from '../../services/api';

interface CadastroCarroProps {
  onSuccess: () => void;
}

const CadastroCarro: React.FC<CadastroCarroProps> = ({ onSuccess }) => {
  const [carro, setCarro] = useState<Omit<CarroModel, 'id'>>({
    marca: '',
    modelo: '',
    ano: new Date().getFullYear(),
    valorDiaria: 0,
    status: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarro((prevCarro) => ({
      ...prevCarro,
      [name]: name === 'ano' || name === 'valorDiaria' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post('/api/Carro/CriarCarro', carro, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCarro({
        marca: '',
        modelo: '',
        ano: new Date().getFullYear(),
        valorDiaria: 0,
        status: true
      });
      onSuccess(); // Chama a função de callback após o sucesso do cadastro
    } catch (error) {
      console.error('Erro ao cadastrar carro:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="pt-2 pb-5">
        <div className="form-group d-flex">
          <div className='w-100 mr-5'>
            <label htmlFor="marca">Marca</label>
            <input
              type="text"
              id="marca"
              name="marca"
              className="form-control"
              value={carro.marca}
              onChange={handleChange}
              required
            />
          </div>
          <div className='w-100'>
            <label htmlFor="modelo">Modelo</label>
            <input
              type="text"
              id="modelo"
              name="modelo"
              className="form-control"
              value={carro.modelo}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className='form-group d-flex align-items-end'>
          <div className='w-100 mr-5'>
            <label htmlFor="ano">Ano</label>
            <input
              type="number"
              id="ano"
              name="ano"
              className="form-control"
              value={carro.ano}
              onChange={handleChange}
              required
              min={1900}
              max={new Date().getFullYear()}
            />
          </div>
          <div className='w-100 mr-5'>
            <label htmlFor="valorDiaria">Valor Diária</label>
            <input
              type="number"
              id="valorDiaria"
              name="valorDiaria"
              className="form-control"
              value={carro.valorDiaria}
              onChange={handleChange}
              required
              min={0}
              step="0.01"
            />
          </div>
          <div><button type="submit" className="btn btn-primary">Cadastrar</button></div>
        </div>

      </form>
    </div>
  );
};


export default CadastroCarro;
