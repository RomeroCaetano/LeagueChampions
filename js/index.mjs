import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lightbox2/dist/css/lightbox.min.css'
import 'lightbox2/dist/js/lightbox'
import '../css/main.css'
import '../css/champion.css'
import {Cria_Index, Champions_Res, inputs_checked, Filtro_Letras, Champion_Filter,Cria_Champion,All_None,All_Is_None} from './functions.mjs'
const choose = document.querySelector(".choose_champ")
const inputs_tags = Array.from(document.querySelectorAll('input[name=tags]'))
const nav_top = document.querySelector('.nav-top')
let version

// Requisita Versão Atual da API E Cria o Index
fetch('https://ddragon.leagueoflegends.com/api/versions.json')
.then(r => r.json())
.then(json => {version = json[0];
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
    const regex = /[A-Za-z\.\s']/g
    if (regex.test(choose.value) | choose.value == ''){
        const invalid = document.querySelector('.Invalid')
        invalid.style.display = 'none'
        Champion_Filter(choose.value.toLowerCase())
        if(All_Is_None()){
            invalid.style.display = 'flex'
        }
    }
    else{
        All_None()
        document.querySelector('.Invalid').style.display = 'flex'
    }
})

//
// Champions
export {version}