let urnaContagem = [
    {id:1, numero:1},
    {id:2, numero:2},
    {id:3, numero:3},
    {id:4 ,numero:4},
    {id:5 ,numero:5},
    {id:6, numero:6},
    {id:7, numero:7},
    {id:8, numero:8},
    {id:9, numero:9},
    {id:0, numero:0}
]

let etapas = [
  {
      titulo: 'VEREADOR',
      numeros: 5,
      candidatos: [
          {
              numero: '38111',
              nome: 'Fulano de Tal',
              partido: 'ABC',
              fotos:[
                  {url:'38111.jpg', legenda: 'Vereador'}
              ]
          },
          {
              numero: '77222',
              nome: 'Beltrano da Silva',
              partido: 'DEFG',
              fotos:[
                  {url:'77222.jpg', legenda: 'Vereador'}
              ]
          },
      ]
  },
  {
      titulo: 'PREFEITO',
      numeros: 2,
      candidatos: [
          {
              numero: '99',
              nome: 'Ciclano',
              partido: 'ABC',
              vice: 'Cic',
              fotos:[
                  {url:'99.jpg', legenda: 'Prefeito'},
                  {url:'99_2.jpg', legenda: 'Vice-Prefeito', small: true}
              ]
          },
          {
              numero: '84',
              nome: 'Zulano',
              partido: 'QWERTY',
              vice: 'Zul',
              fotos:[
                  {url:'84.jpg', legenda: 'Prefeito'},
                  {url:'84_2.jpg', legenda: 'Vice-Prefeito', small: true}
              ]
          },
      ]
  }
];

const c = (e) => document.querySelector(e)
const cs = (e) => document.querySelectorAll(e)

let etapaAtual = 0
let white = false
let seuVotoPara = c('.tela--d-1-1 span')
let cargo = c('.tela--d-1-2 span')
let descricao = c('.tela--d-1-4')
let aviso = c('.tela--d-2')
let lateral = c('.d-1-right')
let numeros = document.querySelector('.tela--d-1-3')
let numero = ''
c('.tela--d-1-fim').style.display ='none'

urnaContagem.map((item,index)=>{

    let contagem = c('.numeros--contagem-item').cloneNode(true)

    let numerosList = contagem.querySelector('button')

    numerosList.setAttribute('data-id', index)

    contagem.querySelector('.numeros--contagem-list').innerHTML = item.numero

    c('.tela--d-2').style.display = 'none'

    numerosList.addEventListener('click', (e)=>{
     // let key = e.target.getAttribute('data-id')
      
      let elNumero = c('.numero.pisca')
      
      if(elNumero!== null){
      elNumero.innerHTML = item.id
      numero = `${numero}${item.id}`
      elNumero.classList.remove('pisca')
      
        if(elNumero.nextElementSibling!==null){
          elNumero.nextElementSibling.classList.add('pisca')
        
        } else {
          atualizaInterface()
          aviso.style.display = 'block'
          descricao.style.fontSize = '20px'
          descricao.style.fontWeight = 'normal'

          //O que eu quero? Quero colocar o nome de cada candidato, mas só quando realmente acertar o Número.
          //Então depende do que? Posso fazer um If diretamente com o numero do candidato if(numero = '38111'){então isso} else if(numero ='') {então isso} 
          //descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO EM BRANCO </div>'
        
          if(numero==='38111'){
          descricao.innerHTML = `Candidato: ${etapas[0].candidatos[0].nome} <br> Partido: ${etapas[0].candidatos[0].partido} `} else if( numero==='77222') {descricao.innerHTML = `Candidato: ${etapas[1].candidatos[1].nome} <br> Partido: ${etapas[1].candidatos[1].partido} `} else if (numero==='99') {descricao.innerHTML = `Candidato: ${etapas[1].candidatos[0].nome} <br> Partido: ${etapas[1].candidatos[0].partido} `} else if (numero==='84') {descricao.innerHTML = `Candidato: ${etapas[1].candidatos[1].nome} <br> Partido: ${etapas[1].candidatos[1].partido} `} else {descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO EM BRANCO </div>'}
        
        
        }
      } 
    })   
    c('.numeros--area').append(contagem)
})
//-------------------------------------------------

const comecarEtapa = () =>{
  let etapa = etapas[etapaAtual]
  let numeroHTML = ''
  numero = ''
  white = false

  for(let i=0; i<etapa.numeros;i++){
    if(i===0){
      numeroHTML +='<div class="numero pisca"></div>'
    } else{
    numeroHTML +=  '<div class="numero"></div>'}
}
  seuVotoPara.style.display = 'none'
  cargo.innerHTML = etapa.titulo
  descricao.innerHTML = ''
  aviso.style.display = 'none'
  numeros.innerHTML = numeroHTML
}

const atualizaInterface = () =>{
  let etapa = etapas[etapaAtual]
  let candidato = etapa.candidatos.find((item)=>item.numero ===numero)

  if (candidato) {console.log('Candidato', candidato)} else {console.log('Voto em Branco')}
  
}
comecarEtapa()

const corrige = () => {
  numero = ''
  comecarEtapa()
}

const confirma = () => {
  let etapa = etapas[etapaAtual]

  let votoConfirmado = false

  if(white ===true){
    votoConfirmado = true
    console.log('Confirmando como BRANCO ')
  } else if (numero.length === etapa.numeros) {
    votoConfirmado = true
    console.log('Confirmando como '+ numero)
  }

  if(votoConfirmado) {
    etapaAtual++
    if(etapas[etapaAtual] !==undefined) {
      comecarEtapa()
    } else {
      document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
    }
     
  }
}


const branco = () => {

  numero = ''
  white = true
  seuVotoPara.style.display = 'block'
  aviso.style.display = 'block'
  numeros.innerHTML = ''
  descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO EM BRANCO </div>'
  descricao.style.fontSize = '40px'
  descricao.style.fontWeight = 'bold'

}


/*const confirma = ()=>{
  c('.tela--d-1-fim').style.display = 'none'
  c('.tela--d-1-3').style.display = 'flex'
  c('.tela--d-1-fim').innerHTML = 'FIM'
  c('.tela--d-1-fim').style.fontSize ='90px'


  if(etapaAtual ===2) {
    c('.tela--d-1-2').style.display = 'none'
    c('.tela--d-1-3').style.display = 'none'
    
    c('.tela--d-1-fim').style.display ='block'
    

  } else{
  
    etapaAtual = 1
    aviso.style.display = 'none'
    comecarEtapa ()
    
    aviso.style.display = 'block'
    etapaAtual +=1
}}*/

/*const branco = () => {
  c('.tela--d-1-fim').style.display = 'block'
  c('.tela--d-1-3').style.display = 'none' 
  c('.tela--d-1-fim').style.fontSize ='50px'
  c('.tela--d-1-fim').innerHTML = 'VOTO EM BRANCO'
  etapaAtual = 1

  comecarEtapa()

}
*/

/*const branco = () => {
    if(numero === '') {
      white = true;
      c('.tela--d-1-fim').style.display = 'block'
  c('.tela--d-1-3').style.display = 'none' 
  c('.tela--d-1-fim').style.fontSize ='50px'
  c('.tela--d-1-fim').innerHTML = 'VOTO EM BRANCO'

    }
}*/

/*const corrige = () => {
  numero = ''
  comecarEtapa()
  document.querySelectorAll('.numero').forEach((element) => {
    element.innerHTML = '';
  });
  let elNumero = c('.numero')
  elNumero.classList.add('pisca')
  
};*/

