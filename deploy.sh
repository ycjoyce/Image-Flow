set -e

npm run build

cd build

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/ycjoyce/Image-Flow master:gh-pages
cd -

