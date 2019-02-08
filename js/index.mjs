import {Cria_Index, Champions_Res, inputs_checked, Filtro_Letras, Champion_Filter,Cria_Champion} from './functions.mjs'
import * as lightbox from 'lightbox2'
const choose = document.querySelector(".choose_champ")
const inputs_tags = Array.from(document.querySelectorAll('input[name=tags]'))
const nav_top = document.querySelector('.nav-top')
let version

// Requisita Versão Atual da API E Cria o Index
fetch('https://ddragon.leagueoflegends.com/api/versions.json')
.then(r => r.json())
.then(json => {version = json[1];
    Champions_Res(version);})
    
//Filtro tags
inputs_tags.map(i=>
    i.addEventListener('click',function(event){
        inputs_checked(inputs_tags
            .map(i=>(i.checked)? i.id : null)
            .filter(i=>i!=null))
    }))

//
//nav-top
document.addEventListener('scroll', function(event){
    if(window.scrollY > window.innerHeight/3){
        nav_top.style.opacity = '1'
        nav_top.style.right = '2rem'
    }
    else{
        nav_top.style.opacity = '0'
        nav_top.style.right = '-10rem'
    }
})
nav_top.addEventListener('click', function(event){
    event.preventDefault()
    window.scrollTo({
        behavior:'smooth',
        top: 0,
        left: 0
      })
})

// Formulario de busca no index
choose.addEventListener('keyup',function(event){
    Champion_Filter(choose.value.toLowerCase())
})

//
// Champions
export {version}