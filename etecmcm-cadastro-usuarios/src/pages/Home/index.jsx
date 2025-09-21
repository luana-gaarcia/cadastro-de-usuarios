// Importações principais do React
import { useEffect, useState, useRef } from 'react'

// Importação do CSS local para estilizar a página
import './style.css'

// Importação do ícone de lixo para o botão de deletar
import Lixo from '../../assets/lixo.png'

// Importação da API configurada com axios (http://localhost:3000)
import api from '../../services/api'


function Home() {
  // Estado que armazena a lista de usuários (vem da API)
  const [usuarios, setUsuarios] = useState([])

  // useRef -> referenciam diretamente os inputs (sem precisar de useState para cada um)
  const inputNome = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()

  // Estados para update
  const [atualizando, setAtualizando] = useState(false) // controla se está na tela de update
  const [usuarioAtualizar, setUsuarioAtualizar] = useState(null) // usuário que será atualizado

  // Inputs para update (controlados)
  const [nomeUpdate, setNomeUpdate] = useState('')
  const [idadeUpdate, setIdadeUpdate] = useState('')
  const [emailUpdate, setEmailUpdate] = useState('')


  // FUNÇÃO GET -> Buscar usuários da API
  async function getUsuarios() {
    try {
      // Chama a rota GET /cadastro
      const response = await api.get('/cadastro')

      // Salva os dados recebidos no estado
      setUsuarios(response.data)
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
    }
  }

  // -------------------------
  // FUNÇÃO POST -> Cadastrar novo usuário
  async function addUsuario() {
    try {
      // Pega valores dos inputs
      const novoUsuario = {
        nome: inputNome.current.value,
        idade: inputIdade.current.value,
        email: inputEmail.current.value
      }

      // Envia para a API (POST /cadastro)
      const response = await api.post('/cadastro', novoUsuario)

      // Atualiza o estado com o novo usuário adicionado
      setUsuarios([...usuarios, response.data])

      // Limpa os inputs
      inputNome.current.value = ""
      inputIdade.current.value = ""
      inputEmail.current.value = ""
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error)
    }
  }

  // -------------------------
  // FUNÇÃO DELETE -> Excluir usuário por ID
  async function deleteUsuario(id) {
    try {
      // Chama rota DELETE /cadastro/:id
      await api.delete(`/cadastro/${id}`)

      // Atualiza estado removendo o usuário da lista
      setUsuarios(usuarios.filter(usuario => usuario.id !== id))
    } catch (error) {
      console.error("Erro ao excluir usuário:", error)
    }
  }

  // -------------------------
  // FUNÇÃO UPDATE -> Atualizar usuário
  async function updateUsuario() {
    try {
      if (!usuarioAtualizar) return

      const dadosAtualizados = {
        nome: nomeUpdate,
        idade: idadeUpdate,
        email: emailUpdate
      }

      // Chama rota PUT /cadastro/:id 
      const response = await api.put(`/cadastro/${usuarioAtualizar.id}`, dadosAtualizados)

      // Atualiza o estado local substituindo o usuário atualizado
      setUsuarios(usuarios.map(u => u.id === usuarioAtualizar.id ? response.data : u))

      // Fecha a tela de atualização
      setAtualizando(false)
      setUsuarioAtualizar(null)
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error)
    }
  }

  // -------------------------
  // Abre a tela de atualização preenchendo os campos
  function abrirAtualizacao(usuario) {
    setUsuarioAtualizar(usuario)
    setNomeUpdate(usuario.nome)
    setIdadeUpdate(usuario.idade)
    setEmailUpdate(usuario.email)
    setAtualizando(true)
  }

  // Fecha a tela de atualização sem salvar
  function cancelarAtualizacao() {
    setAtualizando(false)
    setUsuarioAtualizar(null)
  }

  // -------------------------
  // useEffect -> executa quando a página abre (chama getUsuarios 1 vez)
  useEffect(() => {
    getUsuarios()
  }, [])

  return (
    <div className='container'>
      {/* Formulário de cadastro */}
      <form>
        <h1>Cadastro de Usuários</h1>
        <input 
          name='nome' 
          type='text' 
          placeholder='Digite seu nome' 
          ref={inputNome} 
        />
        <input 
          name='idade' 
          type='number' 
          placeholder='Digite sua idade' 
          ref={inputIdade} 
        />
        <input 
          name='email' 
          type='email' 
          placeholder='Digite seu email' 
          ref={inputEmail} 
        />
        
        {/* Botão chama a função addUsuario */}
        <button type='button' onClick={addUsuario}>
          Cadastrar
        </button>
      </form>

      {/* Listagem dos usuários */}
      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome: {usuario.nome}</p>
            <p>Idade: {usuario.idade}</p>
            <p>Email: {usuario.email}</p>
          </div>

          {/* style direto para ficar mas facil */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {/* Botão de excluir chama deleteUsuario */}
            <button onClick={() => deleteUsuario(usuario.id)}>
              <img src={Lixo} alt="Excluir" />
            </button>

            {/* Botão para abrir tela de atualização */}
            <button className="botao-atualizar" onClick={() => abrirAtualizacao(usuario)}>
  Atualizar
</button>

          </div>
        </div>
      ))}

      {/* Tela/modal de atualização */}
      {atualizando && (
        <div className="modal">
          <div className="modal-content">
            <h2>Atualizar Usuário</h2>
            <input className='cor'
              type="text" 
              value={nomeUpdate} 
              onChange={e => setNomeUpdate(e.target.value)} 
              placeholder="Nome"
            />
            <input className='cor'
              type="number" 
              value={idadeUpdate} 
              onChange={e => setIdadeUpdate(e.target.value)} 
              placeholder="Idade"
            />
            <input className='cor'
              type="email" 
              value={emailUpdate} 
              onChange={e => setEmailUpdate(e.target.value)} 
              placeholder="Email"
            />

          {/* style direto para ficar mas facil */}
            <div style={{ marginTop: '10px' }}>
              <button onClick={updateUsuario}>Salvar</button>
              <button onClick={cancelarAtualizacao} style={{ marginLeft: '10px' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
