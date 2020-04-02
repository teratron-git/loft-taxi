import React from 'react';
import './index.css';

function LoginForm () {
    return (
        <div className="login-page__loginForm">
            <div className="login-page__loginForm-item">
                Я ФОРМА ЛОГИНА
            </div>  
        </div>
    );
}

function Logo () {
    return (
        <div className="login-page__logo">
            <div className="login-page__logo-item">
            </div>
        </div>
    );
}

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: this.props.getPage
        }
    }

    clickHandler = (e) => {
        let page = e.target.getAttribute("page");
        this.props.getPage(page);
        console.log(page);

     }


    render() {

        return (
            <div className="header">
            <div className="header-logo"></div>  
            <div className="header-item" page="map"     onClick={this.clickHandler}>Карта</div>  
            <div className="header-item" page="profile" onClick={this.clickHandler}>Профиль</div>  
            <div className="header-item" page="login"  onClick={this.clickHandler}>Выйти</div>  
        </div>
        );
    }
}

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: props
        }
    }

    getPage = (page) => {
        this.props.getPage(page);
     }

    render() {
        return (
            <div className="app">
                <Header getPage={this.getPage}/>
                <div className="login-page">
                    <Logo />
                    <LoginForm />
                </div>
            </div>
        );
    }
}

class MapPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "test_map"
        }
    }

    getPage = (page) => {
        this.props.getPage(page);
     }

    render() {
        return (
            <div className="app">
                <Header getPage={this.getPage}/>
                <div className="map-page">
Содержимое карты
                </div>
            </div>
        );
    }
}

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "test_profile"
        }
    }

    getPage = (page) => {
        this.props.getPage(page);
     }

    render() {
        return (
            <div className="app">
                <Header getPage={this.getPage}/>
                <div className="profile-page">
Содержимое профиля
                </div>
            </div>
        );
    }
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "login"
        }
    }

    getPage = (page) => {
        this.setState({ page: page })
     }

    render() {
        const {page} = this.state;
        return (
            <>
            {page === 'login' && <LoginPage getPage={this.getPage} />}
            {page === 'map' && <MapPage getPage={this.getPage}/>}
            {page === 'profile' && <ProfilePage getPage={this.getPage}/>}
            </>
        );
    }
}

export default App;
