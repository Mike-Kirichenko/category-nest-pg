<h1 align="center">Application installation and run instructions</h1>
<hr>
<ul>
  <li>Clone repository</li>
  <li>Create .env file and define APP_PORT</li>
  <li>Create .env file in docker-env folder with your preffered settings. Take example.env as example</li>
  <li>Build docker container via: <code>docker-compose up -d --build</code></li>
  <li>Open browser at http://localhost:${APP_PORT}/api</li>
</ul>
