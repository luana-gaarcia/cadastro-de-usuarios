import { useEffect, useState } from 'react'
import './style.css'
import Lixeira from '../../assets/lixeira.png'
import api from '../../services/api'

function Home() {
  const [usuarios, setUsuarios] = useState([])

  async function getUsusarios() {
    const usuariosDaApi = await api.get('/cadastro')
    setUsuarios(usuariosDaApi.data)
    console.log(usuarios)
  }

  useEffect(() => {
    getUsusarios()
  },[])

  return (
    <div className='container'>

      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input name='nome' type='text' />
        <input name='idade' type='number' />
        <input name='email' type='email' />
        <button type='button'>Cadastrar</button>
      </form>

      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome: {usuario.nome}</p>
            <p>Idade: {usuario.idade}</p>
            <p>Email: {usuario.email}</p>
          </div>

          <button>
            <img src={Lixeira} />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home