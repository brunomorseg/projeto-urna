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

const c = (e) => document.querySelector(e)
const cs = (e) => document.querySelectorAll(e)

let etapaAtual = 0
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
        }
      } 
    })   
    c('.numeros--area').append(contagem)
})
//-------------------------------------------------
const comecarEtapa = () =>{
  let etapa = etapas [etapaAtual]
  let numeroHTML = ''

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
  let etapa = etapas [etapaAtual]
  let candidato = etapa.candidatos.filter((item)=>{
    if(item.numero === numero){
      return true
    } else {
      return false
    }
  })
  console.log('Candidato', candidato)
}
comecarEtapa()

const corrige = () => {
  document.querySelectorAll('.numero').forEach((element) => {
    element.innerHTML = '';
  });
  let elNumero = c('.numero')
  elNumero.classList.add('pisca')
  
};


const confirma = ()=>{
  c('.tela--d-1-fim').style.display = 'none'
  c('.tela--d-1-3').style.display = 'flex'
  c('.tela--d-1-fim').innerHTML = 'FIM'
  c('.tela--d-1-fim').style.fontSize ='100px'

  if(etapaAtual ===2) {
    c('.tela--d-1-2').style.display = 'none'
    c('.tela--d-1-3').style.display = 'none'
    aviso.style.display = 'none'
    c('.tela--d-1-fim').style.display ='block'

  } else{
  
  etapaAtual = 1
  
    comecarEtapa ()
  
    aviso.style.display = 'block'
    etapaAtual +=1
}}

const branco = () => {
  c('.tela--d-1-fim').style.display = 'block'
  c('.tela--d-1-3').style.display = 'none' 
  c('.tela--d-1-fim').style.fontSize ='50px'
  c('.tela--d-1-fim').innerHTML = 'VOTO EM BRANCO'
  etapaAtual = 1

  comecarEtapa()

}


