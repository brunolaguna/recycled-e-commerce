import bcrypt from 'bcryptjs'
import { Usuario } from './modelos/ModeloDeUsuario'
import { Produto } from './modelos/ModeloDeProduto'

export const exemploDeProdutos: Produto[] = [
  {
    nome: 'Cadeira de Criança',
    slug: 'cadeira-de-criança',
    imagem: 'https://www.reciclasampa.com.br/imgs/conteudos/CAPA_TEXTO_DEEZEN_769x448px.jpg',
    categoria: 'Móveis',
    preco: 49.90,
    emEstoque: 10,
    marca: 'ecoBirdy',
    avaliacao: 4.5,
    visualizacoes: 10,
    descricao: 'Cadeiras para crianças a partir da coleta e reutilização de brinquedos plásticos antigos.'
  },
  {
    nome: 'Caderno Kraft',
    slug: 'caderno-kraft',
    categoria: 'Caderno',
    imagem: 'https://shopee.com.br/blog/wp-content/uploads/2022/06/Caderno-Kraft-420x420.png',
    preco: 9.90,
    emEstoque: 20,
    marca: 'Kraft',
    avaliacao: 5,
    visualizacoes: 10,
    descricao: 'O Caderno Kraft incentiva a produção de produtos recicláveis exatamente porque o kraft é de celulose 100% fibra virgem, o que dá seu teor de reaproveitamento.'
  },
  {
    nome: 'Chapéu de Lona',
    slug: 'chapéu-de-lona',
    categoria: 'Roupas',
    imagem: 'https://shopee.com.br/blog/wp-content/uploads/2022/06/Chapeu-de-Lona-300x300.png',
    preco: 29,
    emEstoque: 2,
    marca: 'Lacoste',
    avaliacao: 3,
    visualizacoes: 4,
    descricao: 'O Chapéu de Lona é feito de material que costuma cobrir as cargas de caminhão, ele é reconhecido por sua boa duração e por dar um estilo mais rústico a quem o usa.'
  },
  {
    nome: 'Camiseta de garrafa Pet',
    slug: 'camiseta-de-garrafa-pet',
    categoria: 'Roupas',
    imagem: 'https://shopee.com.br/blog/wp-content/uploads/2022/06/Camisetas-de-Garrafa-PET-300x300.png',
    preco: 39,
    emEstoque: 15,
    marca: '',
    avaliacao: 5,
    visualizacoes: 5,
    descricao: 'A camiseta de garrafa de Pet é feito de um processo em que as fibras de pet são quebradas e reorganizadas até se transformarem em um tecido.'
  },
]

export const exemploDeUsuarios: Usuario[] = [
  {
    nome: 'test',
    email: 'test@exemplo.com',
    senha: bcrypt.hashSync('123'),
    admin: true,
  },
  {
    nome: 'test2',
    email: 'test2@exemplo.com',
    senha: bcrypt.hashSync('123'),
    admin: false,
  },
]
