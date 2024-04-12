<template>
    <id>
      <div class="logo">
        <img alt="Vue logo" src="../img/Dartech Digital.jpeg">
      </div>
      <header>
        <h1>Tu puente hacia el futuro digital</h1>
        <nav class="center-nav">
          <ul>
            <li>
              <router-link to="/" class="link">Inicio</router-link>
            </li>
            <li>
              <router-link to="/articulos" class="link">Artículos</router-link>
            </li>
            <li>
              <router-link to="/usuarios" class="link">Contacto</router-link>
            </li>
            <li class="dropdown">
              <a href="#" class="link dropbtn">Iniciar Sesión / Registrarse</a>
              <div class="dropdown-content">
                <router-link to="/login">Iniciar Sesión</router-link>
                <router-link to="/registro">Registrarse</router-link>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </id>
  </template>
  
  <style>
  .logo {
    background-color: #333;
  }
  
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
  }
  
  header {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px;
  }
  
  nav {
    background-color: #333;
    color: white;
    padding: 10px;
  }
  
  nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  nav li {
    float: left;
    margin-right: 20px;
    border-right: 1px solid white; /* Agrega borde derecho */
  }
  
  nav li:last-child {
    border-right: none; /* Elimina el borde derecho del último elemento */
  }
  
  nav a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
  
  .link {
    color: white;
    text-decoration: none;
    margin: 0 10px;
  }
  
  .link.dropdown .dropbtn {
    border-right: 1px solid white;
    padding-right: 10px;
  }
  
  /* Estilos para el menú desplegable */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }
  
  .dropdown:hover .dropdown-content {
    display: block;
  }
  
  .dropbtn {
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }
  
  .center-nav {
    display: flex;
    justify-content: center;
  }
  </style>
  