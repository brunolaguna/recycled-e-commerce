import './App.css'
import { produtosAmostra } from './dado'

function App() {

  return (
    <div>
      <header>
        Recycled E-commerce
      </header>
      <main>
        <ul>
          {
            produtosAmostra.map((produto) => (
              <li key={produto.slug}>
                <h2>{produto.nome}</h2>
                <img 
                  src={produto.imagem} 
                  alt={produto.nome} 
                  className='product-image'>  
                </img>
                <p>R${produto.preco}</p>
              </li>
            ))
          }
        </ul>
      </main>
      <footer>
        Todos os direitos são reservados
      </footer>
    </div>
  )
}

export default App
