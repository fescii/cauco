import  "/ckeditor/ckeditor.js";
export default class RespondContainer extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();


    // lets create our shadow root
    // this.shadowObj = this.attachShadow({mode: 'open'});

    this.render();
  }

  render() {
    this.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    this.initEditor()
    let closeButton = this.querySelector(".respond-container >span.to>i");

    closeButton.addEventListener('click', (e) => {
      this.closeResponse();
    });

  }

  initEditor(){
    ClassicEditor
    .create(this.querySelector("#comment-editor"), {
      // .create(this.shadowObj),{
      toolbar: [
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "undo",
        "redo",
      ],
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true,
        },
      },
    })
    .then( editor => {
      this.editor = editor;
    } )
    .catch( err => {
      console.error( err.stack );
      // return;
    });
  }


  disconnectedCallback() {
    console.log('We are inside disconnectedCallback');
    // adding event handler to the button
  }

  closeResponse(){
    let parent  = document.querySelector('main.post > section.post > div.respond-placeholder');
    parent.style.setProperty("display","none")
    this.remove()
  }

  getTemplate() {
    // Show HTML Here
    return `
    <div class="respond-container">
      <span class="to">
        <span class="text">${this.getAttribute('name')}</span>
        <i class="bi-x"></i>
      </span>
      <textarea placeholder="Your response here?" name="comment" id="comment-editor" cols="auto" rows="auto"></textarea>
      <span class="respond">Respond</span>
    </div>
    ${this.getStyles()}
  `;
  }


  getStyles() {
    return `
      <link rel="stylesheet" href="ckeditor/editor.css">
      <link rel="stylesheet" href="theme.css">
      <style>
        * {
        box-sizing: border-box !important;
          --font-one: 'Sen', sans-serif;
          --font-two: 'Product Sans', sans-serif;
        }

        @media screen and ( max-width:500px ){
          :host {
            border: 1px solid #80808037;
          }
          .ck.ck-editor {
            border: none;
          }

        }
      </style>
    `;
  }
}