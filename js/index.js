const champions = document.querySelector(".champions")
const main = document.querySelector(".todo-main")
const choose = document.querySelector(".choose_champ")
const inputs_tags = Array.from(document.querySelectorAll('input[name=tags]'))
const inputs_range = Array.from(document.querySelectorAll('input[name=range]'))
let AllChampions
let version
// Criando Main do Index
function Cria_Index(json){
    for(let element in json["data"]){
        const div = `
        <div class="champion" 
            data-id="${json["data"][element]["id"]}"
            data-name="${json["data"][element]["name"]}"
            data-tags="${json["data"][element]["tags"].reduce((i,j)=>i+'.'+j)}"
            data-json="${json["data"][element]["id"]}.json">
            <div class="img" style='background-image:url("https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${json["data"][element]["id"]}_0.jpg")'></div>
            <div class="all-text">
            <div class="Champion-Name"><h3>${json["data"][element]["name"]}</h3></div>
            <div class="card-hover">
                <div class="text"><i class="material-icons">
                keyboard_arrow_right
                </i></div>
            </div>
            </div>
        </div>
        `
        champions.insertAdjacentHTML("beforeend",div)
    }
    const Champion_Divs = document.querySelectorAll(".champion")
    AllChampions = Array.from(Champion_Divs);
    AllChampions.map(i => i.addEventListener('click',function(event){
        fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion/${i.dataset.json}`)
        .then(res => res.json())
        .then(json => Cria_Champion(json, i.dataset.id))
    }))
}
function Champions_Res(json){
    fetch(`https://ddragon.leagueoflegends.com/cdn/${json[0]}/data/pt_BR/champion.json`)
    .then(r => r.json())
    .then(json => Cria_Index(json))
}
fetch('https://ddragon.leagueoflegends.com/api/versions.json')
.then(r => r.json())
.then(json => Champions_Res(json))
//
//Filtro tags
inputs_tags.map(i=>
    i.addEventListener('click',function(event){
        inputs_checked(inputs_tags
            .map(i=>(i.checked)? i.id : null)
            .filter(i=>i!=null))
    }))
function inputs_checked(checkeds){
    checkeds_test = checkeds
    AllChampions.map(i=>{ 
        if(checkeds.length == 2){
            if((checkeds.includes(i.dataset.tags.split('.')[0])) && (checkeds.includes(i.dataset.tags.split('.')[1]))){
            i.style.display = 'flex'
            }else{
                i.style.display = 'none'
            }
            
        }else if(checkeds.length==1){
            if((checkeds.includes(i.dataset.tags.split('.')[0])) || (checkeds.includes(i.dataset.tags.split('.')[1]))){
                i.style.display = 'flex'
                }else{
                    i.style.display = 'none'
                }
        }else if(checkeds.length >= 3){
            i.style.display = 'none'
        }else{
            i.style.display = 'flex'
        }
    }
    )
    
}
//
//Filtro Range

// Formulario de busca no index
choose.addEventListener('keyup',function(event){
    Champion_Filter(choose.value.toLowerCase())
})
function Filtro_Letras(letras_Test,AllString){
    let new_String = AllString.slice(0,letras_Test.length)
    if (letras_Test == new_String){
        return true
    }
}
function Champion_Filter(letra){
    AllChampions.forEach(i =>{
        if (Filtro_Letras(letra,i.dataset.name.toLowerCase())){
            i.style.display = 'flex'
        }else{
            i.style.display = 'none'
        }
    })
}
//
// Champions
fetch('https://ddragon.leagueoflegends.com/api/versions.json')
.then(r => r.json())
.then(json => version = json[0])
function Cria_Champion(json,id){
        const Array_Habilities = json["data"][id]["spells"].map(i=>i["image"]["full"])
        console.log(Array_Habilities.length )
        main.setAttribute('style','padding:20px;display:flex;justify-content:center')
        main.innerHTML = `
        <div class="Individual_Champion">
            <div class= "Buttons">
                    <div class="Button_Lore">
                        <i class="material-icons">
                        assignment
                        </i>
                    </div>
                    <div class="Button_Skins"></div>
                    <div class="Button_Build"></div>
            </div>
            <div class= "Img-Skill-Lore" >
            <div class="The-Champion">
            <div class="img-title">
                <img src='https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${json["data"][id]["image"]["full"]}' width="120px" height="120px">
                <div class="title">
                <h2>${json["data"][id]["name"]}</h1>
                <span>${json["data"][id]["title"]}</span>
                </div>
            </div>
            
                <div class="Skills">
                    <div class="Passive"><img src='https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${json["data"][id]["passive"]["image"]["full"]}'></div>
                    <div class="Champion-Q"><img src='https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${Array_Habilities[0]}'></div>
                    <div class="Champion-W"><img src='https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${Array_Habilities[1]}'></div>
                    <div class="Champion-E"><img src='https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${Array_Habilities[2]}'></div>
                    <div class="Champion-R"><img src='https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${Array_Habilities[3]}'></div>
                </div>
            </div>
            <div class="Champion-Lore">
            <h1>História</h1>
                <span>${json["data"][id]["lore"]}<span>
            </div>
            </div>
            <div class="Text-Skin">
                <h1>Skins</h1>
            </div>
            <div class="Skins">
            </div>
        </div>`
        const skins = document.querySelector('.Skins')
        json["data"][id]["skins"].map(i=> skins.insertAdjacentHTML("beforeend",`
        <div class="Skin"><a href = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${json["data"][id]["id"]}_${i["num"]}.jpg" data-lightbox="${json["data"][id]["id"]}" data-title="${i["name"]}">
        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${json["data"][id]["id"]}_${i["num"]}.jpg">
        </a>
        </div>`))
        
}