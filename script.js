let JsonSite='https://www.luizpicolo.com.br/api.json';
let XHR=new XMLHttpRequest();
XHR.open('get',JsonSite);XHR.responseType='json';
XHR.send();
XHR.onload=function()
{
  let noticias = XHR.response;
  class Noticia 
  {
    constructor(titulo, dataPostada, descricao, autor, url )
    {
      this.title = titulo;
      this.publishedAT = dataPostada;
      this.description = descricao;
      this.author = autor
      this.url = url
      
    }

    noticiasComun()
    {
    return `
      <a href='${this.url}'><div id='divComun'>
        <label id='autor'>${this.author}</label>
        <label id='dataPub'> Publicado : ${this.publishedAT}</label>
          
          <h3 class='titulo'>${this.title}</h3> 
      </div></a>`

    }
  }
  class NoticiaPrinc extends Noticia
  {
    constructor(imagem, titulo, dataPostada, descricao, autor, url)
    {
      super(titulo, dataPostada, descricao, autor, url)
      this.imagem = imagem
    }

    MostrarNoticiaDestaque()
    {
      return ` 
 <a href='${this.url}'><div id="divPrinc">
        <div id="divSec">
            <img class='img1' src=${this.imagem}/>
             <div class="noticia">
                   <h4 id="h4DataPub" >
<label > ${this.author} </label>
                       <label >
                           Published date: ${this.publishedAT}
                       </label>
                   </h4>
                
             
             <div class="titulo">
                
                 <h1 class="titulo">${this.title}</h1>
             </div>
             <div class="texto">
                 <h4 id="desc">${this.description}</h4>
                 <h4 id="autor"></h4>
                </div>
             </div>
         </div>
   </div></a>
 `
      /*  */
    }
    
  }
 
  const elemento = document.getElementById("list");
  noticias.articles.forEach(noticia =>{
    let notic = new Noticia(     
      noticia.title, 
      noticia.publishedAt, 
      noticia.description, 
      noticia.author, 
      noticia.url);
    
    elemento.insertAdjacentHTML('beforeend', notic.noticiasComun())
  })

  const principal = document.getElementById("noticiaPrinc")
  let Princ = new NoticiaPrinc
  (
    noticias.articles[0].urlToImage,
    noticias.articles[0].title,
    noticias.articles[0].publishedAt,
    noticias.articles[0].description,
    noticias.articles[0].author,
    noticias.articles[0].url
  )
  
  principal.insertAdjacentHTML('afterbegin', Princ.MostrarNoticiaDestaque())
}