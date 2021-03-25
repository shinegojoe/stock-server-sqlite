supervisorctl stop stock_server
x=($(sudo lsof -i :3002 | grep LISTEN))
echo ${x[1]}
kill ${x[1]}
supervisorctl start stock_server