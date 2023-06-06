export default class UserInfo extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();


    // lets create our shadow root
    this.shadowObj = this.attachShadow({mode: 'open'});

    this.render();
  }

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    console.log('We are inside connectedCallback');

  }


  disconnectedCallback() {
    console.log('We are inside disconnectedCallback');
    // adding event handler to the button
  }


  getTemplate() {
    // Show HTML Here
    return `
    <div class="user">
      <div class="profile">
        <img src="${this.getAttribute("user-profile")}" alt="profile" srcset="" />
      </div>
      <div class="user-info">
        <a href="${this.getAttribute("profile-url")}" class="name">${this.getAttribute("user-name")}</a>
        <span class="tagline">
          <span class="no">${this.getAttribute("followers")}</span>
          <span class="text">followers</span>
        </span>
      </div>
    </div>
    <span class="${this.getAttribute('connection')}">
      ${this.getIcon(this.getAttribute("connection"))}
    </span>
    ${this.getStyles()}
  `;
  }

  getIcon(conn){
    if (conn == "following") {
      return `
        <i class="bi-person-check-fill"></i>
        <span class="text">Following</span>
      `
    } else {
      return `
        <i class="bi-person-plus"></i>
        <span class="text">Follow</span>
      `
    }
  }


  getStyles() {
    return `
      <link rel="stylesheet" href="bootstrap/font/bootstrap-icons.css">
      <style>
        :host {
          border: none;
          background-color: var(--user-background);
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 15px 10px 10px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        * {
          box-sizing: border-box !important;
          font-family: 'Sen', sans-serif;
        }

         .user {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          gap: 10px;
        }
         .user > .profile {
          width: 35px;
          height: 35px;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }

        .user > .profile > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }
        .user > .user-info {
          width: max-content;
          display: flex;
          flex-flow: column;
          gap: 0px;
          color: var(--text-color);
        }
        .user > .user-info > a.name {
          text-decoration: none;
          color: var(--text-color);
        }
        .user > .user-info > a.name:hover {
          text-decoration: underline;
        }

        .user > .user-info > .tagline {
          color: var(--gray-color);
          font-size: 0.8rem;
        }

        .follow {
          margin: 0;
          justify-self: flex-end;
          padding: 5px 15px 5px 12px;
          text-decoration: none;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          height: max-content;
          gap: 5px;
          cursor: pointer;
          color: var(--white);
          background-color: var(--main-color);
          background: var(--button-background-two);
          background-size: 400% 400%;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        .following {
          padding: 4px 15px 4px 12px;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          height: max-content;
          gap: 5px;
          cursor: pointer;
          /*color: var(--button-text-two);*/
          border: var(--button-border);
          border-left: var(--button-border-left);
          border-bottom: var(--button-border-left);
          color: transparent;
          background: var(--button-background);
          background-color: var(--main-color);
          background-size: 400% 400%;
          background-clip: text;
          -moz-background-clip: text;
          -webkit-background-clip: text;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }

        .follow > i {
          font-size: 0.95rem;
          margin: 0%;
        }

        .follow > span.text {
          margin: 0;
          padding: 0;
          font-size: 0.85rem;
        }


        @media screen and ( max-width:500px ){
          :host {
            border: none;
            background-color: var(--reply);
            padding: 15px 8px 15px 8px;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: space-between;
            max-width: 160px;
            min-width: 150px;
            gap: 20px;
            border-top-right-radius: 18px;
            border-bottom-right-radius: 18px;
            border-bottom-left-radius: 18px;
          }

          .user {
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }

          .user > .profile {
            width: 35px;
            height: 35px;
            border-radius: 50px;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            -ms-border-radius: 50px;
            -o-border-radius: 50px;
          }

          .user > .profile > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50px;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            -ms-border-radius: 50px;
            -o-border-radius: 50px;
          }

          .user > .user-info {
            width: max-content;
            display: flex;
            flex-flow: column;
            align-items: center;
            gap: 4px;
            color: var(--text-color);
          }
          .user > .user-info > .name {
            text-decoration: none;
            font-size: 0.9rem;
            max-width: 130px;
            text-align: center;
            color: var(--text-color);
            cursor: default;
          }



        }
      </style>
    `;
  }
}