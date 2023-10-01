import { Produto } from "./types/Produto";

export const produtosAmostra: Produto[] =
[
    {
        nome: 'Cadeira de Criança',
        slug: 'cadeira-de-criança',
        categoria: 'Móveis',
        subCategoria: 'Cadeira',
        imagem: 'https://www.reciclasampa.com.br/imgs/conteudos/CAPA_TEXTO_DEEZEN_769x448px.jpg',
        preco: 50,
        contagemEstoque: 1,
        marca: 'ecoBirdy',
        avaliacao: 0.0,
        visualizacao: 0,
        descricao: 'Cadeiras para crianças a partir da coleta e reutilização de brinquedos plásticos antigos.'
    },
    {
        nome: 'Caderno Kraft',
        slug: 'caderno-kraft',
        categoria: 'Aula',
        subCategoria: 'Caderno',
        imagem: 'https://shopee.com.br/blog/wp-content/uploads/2022/06/Caderno-Kraft-420x420.png',
        preco: 10,
        contagemEstoque: 2,
        marca: 'Kraft',
        avaliacao: 0.0,
        visualizacao: 0,
        descricao: 'O Caderno Kraft incentiva a produção de produtos recicláveis exatamente porque o kraft é de celulose 100% fibra virgem, o que dá seu teor de reaproveitamento.'
    },
    {
        nome: 'Chapéu de Lona',
        slug: 'chapéu-de-lona',
        categoria: 'Roupas',
        subCategoria: 'Chapéu',
        imagem: 'https://shopee.com.br/blog/wp-content/uploads/2022/06/Chapeu-de-Lona-300x300.png',
        preco: 29,
        contagemEstoque: 3,
        marca: '',
        avaliacao: 0.0,
        visualizacao: 0,
        descricao: 'O Chapéu de Lona é feito de material que costuma cobrir as cargas de caminhão, ele é reconhecido por sua boa duração e por dar um estilo mais rústico a quem o usa.'
    },
    {
        nome: 'Camiseta de garrafa Pet',
        slug: 'camiseta-de-garrafa-pet',
        categoria: 'Roupas',
        subCategoria: 'Camiseta',
        imagem: 'https://shopee.com.br/blog/wp-content/uploads/2022/06/Camisetas-de-Garrafa-PET-300x300.png',
        preco: 39,
        contagemEstoque: 4,
        marca: '',
        avaliacao: 0.0,
        visualizacao: 0,
        descricao: 'A camiseta de garrafa de Pet é feito de um processo em que as fibras de pet são quebradas e reorganizadas até se transformarem em um tecido.'
    }
]