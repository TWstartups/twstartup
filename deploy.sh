git add .
git commit -m "commit for deploy"
git subtree push --prefix server heroku master

echo ">>backend deployed successfully"

cd ./client
npm run build
sleep 5s
git add .
git commit -m "create docs and ready to deploy"
git push origin master

echo ">>frontend deploy successfully"

echo "|| client-> https://amazingshellyyy.com/covid-notifier"
echo "|| server-> https://dashboard.heroku.com/apps/covid-notifier/logs"