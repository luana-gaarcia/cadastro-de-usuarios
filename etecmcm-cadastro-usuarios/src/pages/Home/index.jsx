import './style.css'
import Lixo from '../../assets/lixo.png'

function Home() {
  const usuarios = [{
    id: '102030a',
    nome: 'Luana',
    idade: 18,
    email: 'luana01@gmail.com'
}, {
    id: '304050b',
    nome: 'Gacia',
    idade: 17,
    email: 'garcia02@gmail.com'
}]
  return (
      <div className='container'>
        <form>
          <h1>CADASTRO DE USUÁRIOS</h1>
          <input name= 'nome' type="text" />
          <input name= 'idade' type="number" />
          <input name= 'email' type="email" />
          <button type='button'>CADASTRAR</button>
        </form>

        {usuarios.map(usuario => (
          <div key={usuario.id} className='card'>
            <div>
              <p>Nome: {usuario.nome}</p>
              <p>Idade: {usuario.idade}</p>
              <p>Email: {usuario.email}</p> 
            </div>
            <div>
              <button>
                <img src={Lixo} />
              </button>
              </div>          
          </div>
        ))}

      </div>
  )
}

export default Home
