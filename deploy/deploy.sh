cp deploy/restart.sh dist/restart.sh
cp deploy/run.sh dist/run.sh
scp -r dist root@167.179.80.227:/home/node_server
ssh root@167.179.80.227 "cd /home/node_server && bash restart.sh"