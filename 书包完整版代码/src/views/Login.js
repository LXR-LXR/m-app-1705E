import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.usernameRef = React.createRef()
  }

  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }

  handleLogin() {
    let { username, password } = this.state
    axios({
      url: '/api/login',
      data: {
        username,
        password
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {
        localStorage.setItem('username', res.data.data.username)
        this.props.history.push('/index/home')
      } else {
        alert('登录失败')
      }
    })
  }

  handleEnter(e) {
    if (e.keyCode === 13) {
      this.handleLogin()
    }
  }

  componentDidMount() {
    this.usernameRef.current.focus()
  }

  render() {
    let { username, password } = this.state
    return (
      <div>
        <div>
          <input value={username} placeholder="请输入用户名" ref={this.usernameRef} onChange={this.handleInput.bind(this, 'username')} />
        </div>
        <div>
          <input value={password} placeholder="请输入密码" type="password" onKeyUp={this.handleEnter.bind(this)} onChange={this.handleInput.bind(this, 'password')}></input>
        </div>
        <button onClick={this.handleLogin.bind(this)}>登录</button>
      </div>
    )
  }
}
