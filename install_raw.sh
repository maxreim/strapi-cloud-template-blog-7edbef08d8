rm -rf ~/tmp
mkdir ~/tmp
pushd ~/tmp

# Setup
git clone $CI_REPOSITORY_URL
cd $CI_PROJECT_NAME
git checkout $CI_COMMIT_SHA

popd
cp .env ~/tmp/$CI_PROJECT_NAME

# Build
pushd ~/tmp/$CI_PROJECT_NAME
npm i
cd plugins/wysiwyg
npm i
cd ../..
npm run build
popd

# Copy to destination
shopt -s dotglob
rm -rf build .cache node_modules plugins/wysiwyg/node_modules
cp -rf ~/tmp/$CI_PROJECT_NAME/* .
shopt -u dotglob

# Restart processes
pm2 restart cms
